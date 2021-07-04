import * as React from "react";
import { get } from "lodash-es";
import { canUseDOM } from "exenv-es6";
import { arrayMove, SortableContainer, SortableElement } from "react-sortable-hoc";
import { SortableConfig, SortableListItem, sortingProps } from "./sorting";
import FormItemCommon from "./form-item";
import { updateActiveSection } from "./form-section.props";
import { generateExampleData } from "./form-section.utilities";
import { FormLocation } from "./form.props";
import { isRootLocation } from "./form.utilities";
import { getArrayLinks } from "./form-item.array.utilities";
import styles from "./form-item.array.style";
import { FormItemArrayClassNameContract } from "../class-name-contracts/";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";

export enum ItemConstraints {
    minItems = "minItems",
    maxItems = "maxItems",
}

export enum ArrayAction {
    add = "add",
    remove = "remove",
}

export interface ArrayMenuItem {
    type?: ArrayAction;
    text: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface FormItemArrayProps extends FormItemCommon {
    /**
     * The schema
     */
    schema: any;

    /**
     * The location of the schema
     */
    schemaLocation: string;

    /**
     * The location of the data
     */
    dataLocation: string;

    /**
     * The string to use for an untitled schema
     */
    untitled: string;

    /**
     * The callback to update a different active section and/or component
     */
    onUpdateActiveSection: updateActiveSection;

    /**
     * The location passed
     */
    location?: FormLocation;
}

/**
 * State object for the FormItemChildren component
 */
export interface FormItemArrayState {
    hideOptionMenu: boolean;
}

/**
 * Schema form component definition
 * @extends React.Component
 */
class FormItemArray extends React.Component<
    FormItemArrayProps & ManagedClasses<FormItemArrayClassNameContract>,
    FormItemArrayState
> {
    /**
     * Store a reference to the option menu
     */
    private optionMenuRef: React.RefObject<HTMLUListElement>;

    /**
     * Store a reference to the option menu trigger
     */
    private optionMenuTriggerRef: React.RefObject<HTMLButtonElement>;

    constructor(
        props: FormItemArrayProps & ManagedClasses<FormItemArrayClassNameContract>
    ) {
        super(props);

        this.optionMenuRef = React.createRef();
        this.optionMenuTriggerRef = React.createRef();

        this.state = {
            hideOptionMenu: true,
        };
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.formItemArray}>
                <div className={this.props.managedClasses.formItemArray_header}>
                    <h3>{this.getLabelText()}</h3>
                    {/* TODO: #460 Fix "identical-code" */}
                    <button
                        ref={this.optionMenuTriggerRef}
                        onClick={this.toggleMenu}
                        aria-expanded={!this.state.hideOptionMenu}
                    >
                        <span>Options</span>
                    </button>
                    <ul
                        aria-hidden={this.state.hideOptionMenu}
                        className={this.props.managedClasses.formItemArray_actionMenu}
                        ref={this.optionMenuRef}
                    >
                        {this.renderArrayMenuItems()}
                    </ul>
                </div>
                {this.generateArrayLinks()}
            </div>
        );
    }

    public componentDidMount(): void {
        if (canUseDOM()) {
            document.addEventListener("click", this.handleWindowClick);
        }
    }

    public componentWillUnmount(): void {
        if (canUseDOM()) {
            document.removeEventListener("click", this.handleWindowClick);
        }
    }

    private handleWindowClick = (e: MouseEvent): void => {
        if (
            e.target instanceof Element &&
            !this.optionMenuRef.current.contains(e.target) &&
            !this.optionMenuTriggerRef.current.contains(e.target) &&
            this.optionMenuTriggerRef.current !== e.target
        ) {
            this.closeMenu();
        }
    };

    private closeMenu = (): void => {
        this.setState({ hideOptionMenu: true });
    };

    private toggleMenu = (): void => {
        this.setState({ hideOptionMenu: !this.state.hideOptionMenu });
    };

    /**
     * Array add/remove item click handler factory
     */
    private arrayItemClickHandlerFactory(
        dataLocation: string,
        schema: any,
        type: ArrayAction,
        index?: number
    ): (e: React.MouseEvent<HTMLElement>) => void {
        return (e: React.MouseEvent<HTMLElement>): void => {
            e.preventDefault();

            if (!this.state.hideOptionMenu) {
                this.toggleMenu();
            }

            type === ArrayAction.add
                ? this.handleAddArrayItem(dataLocation, schema)
                : this.handleRemoveArrayItem(dataLocation, index);
        };
    }

    /**
     * Array section link click handler factory
     */
    private arrayClickHandlerFactory = (
        item: any,
        index: number
    ): ((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void) => {
        return (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
            e.preventDefault();

            const oneOfAnyOfRegex: RegExp = /(oneOf|anyOf)\[\d+\]/;
            const schemaLocation: string = isRootLocation(this.props.schemaLocation)
                ? "items"
                : `${this.props.schemaLocation}.items`;
            let coercedSchemaLocation: string = this.props.schemaLocation;

            if (this.props.schemaLocation.replace(oneOfAnyOfRegex, "") === "") {
                coercedSchemaLocation = this.props.schemaLocation.replace(
                    oneOfAnyOfRegex,
                    ""
                );
            }

            if (this.props.location && this.props.location.onChange) {
                this.props.location.onChange(
                    this.props.location.schemaLocation === ""
                        ? `${coercedSchemaLocation}.items`
                        : `${
                              this.props.location.schemaLocation
                          }.${coercedSchemaLocation}.items`,
                    `${this.props.dataLocation}[${index}]`
                );
            } else {
                this.props.onUpdateActiveSection(
                    schemaLocation,
                    `${this.props.dataLocation}[${index}]`,
                    get(this.props.schema, schemaLocation)
                );
            }
        };
    };

    /**
     * Handles adding an array item
     */
    private handleAddArrayItem(dataLocation: string, schema: any): void {
        if (typeof this.props.data === "undefined") {
            this.props.onChange(dataLocation, [
                generateExampleData(
                    this.props.schema,
                    `${this.props.schemaLocation}.items`
                ),
            ]);
        } else {
            this.props.onChange(
                dataLocation,
                generateExampleData(
                    this.props.schema,
                    `${this.props.schemaLocation}.items`
                ),
                true
            );
        }
    }

    /**
     * Handles removing an array item
     */
    private handleRemoveArrayItem(dataLocation: string, index: number): void {
        this.props.onChange(dataLocation, void 0, true, index);
    }

    /**
     * Generates UI representing an item of an array
     */
    private generateArrayLinkItem = (value: any, index: number): JSX.Element => {
        return (
            <SortableListItem key={`item-${index}`} id={index.toString()}>
                <a onClick={this.arrayClickHandlerFactory(value, index)}>{value}</a>
            </SortableListItem>
        );
    };

    /**
     * Generates UI for all items in an array
     */
    private generateArrayLinkItems(): JSX.Element[] {
        return getArrayLinks(this.props.data).map(
            (value: any, index: number): JSX.Element => {
                const options: SortableConfig = {
                    key: `item-${index}`,
                    index,
                    value,
                };

                return React.createElement(
                    SortableElement(this.generateArrayLinkItem.bind(this, value, index)),
                    options
                );
            }
        );
    }

    /**
     * Handle user drag and drop interactions
     */
    private handleSort = ({ oldIndex, newIndex }: any): void => {
        this.props.onChange(
            this.props.dataLocation,
            arrayMove(this.props.data, oldIndex, newIndex)
        );
    };

    /**
     * Generates the links to an array section to be activated
     */
    private generateArrayLinks(): JSX.Element {
        const arraySections: string[] = getArrayLinks(this.props.data);
        const props: any = Object.assign({}, sortingProps, {
            onSortEnd: this.handleSort,
        });

        if (arraySections.length > 0) {
            return React.createElement(
                SortableContainer(() => {
                    return (
                        <ul className={this.props.managedClasses.formItemArray_linkMenu}>
                            {this.generateArrayLinkItems()}
                        </ul>
                    );
                }),
                props
            );
        }
    }

    private getLabelText(): string | null {
        const schema: any = this.getSubschema();

        return schema ? schema.title || schema.description || this.props.untitled : null;
    }

    private getArrayLength(): number {
        return Array.isArray(this.props.data) ? this.props.data.length : 0;
    }

    private getSubschema(): any {
        return this.props.schemaLocation !== ""
            ? get(this.props.schema, this.props.schemaLocation)
            : this.props.schema;
    }

    private getArrayMenuItem(
        action: ArrayAction,
        text: string,
        index?: number
    ): ArrayMenuItem {
        return {
            type: action,
            text,
            onClick: this.arrayItemClickHandlerFactory(
                this.props.dataLocation,
                this.props.schema,
                action,
                index
            ),
        };
    }

    private hasItemConstraints(
        schema: any,
        arrayLength: number,
        constraints: ItemConstraints
    ): boolean {
        const constrainedItems: boolean = Boolean(schema) && Boolean(schema[constraints]);

        switch (constraints) {
            case ItemConstraints.minItems:
                return (
                    schema &&
                    ((constrainedItems && arrayLength > schema.minItems) ||
                        !constrainedItems)
                );
            case ItemConstraints.maxItems:
                return (
                    schema &&
                    ((constrainedItems && arrayLength < schema.maxItems) ||
                        !constrainedItems)
                );
        }
    }

    private renderArrayMenuItems(): JSX.Element[] {
        const arrayLength: number = this.getArrayLength();
        const schema: any = this.getSubschema();
        const lessThanMaxItems: boolean = this.hasItemConstraints(
            schema,
            arrayLength,
            ItemConstraints.maxItems
        );
        const moreThanMinItems: boolean = this.hasItemConstraints(
            schema,
            arrayLength,
            ItemConstraints.minItems
        );
        const items: ArrayMenuItem[] = [];

        // if we have maxItems and the data is less than max items, allow adding items
        if (lessThanMaxItems) {
            items.push(this.getArrayMenuItem(ArrayAction.add, "Add item"));
        }

        // if we have minItems and the data is more than min items, allow removal of the items
        if (moreThanMinItems) {
            for (let index: number = 0; index < arrayLength; index++) {
                items.push(
                    this.getArrayMenuItem(
                        ArrayAction.remove,
                        this.props.data[index].text || `Item ${index + 1}`,
                        index
                    )
                );
            }
        }

        // we have nothing to add or delete
        if (items.length === 0) {
            items.push({ text: "No actions available" });
        }

        return items.map((item: any, index: number) => {
            const className: string =
                item.type === ArrayAction.remove
                    ? this.props.managedClasses.formItemArray_actionMenuItem__remove
                    : this.props.managedClasses.formItemArray_actionMenuItem__add;

            return (
                <li key={index}>
                    <button className={className} onClick={item.onClick}>
                        {item.text}
                    </button>
                </li>
            );
        });
    }
}

export default manageJss(styles)(FormItemArray);
