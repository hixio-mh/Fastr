import { ProgressClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { classNames } from "@microsoft/fast-web-utilities";
import React from "react";
import { DisplayNamePrefix } from "../utilities";
import {
    ProgressHandledProps,
    ProgressProps,
    ProgressUnhandledProps,
} from "./progress.props";

export enum ProgressType {
    determinate = "determinate",
    indeterminate = "indeterminate",
}

class Progress extends Foundation<ProgressHandledProps, ProgressUnhandledProps, {}> {
    public static defaultProps: Partial<ProgressProps> = {
        minValue: 0,
        maxValue: 100,
        managedClasses: {},
    };

    public static displayName: string = `${DisplayNamePrefix}Progress`;

    protected handledProps: HandledProps<ProgressHandledProps> = {
        children: void 0,
        managedClasses: void 0,
        maxValue: void 0,
        minValue: void 0,
        value: void 0,
    };

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                {...this.unhandledProps()}
                className={this.generateClassNames()}
                role="progressbar"
                aria-valuenow={this.props.value}
                aria-valuemin={this.props.minValue}
                aria-valuemax={this.props.maxValue}
            >
                {this.renderChildren()}
            </div>
        );
    }

    /**
     * Generates class names
     */
    protected generateClassNames(): string {
        return super.generateClassNames(classNames(this.props.managedClasses.progress));
    }

    /**
     * Renders children based on value prop
     */
    private renderChildren(): React.ReactNode {
        return this.props.value !== undefined
            ? this.withSlot(ProgressType.determinate)
            : this.withSlot(ProgressType.indeterminate);
    }
}

export default Progress;
export * from "./progress.props";
export { ProgressClassNameContract };
