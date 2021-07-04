import FormSection from "./form-section";
import * as React from "react";
import {
    BreadcrumbItemEventHandler,
    FormProps,
    FormState,
    LocationOnChange,
} from "./form.props";
import { FormSectionProps } from "./form-section.props";
import {
    BreadcrumbItem,
    getActiveComponentAndSection,
    getBreadcrumbs,
    getDataCache,
    getNavigation,
    isRootLocation,
    NavigationItem,
} from "./form.utilities";
import { cloneDeep, get, set, unset } from "lodash-es";
import { ChildComponent } from "./form-item.children";
import styles from "./form.style";
import { FormClassNameContract } from "../class-name-contracts/";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";

/**
 * Schema form component definition
 * @extends React.Component
 */
class Form extends React.Component<
    FormProps & ManagedClasses<FormClassNameContract>,
    FormState
> {
    /**
     * The default untitled string
     */
    private untitled: string;

    constructor(props: FormProps & ManagedClasses<FormClassNameContract>) {
        super(props);

        this.untitled = "Untitled";

        this.state = {
            titleProps:
                props.schema && props.schema.title ? props.schema.title : this.untitled,
            schema: this.props.schema,
            activeSchemaLocation: "",
            activeDataLocation: "",
            dataCache: this.props.data,
            navigation:
                typeof this.props.location !== "undefined" // Location has been passed
                    ? getNavigation(
                          this.props.location.dataLocation,
                          this.props.data,
                          this.props.schema,
                          this.props.childOptions
                      )
                    : getNavigation(
                          "",
                          this.props.data,
                          this.props.schema,
                          this.props.childOptions
                      ),
        };
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.className || null}>
                <form onSubmit={this.handleSubmit}>
                    {this.generateBreadcrumbs()}
                    {this.generateSection()}
                </form>
            </div>
        );
    }

    /**
     * React lifecycle hook
     */
    public componentWillReceiveProps(nextProps: FormProps): void {
        const state: Partial<FormState> = this.updateStateForNewProps(
            nextProps,
            this.props.data !== nextProps.data,
            this.props.schema.id !== nextProps.schema.id,
            this.props.location !== nextProps.location
        );

        if (state) {
            this.setState(state as FormState);
        }
    }

    /**
     * Update the state when a new schema is given
     */
    /* tslint:disable-next-line */
    private updateStateForNewProps(
        props: FormProps,
        updateData: boolean,
        updateSchema: boolean,
        updateLocation: boolean
    ): Partial<FormState> {
        let state: Partial<FormState> = {};

        if (updateData) {
            state = this.getStateWithUpdatedDataCache(props, state);
        }

        if (updateSchema) {
            state = Object.assign(
                {},
                state,
                this.getStateWithUpdatedFormProps(props, state)
            );
        }

        if (updateLocation) {
            state = Object.assign(
                {},
                state,
                this.getStateWithUpdatedLocation(props, state)
            );
        }

        if (updateData || updateSchema || updateLocation) {
            return state;
        }
    }

    /**
     * Gets the state object with an updated data cache
     */
    private getStateWithUpdatedDataCache(
        props: FormProps,
        state: Partial<FormState>
    ): Partial<FormState> {
        const dataCache: any =
            typeof this.state !== "undefined" &&
            typeof this.state.dataCache !== "undefined"
                ? this.state.dataCache
                : void 0;

        const schemaState: Partial<FormState> = {
            dataCache: getDataCache(dataCache, props.data),
        };

        return Object.assign({}, state, schemaState);
    }

    /**
     * Gets the state object with updated locations, title and breadcrumbs
     */
    private getStateWithUpdatedFormProps(
        props: FormProps,
        state: Partial<FormState>
    ): Partial<FormState> {
        const schemaState: Partial<FormState> = {
            titleProps:
                props.schema && props.schema.title ? props.schema.title : this.untitled,
            schema: props.schema,
            activeSchemaLocation: "",
            activeDataLocation: "",
            dataCache: cloneDeep(props.data),
            navigation: this.getUpdatedNavigation(props, state),
        };

        return Object.assign({}, state, schemaState) as Partial<FormState>;
    }

    /**
     * Gets the state with updated location
     */
    private getStateWithUpdatedLocation(
        props: FormProps,
        state: Partial<FormState>
    ): Partial<FormState> {
        const locationState: Partial<FormState> = {
            activeSchemaLocation: props.location.schemaLocation,
            activeDataLocation: props.location.dataLocation,
            schema: props.schema,
            location: {
                dataLocation: props.location.dataLocation,
                schemaLocation: props.location.schemaLocation,
                onChange: props.location.onChange,
            },
            navigation: this.getUpdatedNavigation(props, state),
        };

        return Object.assign({}, state, locationState);
    }

    private getUpdatedNavigation(
        props: FormProps,
        state: Partial<FormState>
    ): NavigationItem[] {
        return getNavigation(
            props.location ? props.location.dataLocation : state.activeDataLocation || "",
            props.data,
            props.schema,
            props.childOptions
        );
    }

    /**
     * Generates the breadcrumb navigation
     */
    private generateBreadcrumbs(): JSX.Element {
        const breadcrumbs: BreadcrumbItem[] = getBreadcrumbs(
            this.state.navigation,
            this.handleBreadcrumbClick
        );

        if (breadcrumbs.length > 1) {
            return (
                <ul className={this.props.managedClasses.form_breadcrumbs}>
                    {this.generateBreadcrumbItems(breadcrumbs)}
                </ul>
            );
        }
    }

    private handleBreadcrumbClick = (
        schemaLocation: string,
        dataLocation: string,
        schema: any
    ): BreadcrumbItemEventHandler => {
        return (e: React.MouseEvent): void => {
            e.preventDefault();

            this.handleUpdateActiveSection(schemaLocation, dataLocation, schema);
        };
    };

    private generateBreadcrumbItems(items: BreadcrumbItem[]): JSX.Element[] {
        return items.map(
            (item: BreadcrumbItem, index: number): JSX.Element => {
                if (index === items.length - 1) {
                    return (
                        <li key={index}>
                            <span>{item.text}</span>
                        </li>
                    );
                }

                return (
                    <li key={index}>
                        <a href={item.href} onClick={item.onClick}>
                            {item.text}
                        </a>
                    </li>
                );
            }
        );
    }

    private getData(propKey: string, location: string): any {
        return isRootLocation(this.state.activeDataLocation)
            ? this[location][propKey]
            : get(this[location][propKey], this.state.activeDataLocation);
    }

    /**
     * Generate the section to be shown
     */
    private generateSection(): JSX.Element {
        const sectionProps: FormSectionProps = {
            schema: this.state.navigation[this.state.navigation.length - 1].schema,
            onChange: this.handleOnChange,
            onUpdateActiveSection: this.handleUpdateActiveSection,
            data: this.getData("data", "props"),
            dataCache: this.getData("dataCache", "state"),
            schemaLocation: this.state.activeSchemaLocation,
            dataLocation: this.state.activeDataLocation,
            untitled: this.untitled,
            childOptions: this.props.childOptions,
            location: this.props.location,
            componentMappingToPropertyNames: this.props.componentMappingToPropertyNames,
            attributeSettingsMappingToPropertyNames: this.props
                .attributeSettingsMappingToPropertyNames,
            orderByPropertyNames: this.props.orderByPropertyNames,
        };

        return <FormSection {...sectionProps} />;
    }

    private handleOnChange = (
        location: string,
        data: any,
        isArray: boolean,
        index: number,
        isChildren?: boolean
    ): void => {
        let obj: any = cloneDeep(this.props.data);
        const currentData: any = location === "" ? obj : get(obj, location);

        if (isArray) {
            let newArray: any[];

            if (typeof index !== "undefined") {
                newArray = currentData.filter((item: any, itemIndex: number) => {
                    return itemIndex !== index;
                });
            } else {
                newArray = currentData;
                newArray.push(data);
            }

            location === "" ? (obj = newArray) : set(obj, location, newArray);
        } else {
            if (typeof data === "undefined") {
                location === "" ? (obj = void 0) : unset(obj, location);
            } else {
                location === "" ? (obj = data) : set(obj, location, data);
            }
        }

        if (isChildren) {
            const children: ChildComponent | ChildComponent[] = get(obj, location);

            if (Array.isArray(children) && children.length === 1) {
                set(obj, location, children[0]);
            }
        }

        this.props.onChange(obj);
    };

    /**
     * Handles the form submit
     */
    private handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    /**
     * Handles an update to the active section and component
     */
    private handleUpdateActiveSection = (
        schemaLocation: string,
        dataLocation: string,
        schema: any
    ): void => {
        const state: Partial<FormState> = getActiveComponentAndSection(
            schemaLocation,
            dataLocation,
            schema
        );

        state.navigation = getNavigation(
            dataLocation || "",
            this.props.data,
            this.props.schema,
            this.props.childOptions
        );

        this.setState(state as FormState);
    };
}

export default manageJss(styles)(Form);
