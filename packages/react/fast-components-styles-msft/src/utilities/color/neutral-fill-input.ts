import { DesignSystem, DesignSystemResolver } from "../../design-system";
import {
    neutralFillInputActiveDelta,
    neutralFillInputFocusDelta,
    neutralFillInputHoverDelta,
    neutralFillInputRestDelta,
    neutralFillInputSelectedDelta,
    neutralPalette,
} from "../design-system";
import { findClosestBackgroundIndex, getSwatch, isDarkMode } from "./palette";
import {
    ColorRecipe,
    colorRecipeFactory,
    FillSwatchFamily,
    Swatch,
    SwatchRecipe,
} from "./common";

/**
 * Algorithm for determining neutral backplate colors
 */
function neutralFillInputAlgorithm(
    indexResolver: DesignSystemResolver<number>
): DesignSystemResolver<Swatch> {
    return (designSystem: DesignSystem): Swatch => {
        const direction: 1 | -1 = isDarkMode(designSystem) ? -1 : 1;
        return getSwatch(
            findClosestBackgroundIndex(designSystem) -
                indexResolver(designSystem) * direction,
            neutralPalette(designSystem)
        );
    };
}

export const neutralFillInputRest: SwatchRecipe = colorRecipeFactory(
    neutralFillInputAlgorithm(neutralFillInputRestDelta)
);
export const neutralFillInputHover: SwatchRecipe = colorRecipeFactory(
    neutralFillInputAlgorithm(neutralFillInputHoverDelta)
);
export const neutralFillInputActive: SwatchRecipe = colorRecipeFactory(
    neutralFillInputAlgorithm(neutralFillInputActiveDelta)
);
export const neutralFillInputFocus: SwatchRecipe = colorRecipeFactory(
    neutralFillInputAlgorithm(neutralFillInputFocusDelta)
);
export const neutralFillInputSelected: SwatchRecipe = colorRecipeFactory(
    neutralFillInputAlgorithm(neutralFillInputSelectedDelta)
);

export const neutralFillInput: ColorRecipe<FillSwatchFamily> = colorRecipeFactory(
    (designSystem: DesignSystem): FillSwatchFamily => {
        return {
            rest: neutralFillInputRest(designSystem),
            hover: neutralFillInputHover(designSystem),
            active: neutralFillInputActive(designSystem),
            focus: neutralFillInputFocus(designSystem),
            selected: neutralFillInputSelected(designSystem),
        };
    }
);
