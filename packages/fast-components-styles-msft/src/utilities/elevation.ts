import { toPx } from "@microsoft/fast-jss-utilities";
import { CSSRules } from "@microsoft/fast-jss-manager";
import { DesignSystem, DesignSystemResolver } from "../design-system";
import { black } from "../utilities/color/color-constants";
import { parseColorString } from "../utilities/color/common";
import { ColorRGBA64 } from "@microsoft/fast-colors";

/**
 * Shadow config
 */
export interface ShadowConfig {
    blurMultiplier: number;
    opacity: number;
    xOffsetMultiplier: number;
    yOffsetMultiplier: number;
}

/**
 * The MSFT elevation values
 */
export enum ElevationMultiplier {
    e1 = 1,
    e2 = 2,
    e3 = 3,
    e4 = 4,
    e5 = 6,
    e6 = 8,
    e7 = 9,
    e8 = 12,
    e9 = 16,
    e10 = 24,
    e11 = 32,
    e12 = 40,
    e13 = 48,
    e14 = 64,
    e15 = 80,
    e16 = 96,
    e17 = 192,
}

/**
 * Ambient shadow config
 */
export const ambientShadowConfig: ShadowConfig = {
    blurMultiplier: 0.225,
    xOffsetMultiplier: 0,
    yOffsetMultiplier: 0.075,
    opacity: 0.18,
};

/**
 * Directional shadow config
 */
export const directionalShadowConfig: ShadowConfig = {
    blurMultiplier: 0.9,
    xOffsetMultiplier: 0,
    yOffsetMultiplier: 0.4,
    opacity: 0.22,
};

/**
 * Apply elevation shadow treatment to a component.
 *
 * @param elevationValue The number of pixels of depth or an ElevationMultiplier value.
 */
export function applyElevation(
    elevationValue: ElevationMultiplier | number
): CSSRules<DesignSystem> {
    return { boxShadow: combinedShadow(elevationValue) };
}

function combinedShadow(
    elevationValue: ElevationMultiplier | number,
    color: string = black
): DesignSystemResolver<string> {
    return (designSystem: DesignSystem): string => {
        const ambientShadow: string = elevationShadow(
            elevationValue,
            color,
            ambientShadowConfig
        )(designSystem);
        const directionalShadow: string = elevationShadow(
            elevationValue,
            color,
            directionalShadowConfig
        )(designSystem);

        return `${directionalShadow}, ${ambientShadow}`;
    };
}

/**
 * Apply elevation
 * Used to apply elevation shadow treatment to a component
 *
 * @deprecated Use applyElevation.
 */
export function elevation(
    elevationValue: ElevationMultiplier | number,
    color: string = black
): (config: DesignSystem) => CSSRules<DesignSystem> {
    return (config: DesignSystem): CSSRules<DesignSystem> => {
        const ambientShadow: string = elevationShadow(
            elevationValue,
            color,
            ambientShadowConfig
        )(config);
        const directionalShadow: string = elevationShadow(
            elevationValue,
            color,
            directionalShadowConfig
        )(config);

        return {
            boxShadow: `${directionalShadow}, ${ambientShadow}`,
        };
    };
}

/**
 * Generate Elevation Shadow
 * Generates a string representing a box shadow value
 */
export function elevationShadow(
    elevationValue: number,
    color: string,
    shadowConfig: ShadowConfig
): (config: DesignSystem) => string {
    return (config: DesignSystem): string => {
        const xValue: number = parseFloat(
            (shadowConfig.xOffsetMultiplier * elevationValue).toFixed(1)
        );
        const yValue: number = parseFloat(
            (shadowConfig.yOffsetMultiplier * elevationValue).toFixed(1)
        );

        const xOffset: string = toPx(xValue);
        const yOffset: string = toPx(yValue);
        const blur: string = toPx(shadowConfig.blurMultiplier * elevationValue);
        const opacity: number =
            elevationValue > 24
                ? shadowConfig.opacity
                : Math.round(shadowConfig.opacity * 100 * 0.6) / 100;

        return `${xOffset} ${yOffset} ${blur} ${ColorRGBA64.fromObject(
            Object.assign(parseColorString(color).toObject(), { a: opacity })
        ).toStringWebRGBA()}`;
    };
}
