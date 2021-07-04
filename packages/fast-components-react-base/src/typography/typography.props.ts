import * as React from "react";
import {
    ManagedClasses,
    TypographyClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";

export enum TypographyTag {
    caption = "caption",
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    h5 = "h5",
    h6 = "h6",
    p = "p",
    span = "span",
    figcaption = "figcaption",
}

export enum TypographySize {
    _1 = 1,
    _2 = 2,
    _3 = 3,
    _4 = 4,
    _5 = 5,
    _6 = 6,
    _7 = 7,
    _8 = 8,
    _9 = 9,
}

export interface TypographyUnhandledProps
    extends React.BaseHTMLAttributes<
            | HTMLHeadingElement
            | HTMLParagraphElement
            | HTMLSpanElement
            | HTMLTableCaptionElement
        > {}
export interface TypographyManagedClasses
    extends ManagedClasses<TypographyClassNameContract> {}
export interface TypographyHandledProps extends TypographyManagedClasses {
    /**
     * The typographic content
     */
    children?: React.ReactNode;

    /**
     * Use the appropriate HTML tag type depending on context
     */
    tag?: TypographyTag;

    /**
     * The visual size (type level) which aligns to a type ramp instance
     */
    size?: TypographySize;
}

export type TypographyProps = TypographyHandledProps & TypographyUnhandledProps;
