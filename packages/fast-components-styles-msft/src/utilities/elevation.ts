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
    return { "box-shadow": combinedShadow(elevationValue) };
}

function combinedShadow(
    elevationValue: ElevationMultiplier | number,
    color: string = black
): DesignSystemResolver<string> {
    return (designSystem: DesignSystem): string => {
        const fn: (
            conf: ShadowConfig
        ) => DesignSystemResolver<string> = elevationShadow.bind(
            null,
            elevationValue,
            color
        );

        return [directionalShadowConfig, ambientShadowConfig]
            .map((conf: ShadowConfig) => fn(conf)(designSystem))
            .join(", ");
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
        return {
            "box-shadow": combinedShadow(elevationValue, color),
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
        const { r, g, b }: ColorRGBA64 = parseColorString(color);
        const {
            xOffsetMultiplier,
            yOffsetMultiplier,
            opacity,
            blurMultiplier,
        }: ShadowConfig = shadowConfig;

        return [xOffsetMultiplier, yOffsetMultiplier]
            .map((val: number) => parseFloat((val * elevationValue).toFixed(1)))
            .concat(blurMultiplier * elevationValue)
            .map(toPx)
            .concat(
                new ColorRGBA64(
                    r,
                    g,
                    b,
                    elevationValue > 24 ? opacity : Math.round(opacity * 60) / 100
                ).toStringWebRGBA()
            )
            .join(" ");
    };
}
