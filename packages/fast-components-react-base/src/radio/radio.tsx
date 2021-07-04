import * as React from "react";
import * as ReactDOM from "react-dom";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import {
    RadioHandledProps,
    RadioManagedClasses,
    RadioProps,
    RadioUnhandledProps,
} from "./radio.props";
import {
    ManagedClasses,
    RadioClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";
import { get } from "lodash-es";

/**
 * Radio slot options
 */
export enum RadioSlot {
    label = "label",
}

class Radio extends Foundation<RadioHandledProps, RadioUnhandledProps, {}> {
    public static displayName: string = "Radio";

    /**
     * Handled props instantiation
     */
    protected handledProps: HandledProps<RadioHandledProps> = {
        id: void 0,
        checked: void 0,
        disabled: void 0,
        managedClasses: void 0,
        onChange: void 0,
        children: void 0,
    };

    public render(): React.ReactElement<HTMLElement> {
        return (
            <div {...this.unhandledProps()} className={this.generateClassNames()}>
                <input
                    className={get(this.props, "managedClasses.radio_input")}
                    type="radio"
                    id={this.props.id}
                    onChange={this.props.onChange}
                    disabled={this.props.disabled || null}
                    {...this.generateChecked()}
                />
                <span
                    className={get(this.props, "managedClasses.radio_stateIndicator")}
                />
                {this.renderChildrenWithSlot(RadioSlot.label)}
            </div>
        );
    }

    /**
     * Generates class names
     */
    protected generateClassNames(): string {
        let classes: string = get(this.props, "managedClasses.radio");

        classes = this.props.disabled
            ? `${classes} ${get(this.props, "managedClasses.radio__disabled")}`
            : classes;

        return super.generateClassNames(classes);
    }

    private renderChildrenWithSlot(slot: RadioSlot): React.ReactChild[] {
        const node: React.ReactNode = this.withSlot(RadioSlot.label);

        return React.Children.map(node, (child: JSX.Element, index: number) => {
            let labelSlotClassName: string = get(
                this.props,
                "managedClasses.radio_label"
            );
            const classNameKey: string = "className";

            if (child.props[classNameKey] !== undefined) {
                labelSlotClassName = `${child.props[classNameKey]} ${labelSlotClassName}`;
            }

            return React.cloneElement(child, { className: labelSlotClassName });
        });
    }

    private generateChecked(): any {
        return typeof this.props.checked === "boolean"
            ? { checked: this.props.checked }
            : { defaultChecked: false };
    }
}

export default Radio;
export * from "./radio.props";
export { RadioClassNameContract };
