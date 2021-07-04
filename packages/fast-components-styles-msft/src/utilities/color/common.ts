import { DesignSystem, DesignSystemResolver } from "../../design-system";
import { memoize } from "lodash-es";
import {
    ColorRGBA64,
    contrastRatio,
    isColorStringHexRGB,
    isColorStringWebRGB,
    parseColorHexRGB,
    parseColorWebRGB,
    rgbToRelativeLuminance,
} from "@microsoft/fast-colors";

/**
 * Describes the format of a single color in a palette
 */
export type Swatch = string;

/**
 * Interface describing a family of swatches.
 */
export interface SwatchFamily {
    /**
     * The swatch to apply to the rest state
     */
    rest: Swatch;

    /**
     * The swatch to apply to the hover state
     */
    hover: Swatch;

    /**
     * The swatch to apply to the active state
     */
    active: Swatch;

    /**
     * The swatch to apply to the focus state
     */
    focus: Swatch;
}

/**
 * Interface describing a family of swatches applied as fills
 */
export interface FillSwatchFamily extends SwatchFamily {
    /**
     * The swatch to apply to the selected state
     */
    selected: Swatch;
}

/**
 * A DesignSystemResolver that resolves a Swatch
 */
export type SwatchResolver = DesignSystemResolver<Swatch>;

/**
 * A function that accepts a design system and resolves a SwatchFamily or FillSwatchFamily
 */
export type SwatchFamilyResolver<
    T extends SwatchFamily = SwatchFamily
> = DesignSystemResolver<T>;

/**
 * A function type that resolves a Swatch from a SwatchResolver
 * and applies it to the backgroundColor property of the design system
 * of the returned DesignSystemResolver
 */
export type DesignSystemResolverFromSwatchResolver<T> = (
    resolver: SwatchResolver
) => DesignSystemResolver<T>;

/**
 * The states that a swatch can have
 */
export enum SwatchFamilyType {
    rest = "rest",
    hover = "hover",
    active = "active",
    focus = "focus",
    selected = "selected",
}

export type ColorRecipe<T> = DesignSystemResolver<T> &
    DesignSystemResolverFromSwatchResolver<T>;

export function colorRecipeFactory<T>(recipe: DesignSystemResolver<T>): ColorRecipe<T> {
    const memoizedRecipe: typeof recipe = memoize(recipe);

    function curryRecipe(designSystem: DesignSystem): T;
    function curryRecipe(
        backgroundResolver: SwatchResolver
    ): (designSystem: DesignSystem) => T;
    function curryRecipe(arg: any): any {
        if (typeof arg === "function") {
            return (designSystem: DesignSystem): T => {
                return memoizedRecipe(
                    Object.assign({}, designSystem, {
                        backgroundColor: arg(designSystem),
                    })
                );
            };
        } else {
            return memoizedRecipe(arg);
        }
    }

    return curryRecipe;
}

/**
 * A function to apply a named style or recipe. A ColorRecipe has several behaviors:
 * 1. When provided a callback function, the color Recipe returns a function that expects a design-system.
 * When called, the returned function will call the callback function with the input design-system and apply
 * the result of that function as background to the recipe. This is useful for applying text recipes to colors
 * other than the design system backgroundColor
 * 2. When provided a design system, the recipe will use that design-system to generate the color
 */
export type SwatchRecipe = ColorRecipe<Swatch>;

/**
 * Helper function to transform a SwatchFamilyResolver into simple ColorRecipe for simple use
 * use in stylesheets.
 */
export function swatchFamilyToSwatchRecipeFactory<T extends SwatchFamily>(
    type: keyof T,
    callback: SwatchFamilyResolver<T>
): SwatchRecipe {
    const memoizedRecipe: typeof callback = memoize(callback);
    return (arg: DesignSystem | SwatchResolver): any => {
        if (typeof arg === "function") {
            return (designSystem: DesignSystem): Swatch => {
                return memoizedRecipe(
                    Object.assign({}, designSystem, {
                        backgroundColor: arg(designSystem),
                    })
                )[type as string];
            };
        } else {
            return memoizedRecipe(arg)[type];
        }
    };
}

/**
 * Converts a color string into a ColorRGBA64 instance.
 * Supports #RRGGBB and rgb(r, g, b) formats
 */
export function parseColorString(color: string): ColorRGBA64 {
    if (isColorStringHexRGB(color)) {
        return parseColorHexRGB(color);
    } else if (isColorStringWebRGB(color)) {
        return parseColorWebRGB(color);
    }

    throw new Error(
        `${color} cannot be converted to a ColorRGBA64. Color strings must be one of the following formats: "#RGB", "#RRGGBB", or "rgb(r, g, b)"`
    );
}

/**
 * Determines if a string value represents a color
 * Supports #RRGGBB and rgb(r, g, b) formats
 */
export function isValidColor(color: string): boolean {
    return isColorStringHexRGB(color) || isColorStringWebRGB(color);
}

/**
 * Determines if a color string matches another color.
 * Supports #RRGGBB and rgb(r, g, b) formats
 */
export function colorMatches(a: string, b: string): boolean {
    return parseColorString(a).equalValue(parseColorString(b));
}

/**
 * Returns the contrast value between two colors. If either value is not a color, -1 will be returned
 * Supports #RRGGBB and rgb(r, g, b) formats
 */
export const contrast: (a: string, b: string) => number = memoize(
    (a: string, b: string): number => {
        const alpha: ColorRGBA64 = parseColorString(a);
        const beta: ColorRGBA64 = parseColorString(b);

        return contrastRatio(alpha, beta);
    },
    (a: string, b: string): string => a + b
);

/**
 * Returns the relative luminance of a color. If the value is not a color, -1 will be returned
 * Supports #RRGGBB and rgb(r, g, b) formats
 */
export function luminance(color: any): number {
    return rgbToRelativeLuminance(parseColorString(color));
}

export function designSystemResolverMax(
    ...args: Array<DesignSystemResolver<number>>
): DesignSystemResolver<number> {
    return (designSystem: DesignSystem): number =>
        Math.max.apply(
            null,
            args.map((fn: DesignSystemResolver<number>) => fn(designSystem))
        );
}
