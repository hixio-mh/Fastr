import { DesignSystem } from "../../design-system";
import { backgroundColor, neutralFillCardDelta, neutralPalette } from "../design-system";
import { Swatch, SwatchResolver } from "./common";
import { findClosestSwatchIndex, getSwatch } from "./palette";

const neutralCardFillAlgorithm: SwatchResolver = (designSystem: DesignSystem): Swatch => {
    const offset: number = neutralFillCardDelta(designSystem);
    const index: number = findClosestSwatchIndex(
        neutralPalette,
        backgroundColor(designSystem)
    )(designSystem);
    return getSwatch(
        index - (index < offset ? offset * -1 : offset),
        neutralPalette(designSystem)
    );
};

export function neutralFillCard(designSystem: DesignSystem): Swatch;
export function neutralFillCard(backgroundResolver: SwatchResolver): SwatchResolver;
export function neutralFillCard(arg: any): any {
    if (typeof arg === "function") {
        return (designSystem: DesignSystem): Swatch => {
            return neutralCardFillAlgorithm(
                Object.assign({}, designSystem, { backgroundColor: arg(designSystem) })
            );
        };
    } else {
        return neutralCardFillAlgorithm(arg);
    }
}
