import React from "react";
import {
    DesignSystem,
    DesignSystemResolver,
    NeutralPaletteDarkModeLayers,
    NeutralPaletteLightModeLayers,
} from "@microsoft/fast-components-styles-msft";
import { DesignSystemMergingFunction } from "@microsoft/fast-jss-manager-react";

/**
 * Friendly names for the indexes of light mode backgrounds
 * on the neutral ramp. These values are designed to work with
 * the default neutral ramp provided by the DesignSystem
 *
 * @deprecated Use the recipes because they can be more dynamic for different ramps
 */
export enum LightModeBackgrounds {
    L1 = NeutralPaletteLightModeLayers.L1,
    L1Alt = NeutralPaletteLightModeLayers.L1Alt,
    L2 = NeutralPaletteLightModeLayers.L2,
    L3 = NeutralPaletteLightModeLayers.L3,
    L4 = NeutralPaletteLightModeLayers.L4,
}

/**
 * Friendly names for the indexes of dark mode backgrounds
 * on the neutral ramp. These values are designed to work with
 * the default neutral ramp provided by the DesignSystem
 *
 * @deprecated Use the recipes because they can be more dynamic for different ramps
 */
export enum DarkModeBackgrounds {
    L1 = NeutralPaletteDarkModeLayers.L1,
    L1Alt = NeutralPaletteDarkModeLayers.L1Alt,
    L2 = NeutralPaletteDarkModeLayers.L2,
    L3 = NeutralPaletteDarkModeLayers.L3,
    L4 = NeutralPaletteDarkModeLayers.L4,
}

export interface BackgroundHandledProps {
    /**
     * The HTML element to create
     * If tag is set to null, no HTML element will be created.
     */
    tag?: keyof React.ReactHTML | null;

    /**
     * The value of the background to set. When set to a number, the value will be
     * treated as an index on the neutral ramp. When the value is a string,
     * it will be treated as a color string and applied directly. When the value
     * is a function, it will be called with the input design-system and the result
     * will be treated as a color string.
     */
    value?:
        | number
        | string
        | LightModeBackgrounds
        | DarkModeBackgrounds
        | DesignSystemResolver<string>;

    /**
     * When true, the background color will be applied to the generated element via CSS's background-color property
     */
    drawBackground?: boolean;

    /**
     * A custom merging function to pass along to the rendered DesignSystemProvider
     */
    designSystemMergingFunction?: DesignSystemMergingFunction<DesignSystem>;
}

export interface BackgroundUnhandledProps extends React.HTMLAttributes<HTMLElement> {}

export type BackgroundProps = BackgroundHandledProps & BackgroundUnhandledProps;
