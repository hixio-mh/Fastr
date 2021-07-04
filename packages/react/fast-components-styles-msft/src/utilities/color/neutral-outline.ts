import { DesignSystem } from "../../design-system";
import {
    neutralOutlineActiveDelta,
    neutralOutlineFocusDelta,
    neutralOutlineHoverDelta,
    neutralOutlineRestDelta,
    neutralPalette,
} from "../design-system";
import { findClosestBackgroundIndex, getSwatch, isDarkMode } from "./palette";
import {
    ColorRecipe,
    colorRecipeFactory,
    SwatchFamily,
    SwatchFamilyResolver,
    swatchFamilyToSwatchRecipeFactory,
    SwatchFamilyType,
    SwatchRecipe,
} from "./common";

const neutralOutlineAlgorithm: SwatchFamilyResolver = (
    designSystem: DesignSystem
): SwatchFamily => {
    const palette: string[] = neutralPalette(designSystem);
    const backgroundIndex: number = findClosestBackgroundIndex(designSystem);
    const direction: 1 | -1 = isDarkMode(designSystem) ? -1 : 1;

    const restDelta: number = neutralOutlineRestDelta(designSystem);
    const restIndex: number = backgroundIndex + direction * restDelta;
    const hoverDelta: number = neutralOutlineHoverDelta(designSystem);
    const hoverIndex: number = restIndex + direction * (hoverDelta - restDelta);
    const activeDelta: number = neutralOutlineActiveDelta(designSystem);
    const activeIndex: number = restIndex + direction * (activeDelta - restDelta);
    const focusDelta: number = neutralOutlineFocusDelta(designSystem);
    const focusIndex: number = restIndex + direction * (focusDelta - restDelta);

    return {
        rest: getSwatch(restIndex, palette),
        hover: getSwatch(hoverIndex, palette),
        active: getSwatch(activeIndex, palette),
        focus: getSwatch(focusIndex, palette),
    };
};

export const neutralOutline: ColorRecipe<SwatchFamily> = colorRecipeFactory(
    neutralOutlineAlgorithm
);
export const neutralOutlineRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.rest,
    neutralOutline
);
export const neutralOutlineHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.hover,
    neutralOutline
);
export const neutralOutlineActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.active,
    neutralOutline
);
export const neutralOutlineFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
    SwatchFamilyType.focus,
    neutralOutline
);
