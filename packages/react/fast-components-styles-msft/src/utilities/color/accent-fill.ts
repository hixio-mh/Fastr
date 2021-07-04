import { inRange } from "lodash-es";
import { DesignSystem, DesignSystemResolver } from "../../design-system";
import {
    accentBaseColor,
    accentFillActiveDelta,
    accentFillFocusDelta,
    accentFillHoverDelta,
    accentFillSelectedDelta,
    accentPalette,
    neutralFillActiveDelta,
    neutralFillHoverDelta,
    neutralFillRestDelta,
} from "../design-system";
import { accentForegroundCut } from "./accent-foreground-cut";
import {
    colorRecipeFactory,
    contrast,
    designSystemResolverMax,
    FillSwatchFamily,
    Swatch,
    SwatchFamilyResolver,
    swatchFamilyToSwatchRecipeFactory,
    SwatchFamilyType,
    SwatchRecipe,
} from "./common";
import {
    findClosestBackgroundIndex,
    findClosestSwatchIndex,
    getSwatch,
    isDarkMode,
    Palette,
} from "./palette";

const neutralFillThreshold: DesignSystemResolver<number> = designSystemResolverMax(
    neutralFillRestDelta,
    neutralFillHoverDelta,
    neutralFillActiveDelta
);

function accentFillAlgorithm(
    contrastTarget: number
): DesignSystemResolver<FillSwatchFamily> {
    return (designSystem: DesignSystem): FillSwatchFamily => {
        const palette: Palette = accentPalette(designSystem);
        const paletteLength: number = palette.length;
        const accent: Swatch = accentBaseColor(designSystem);
        const textColor: Swatch = accentForegroundCut(
            Object.assign({}, designSystem, {
                backgroundColor: accent,
            })
        );
        const hoverDelta: number = accentFillHoverDelta(designSystem);

        // Use the hover direction that matches the neutral fill recipe.
        const backgroundIndex: number = findClosestBackgroundIndex(designSystem);
        const swapThreshold: number = neutralFillThreshold(designSystem);
        const direction: 1 | -1 = backgroundIndex >= swapThreshold ? -1 : 1;
        const maxIndex: number = paletteLength - 1;
        const accentIndex: number = findClosestSwatchIndex(
            accentPalette,
            accent
        )(designSystem);

        let accessibleOffset: number = 0;

        // Move the accent color the direction of hover, while maintaining the foreground color.
        while (
            accessibleOffset < direction * hoverDelta &&
            inRange(accentIndex + accessibleOffset + direction, 0, paletteLength) &&
            contrast(palette[accentIndex + accessibleOffset + direction], textColor) >=
                contrastTarget &&
            inRange(accentIndex + accessibleOffset + direction + direction, 0, maxIndex)
        ) {
            accessibleOffset += direction;
        }

        const hoverIndex: number = accentIndex + accessibleOffset;
        const restIndex: number = hoverIndex + direction * -1 * hoverDelta;
        const activeIndex: number =
            restIndex + direction * accentFillActiveDelta(designSystem);
        const focusIndex: number =
            restIndex + direction * accentFillFocusDelta(designSystem);

        return {
            rest: getSwatch(restIndex, palette),
            hover: getSwatch(hoverIndex, palette),
            active: getSwatch(activeIndex, palette),
            focus: getSwatch(focusIndex, palette),
            selected: getSwatch(
                restIndex +
                    (isDarkMode(designSystem)
                        ? accentFillSelectedDelta(designSystem) * -1
                        : accentFillSelectedDelta(designSystem)),
                palette
            ),
        };
    };
}

export const accentFill: SwatchFamilyResolver<FillSwatchFamily> = colorRecipeFactory(
    accentFillAlgorithm(4.5)
);

export const accentFillLarge: SwatchFamilyResolver<FillSwatchFamily> = colorRecipeFactory(
    accentFillAlgorithm(3)
);

export const accentFillRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.rest, accentFill);
export const accentFillHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.hover, accentFill);
export const accentFillActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.active, accentFill);
export const accentFillFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.focus, accentFill);
export const accentFillSelected: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.selected, accentFill);

export const accentFillLargeRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.rest, accentFillLarge);
export const accentFillLargeHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.hover, accentFillLarge);
export const accentFillLargeActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.active, accentFillLarge);
export const accentFillLargeFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.focus, accentFillLarge);
export const accentFillLargeSelected: SwatchRecipe = swatchFamilyToSwatchRecipeFactory<
    FillSwatchFamily
>(SwatchFamilyType.selected, accentFillLarge);
