import { neutralFillCard, neutralForegroundRest } from "@microsoft/fast-components";
import { DesignTokenTarget } from "@microsoft/fast-foundation";
import { backgroundColor, neutralPalette } from "./tokens";

export const neutralForegroundRestRecipe = (element: DesignTokenTarget) => {
    return neutralForegroundRest({
        backgroundColor: backgroundColor.getValueFor(element),
        neutralPalette: neutralPalette.getValueFor(element),
    } as any);
};

export const neutralFillCardRecipe = (element: DesignTokenTarget) => {
    const arg = {
        backgroundColor: backgroundColor.getValueFor(element.parentElement as any),
        neutralPalette: neutralPalette.getValueFor(element),
    };
    return neutralFillCard(arg as any);
};
