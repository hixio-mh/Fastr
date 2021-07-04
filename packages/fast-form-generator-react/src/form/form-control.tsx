import * as React from "react";
import FormItemSectionLink from "./form-item.section-link";
import FormItemNumberField from "./form-item.number-field";
import FormItemArray from "./form-item.array";
import FormItemTextarea from "./form-item.textarea";
import FormItemSelect from "./form-item.select";
import FormItemChildren from "./form-item.children";
import FormItemCheckbox from "./form-item.checkbox";
import FormItemMapping from "./form-item.mapping";
import { FormControlProps, FormControlState } from "./form-control.props";
import {
    checkIsDifferentSchema,
    formItemAttributeMapping,
    formItemMapping,
    generateExampleData,
    getInitialOneOfAnyOfState,
    getOneOfAnyOfSelectOptions,
    isMapping,
    isSelect,
} from "./form-section.utilities";
import { TextareaAttributeSettingsMappingToPropertyNames } from "./form.props";
import FormOneOfAnyOf from "./form-one-of-any-of";
import FormItemCommon, { mappingName } from "./form-item";

class FormControl extends React.Component<FormControlProps, FormControlState> {
    public static displayName: string = "FormControl";

    constructor(props: FormControlProps) {
        super(props);

        this.state = getInitialOneOfAnyOfState(this.props.schema, this.props.data);
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                {this.renderAnyOfOneOfSelect()}
                {this.renderFormItem()}
            </React.Fragment>
        );
    }

    /**
     * React lifecycle hook
     */
    public componentWillUpdate(nextProps: FormControlProps): void {
        if (checkIsDifferentSchema(this.props.schema, nextProps.schema)) {
            this.setState(getInitialOneOfAnyOfState(nextProps.schema, nextProps.data));
        }
    }

    /**
     * Renders form items
     */
    private renderFormItem(): React.ReactNode {
        if (
            isMapping(this.props.propertyName, this.props.componentMappingToPropertyNames)
        ) {
            return this.renderMapping();
        }

        if (isSelect({ enum: this.props.schema.enum })) {
            return this.renderSelect();
        }

        switch (this.state.schema.type) {
            case "boolean":
                return this.renderCheckbox();
            case "number":
                return this.renderNumberField();
            case "string":
                return this.renderTextarea();
            case "array":
                return this.renderArray();
            case "children":
                return this.renderChildren();
            default:
                return this.renderSectionLink();
        }
    }

    private renderChildren(): React.ReactNode {
        return (
            <FormItemChildren
                required={false}
                index={this.props.index}
                label={this.props.schema.title || this.props.untitled}
                dataLocation={this.props.dataLocation}
                data={this.props.data}
                schema={this.props.schema}
                onChange={this.props.onChange}
                defaultChildOptions={this.props.schema.defaults || null}
                childOptions={this.props.childOptions}
                onUpdateActiveSection={this.props.onUpdateActiveSection}
            />
        );
    }

    /**
     * Renders the array form item
     */
    private renderArray(): React.ReactNode {
        return (
            <FormItemArray
                schema={this.state.schema}
                schemaLocation={this.props.schemaLocation}
                untitled={this.props.untitled}
                onUpdateActiveSection={this.props.onUpdateActiveSection}
                {...this.getFormItemCommonProps()}
            />
        );
    }

    /**
     * Renders the number field form item
     */
    private renderNumberField(): React.ReactNode {
        return (
            <FormItemNumberField
                min={this.props.schema.minimum}
                max={this.props.schema.maximum}
                step={this.props.schema.multipleOf}
                {...this.getFormItemCommonProps()}
            />
        );
    }

    /**
     * Renders the checkbox form item
     */
    private renderCheckbox(): React.ReactNode {
        return <FormItemCheckbox {...this.getFormItemCommonProps()} />;
    }

    /**
     * Renders the mapping form item which in turn
     * renders one of the special form items
     * assigned via the componentMappingToPropertyNames prop
     */
    private renderMapping(): React.ReactNode {
        const name: mappingName = formItemMapping(
            this.props.componentMappingToPropertyNames,
            this.props.propertyName
        );

        return (
            <FormItemMapping
                name={name}
                options={this.props.schema.enum}
                {...this.getFormItemCommonProps()}
            />
        );
    }

    /**
     * Renders a section link for properties
     * that are objects
     */
    private renderSectionLink(): React.ReactNode {
        return (
            <FormItemSectionLink
                onUpdateSection={this.handleSectionLinkClick}
                schemaLocation={this.props.schemaLocation}
                {...this.getFormItemCommonProps()}
            />
        );
    }

    /**
     * Renders the textarea form item
     */
    private renderTextarea(): React.ReactNode {
        if (
            this.props.attributeSettingsMappingToPropertyNames &&
            this.props.attributeSettingsMappingToPropertyNames.textarea
        ) {
            const rowAttribute: number | null = formItemAttributeMapping(
                this.props.attributeSettingsMappingToPropertyNames
                    .textarea as TextareaAttributeSettingsMappingToPropertyNames,
                this.props.propertyName
            );
            return (
                <FormItemTextarea
                    rows={rowAttribute}
                    {...this.getFormItemCommonProps()}
                />
            );
        }

        return <FormItemTextarea {...this.getFormItemCommonProps()} />;
    }

    /**
     * Renders the select form item
     */
    private renderSelect(): React.ReactNode {
        const options: any[] = this.props.schema.enum;

        if (!this.props.required && typeof options[0] !== "undefined") {
            options.unshift(void 0);
        }

        return <FormItemSelect options={options} {...this.getFormItemCommonProps()} />;
    }

    /**
     * Renders a select if the root level has a oneOf or anyOf
     */
    private renderAnyOfOneOfSelect(): React.ReactNode {
        if (
            typeof this.state.oneOfAnyOf !== "undefined" &&
            this.props.schema[this.state.oneOfAnyOf.type]
        ) {
            const options: React.ReactNode = getOneOfAnyOfSelectOptions(
                this.props.schema,
                this.state
            );

            return (
                <FormOneOfAnyOf
                    label={
                        this.props.schema.title ||
                        this.props.schema.description ||
                        this.props.untitled
                    }
                    activeIndex={this.state.oneOfAnyOf.activeIndex}
                    onUpdate={this.handleAnyOfOneOfClick}
                >
                    {options}
                </FormOneOfAnyOf>
            );
        }

        return null;
    }

    /**
     * Handles updating to another active section
     */
    private handleUpdateSection(schemaLocation: string, dataLocation: string): void {
        this.props.onUpdateActiveSection(schemaLocation, dataLocation, this.props.schema);
    }

    /**
     * Handles the onClick of the section link, changes from controlled to uncontrolled if location is passed
     */
    private handleSectionLinkClick = (
        schemaLocation: string,
        dataLocation: string
    ): void => {
        this.handleUpdateSection(schemaLocation, dataLocation);
    };

    /**
     * Handles updating the schema to another active oneOf/anyOf schema
     */
    private handleAnyOfOneOfClick = (activeIndex: number): void => {
        const updatedData: any = generateExampleData(
            this.props.schema[this.state.oneOfAnyOf.type][activeIndex],
            ""
        );

        this.props.onChange(this.props.dataLocation, updatedData);

        this.setState({
            schema: this.props.schema[this.state.oneOfAnyOf.type][activeIndex],
            oneOfAnyOf: {
                type: this.state.oneOfAnyOf.type,
                activeIndex,
            },
        });
    };

    /**
     * Gets the common form item props
     */
    private getFormItemCommonProps(): FormItemCommon {
        return {
            index: this.props.index,
            dataLocation: this.props.dataLocation,
            data: this.props.data,
            required: this.props.required,
            label: this.props.label,
            disabled: this.props.disabled,
            onChange: this.props.onChange,
            default: this.props.default,
        };
    }
}

export default FormControl;
export { FormControlProps };
