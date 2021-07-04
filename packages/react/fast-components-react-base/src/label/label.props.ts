import React from "react";
import {
    LabelClassNameContract,
    ManagedClasses,
} from "@microsoft/fast-components-class-name-contracts-base";

export enum LabelTag {
    label = "label",
    legend = "legend",
}

export type LabelManagedClasses = ManagedClasses<LabelClassNameContract>;
export interface LabelUnhandledProps
    extends React.LabelHTMLAttributes<HTMLLabelElement | HTMLLegendElement>,
        React.HTMLAttributes<HTMLLabelElement | HTMLLegendElement> {}
export interface LabelHandledProps extends LabelManagedClasses {
    /**
     * Label content
     */
    children?: React.ReactNode | React.ReactNode[];

    /**
     * If label is hidden (needed in contexts such as glyph-only search inputs)
     */
    hidden?: boolean;

    /**
     * Use the appropriate HTML tag type depending on context
     */
    tag?: LabelTag;
}

export type LabelProps = LabelHandledProps & LabelUnhandledProps;
