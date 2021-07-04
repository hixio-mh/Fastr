import * as React from "react";
import { IFormItemComponentMappingToProperyNamesProps } from "./form-item";
import styles from "./form-item.align-vertical.style";
import { IFormItemAlignVerticalClassNameContract } from "../class-name-contracts/";
import manageJss, { IJSSManagerProps } from "@microsoft/fast-jss-manager-react";
import { IManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";

/**
 * Schema form component definition
 * @extends React.Component
 */
/* tslint:disable-next-line */
class FormItemAlignVertical extends React.Component<IFormItemComponentMappingToProperyNamesProps & IManagedClasses<IFormItemAlignVerticalClassNameContract>, {}> {

    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.formItemAlignVertical}>
                <label
                    className={this.props.managedClasses.formItemAlignVertical_label}
                    htmlFor={this.props.dataLocation}
                >
                    {this.props.label}
                </label>
                <div className={this.props.managedClasses.formItemAlignVertical_inputContainer}>
                    {this.renderInput("top", 1)}
                    {this.renderInput("center", 2)}
                    {this.renderInput("bottom", 3)}
                </div>
            </div>
        );
    }

    private onChange = (value: string): void => {
        this.props.onChange(this.props.dataLocation, value);
    }

    private isChecked(direction: string): boolean {
        return this.props.data === direction || (typeof this.props.data === "undefined" && this.props.default === direction);
    }

    private getInputClassName(direction: string): string {
        switch (direction) {
            case "top":
                return this.props.managedClasses.formItemAlignVertical_input__top;
            case "center":
                return this.props.managedClasses.formItemAlignVertical_input__center;
            case "bottom":
                return this.props.managedClasses.formItemAlignVertical_input__bottom;
        }
    }

    private renderInput(direction: string, index: number): JSX.Element {
        if (this.props.options && Array.isArray(this.props.options)) {
            const option: string = this.props.options.find((item: string) => {
                return item === direction;
            });

            if (typeof option !== "undefined") {
                const className: string = this.getInputClassName(direction);

                return (
                    <span>
                        <input
                            className={className}
                            id={this.props.dataLocation}
                            type="radio"
                            value={direction}
                            name={this.props.dataLocation}
                            aria-label={`${direction} align`}
                            onChange={this.onChange.bind(this, direction)}
                            checked={this.isChecked(direction)}
                        />
                    </span>
                );
            }
        }
    }
}

export default manageJss(styles)(FormItemAlignVertical);
