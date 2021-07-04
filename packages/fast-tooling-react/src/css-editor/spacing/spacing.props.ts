import { ManagedClasses } from "@microsoft/fast-jss-manager-react";
import { CSSSpacingClassNameContract } from "./spacing.style";
import { CommonControlConfig } from "../../form/templates";
import { Omit } from "utility-types";

/**
 * Spacing can be either "margin" or "padding"
 * this component should be able to control both
 * for a more efficient UI
 */
export enum SpacingType {
    margin = "margin",
    padding = "padding",
}

/**
 * The CSS property keys
 */
export enum SpacingProperty {
    marginTop = "marginTop",
    marginLeft = "marginLeft",
    marginRight = "marginRight",
    marginBottom = "marginBottom",
    paddingTop = "paddingTop",
    paddingBottom = "paddingBottom",
    paddingLeft = "paddingLeft",
    paddingRight = "paddingRight",
}

export interface CSSSpacingState {
    activeType: SpacingType;

    hoverType: SpacingType | undefined;
}

export interface CSSSpacingUnhandledProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {}

export interface CSSSpacingValues {
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
}

export interface CSSSpacingHandledProps
    extends CommonControlConfig,
        ManagedClasses<CSSSpacingClassNameContract> {}

export type CSSSpacingProps = CSSSpacingHandledProps & CSSSpacingUnhandledProps;
