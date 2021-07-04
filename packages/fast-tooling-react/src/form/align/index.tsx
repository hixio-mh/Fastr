import React from "react";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { CustomFormItemComponent } from "../form/form-item.props";
import styles from "./align.style";
import { AlignClassNameContract } from "./align.props";
import FormItemBase from "../form/form-item.base";

/**
 * Schema form component definition
 * @extends React.Component
 */
/* tslint:disable-next-line */
class Align extends FormItemBase<
    CustomFormItemComponent & ManagedClasses<AlignClassNameContract>,
    {}
> {
    public static displayName: string = "Align";

    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.align}>
                <div className={this.props.managedClasses.align_control}>
                    <label
                        className={this.props.managedClasses.align_controlLabel}
                        htmlFor={this.props.dataLocation}
                    >
                        {this.props.label}
                    </label>
                    <div
                        className={this.props.managedClasses.align_controlInputContainer}
                    >
                        {this.renderInput("top", 1)}
                        {this.renderInput("center", 2)}
                        {this.renderInput("bottom", 3)}
                    </div>
                </div>
                <div className={this.props.managedClasses.align_softRemove}>
                    {this.renderSoftRemove(
                        this.props.managedClasses.align_softRemoveInput
                    )}
                </div>
            </div>
        );
    }

    private onChange = (value: string): void => {
        this.props.onChange(this.props.dataLocation, value);
    };

    private isChecked(direction: string): boolean {
        return (
            this.props.data === direction ||
            (typeof this.props.data === "undefined" && this.props.default === direction)
        );
    }

    private getInputClassName(direction: string): string {
        switch (direction) {
            case "top":
                return this.props.managedClasses.align_controlInput__top;
            case "center":
                return this.props.managedClasses.align_controlInput__center;
            case "bottom":
                return this.props.managedClasses.align_controlInput__bottom;
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
                            disabled={this.props.disabled}
                        />
                    </span>
                );
            }
        }
    }
}

export default manageJss(styles)(Align);
