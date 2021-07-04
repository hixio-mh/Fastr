import { DesignSystem, DesignSystemResolver } from "../../design-system";
import {
    neutralFillActiveDelta,
    neutralFillFocusDelta,
    neutralFillHoverDelta,
    neutralFillRestDelta,
    neutralFillSelectedDelta,
    neutralPalette,
} from "../design-system";
import {
    ColorRecipe,
    colorRecipeFactory,
    designSystemResolverMax,
    FillSwatchFamily,
    Swatch,
    SwatchRecipe,
} from "./common";
import { findClosestBackgroundIndex, getSwatch } from "./palette";

const neutralFillThreshold: DesignSystemResolver<number> = designSystemResolverMax(
    neutralFillRestDelta,
    neutralFillHoverDelta,
    neutralFillActiveDelta,
    neutralFillFocusDelta
);

function neutralFillAlgorithm(
    deltaResolver: DesignSystemResolver<number>
): DesignSystemResolver<Swatch> {
    return (designSystem: DesignSystem): Swatch => {
        const backgroundIndex: number = findClosestBackgroundIndex(designSystem);
        const swapThreshold: number = neutralFillThreshold(designSystem);
        const direction: 1 | -1 = backgroundIndex >= swapThreshold ? -1 : 1;

        return getSwatch(
            backgroundIndex + direction * deltaResolver(designSystem),
            neutralPalette(designSystem)
        );
    };
}

export const neutralFillRest: SwatchRecipe = colorRecipeFactory(
    neutralFillAlgorithm(neutralFillRestDelta)
);
export const neutralFillHover: SwatchRecipe = colorRecipeFactory(
    neutralFillAlgorithm(neutralFillHoverDelta)
);
export const neutralFillActive: SwatchRecipe = colorRecipeFactory(
    neutralFillAlgorithm(neutralFillActiveDelta)
);
export const neutralFillFocus: SwatchRecipe = colorRecipeFactory(
    neutralFillAlgorithm(neutralFillFocusDelta)
);
export const neutralFillSelected: SwatchRecipe = colorRecipeFactory(
    neutralFillAlgorithm(neutralFillSelectedDelta)
);

export const neutralFill: ColorRecipe<FillSwatchFamily> = colorRecipeFactory(
    (designSystem: DesignSystem): FillSwatchFamily => {
        return {
            rest: neutralFillRest(designSystem),
            hover: neutralFillHover(designSystem),
            active: neutralFillActive(designSystem),
            focus: neutralFillFocus(designSystem),
            selected: neutralFillSelected(designSystem),
        };
    }
);

export const neutralFillRestCustomProperty = "var(--neutral-fill-rest)";
export const neutralFillHoverCustomProperty = "var(--neutral-fill-hover)";
export const neutralFillActiveCustomProperty = "var(--neutral-fill-active)";
export const neutralFillFocusCustomProperty = "var(--neutral-fill-focus)";
export const neutralFillSelectedCustomProperty = "var(--neutral-fill-selected)";

export const neutralFillRestDefinition = {
    name: "neutral-fill-rest",
    value: neutralFillRest,
};
export const neutralFillHoverDefinition = {
    name: "neutral-fill-hover",
    value: neutralFillHover,
};
export const neutralFillActiveDefinition = {
    name: "neutral-fill-active",
    value: neutralFillActive,
};
export const neutralFillFocusDefinition = {
    name: "neutral-fill-focus",
    value: neutralFillFocus,
};
export const neutralFillSelectedDefinition = {
    name: "neutral-fill-selected",
    value: neutralFillSelected,
};
