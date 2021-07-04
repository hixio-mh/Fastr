import { clamp, ColorRGBA64 } from "@microsoft/fast-colors";
import { add, multiply, subtract } from "../utilities/math";
import {
    baseLayerLuminance,
    neutralFillActiveDelta,
    neutralFillCardDelta,
    neutralFillHoverDelta,
    neutralFillRestDelta,
    neutralPalette,
} from "../fast-design-system";
import { DesignSystemResolver, FASTDesignSystem } from "../fast-design-system";
import { findClosestSwatchIndex, getSwatch, swatchByMode } from "./palette";
import {
    ColorRecipe,
    colorRecipeFactory,
    designSystemResolverMax,
    Swatch,
} from "./common";

function luminanceOrBackgroundColor(
    luminanceRecipe: DesignSystemResolver<string>,
    backgroundRecipe: DesignSystemResolver<string>
): DesignSystemResolver<string> {
    return (designSystem: FASTDesignSystem): string => {
        return baseLayerLuminance(designSystem) === -1
            ? backgroundRecipe(designSystem)
            : luminanceRecipe(designSystem);
    };
}

/**
 * Find the palette color that's closest to the desired base layer luminance.
 */
const baseLayerLuminanceSwatch: DesignSystemResolver<Swatch> = (
    designSystem: FASTDesignSystem
): Swatch => {
    const luminance: number = baseLayerLuminance(designSystem);
    return new ColorRGBA64(luminance, luminance, luminance, 1).toStringHexRGB();
};

/**
 * Get the index of the base layer palette color.
 */
const baseLayerLuminanceIndex: DesignSystemResolver<number> = findClosestSwatchIndex(
    neutralPalette,
    baseLayerLuminanceSwatch
);

/**
 * Get the actual value of the card layer index, clamped so we can use it to base other layers from.
 */
const neutralLayerCardIndex: DesignSystemResolver<number> = (
    designSystem: FASTDesignSystem
): number =>
    clamp(
        subtract(baseLayerLuminanceIndex, neutralFillCardDelta)(designSystem),
        0,
        neutralPalette(designSystem).length - 1
    );

/**
 * Light mode L2 is significant because it happens at the same point as the neutral fill flip. Use this as the minimum index for L2.
 */
const lightNeutralLayerL2: DesignSystemResolver<number> = designSystemResolverMax(
    neutralFillRestDelta,
    neutralFillHoverDelta,
    neutralFillActiveDelta
);

/**
 * The index for L2 based on luminance, adjusted for the flip in light mode if necessary.
 */
const neutralLayerL2Index: DesignSystemResolver<number> = designSystemResolverMax(
    add(baseLayerLuminanceIndex, neutralFillCardDelta),
    lightNeutralLayerL2
);

/**
 * Dark mode L4 is the darkest recommended background in the standard guidance, which is
 * calculated based on luminance to work with variable sized ramps.
 */
const darkNeutralLayerL4: DesignSystemResolver<number> = (
    designSystem: FASTDesignSystem
): number => {
    const darkLum: number = 0.14;
    const darkColor: ColorRGBA64 = new ColorRGBA64(darkLum, darkLum, darkLum, 1);
    const darkRefIndex: number = findClosestSwatchIndex(
        neutralPalette,
        darkColor.toStringHexRGB()
    )(designSystem);
    return darkRefIndex;
};

/**
 * Used as the background color for floating layers like context menus and flyouts.
 * @internal
 * @deprecated - to-be deleted
 */
export const neutralLayerFloating_DEPRECATED: ColorRecipe<Swatch> = colorRecipeFactory(
    luminanceOrBackgroundColor(
        getSwatch(subtract(neutralLayerCardIndex, neutralFillCardDelta), neutralPalette),
        swatchByMode(neutralPalette)(
            0,
            subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 5))
        )
    )
);

/**
 * Used as the background color for cards. Pair with `neutralLayerCardContainer` for the container background.
 * @internal
 * @deprecated - to-be deleted
 */
export const neutralLayerCard_DEPRECATED: ColorRecipe<Swatch> = colorRecipeFactory(
    luminanceOrBackgroundColor(
        getSwatch(neutralLayerCardIndex, neutralPalette),
        swatchByMode(neutralPalette)(
            0,
            subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 4))
        )
    )
);

/**
 * Used as the background color for card containers. Pair with `neutralLayerCard` for the card backgrounds.
 * @internal
 * @deprecated - to-be deleted
 */
export const neutralLayerCardContainer_DEPRECATED: ColorRecipe<Swatch> = colorRecipeFactory(
    luminanceOrBackgroundColor(
        getSwatch(add(neutralLayerCardIndex, neutralFillCardDelta), neutralPalette),
        swatchByMode(neutralPalette)(
            neutralFillCardDelta,
            subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 3))
        )
    )
);

/**
 * Used as the background color for the primary content layer (L1).
 * @internal
 * @deprecated - to-be deleted
 */
export const neutralLayerL1_DEPRECATED: ColorRecipe<Swatch> = colorRecipeFactory(
    luminanceOrBackgroundColor(
        getSwatch(baseLayerLuminanceIndex, neutralPalette),
        swatchByMode(neutralPalette)(
            0,
            subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 3))
        )
    )
);

/**
 * Alternate darker color for L1 surfaces. Currently the same as card container, but use
 * the most applicable semantic named recipe.
 * @internal
 * @deprecated - to-be deleted
 */
export const neutralLayerL1Alt_DEPRECATED: ColorRecipe<Swatch> = neutralLayerCardContainer_DEPRECATED;

/**
 * Used as the background for the top command surface, logically below L1.
 * @internal
 * @deprecated - to-be deleted
 */
export const neutralLayerL2_DEPRECATED: ColorRecipe<Swatch> = colorRecipeFactory(
    luminanceOrBackgroundColor(
        getSwatch(neutralLayerL2Index, neutralPalette),
        swatchByMode(neutralPalette)(
            lightNeutralLayerL2,
            subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 2))
        )
    )
);

/**
 * Used as the background for secondary command surfaces, logically below L2.
 * @internal
 * @deprecated - to-be deleted
 */
export const neutralLayerL3_DEPRECATED: ColorRecipe<Swatch> = colorRecipeFactory(
    luminanceOrBackgroundColor(
        getSwatch(add(neutralLayerL2Index, neutralFillCardDelta), neutralPalette),
        swatchByMode(neutralPalette)(
            add(lightNeutralLayerL2, neutralFillCardDelta),
            subtract(darkNeutralLayerL4, neutralFillCardDelta)
        )
    )
);

/**
 * Used as the background for the lowest command surface or title bar, logically below L3.
 * @internal
 * @deprecated - to-be deleted
 */
export const neutralLayerL4_DEPRECATED: ColorRecipe<Swatch> = colorRecipeFactory(
    luminanceOrBackgroundColor(
        getSwatch(
            add(neutralLayerL2Index, multiply(neutralFillCardDelta, 2)),
            neutralPalette
        ),
        swatchByMode(neutralPalette)(
            add(lightNeutralLayerL2, multiply(neutralFillCardDelta, 2)),
            darkNeutralLayerL4
        )
    )
);
