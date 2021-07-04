import {
    findClosestSwatchIndex,
    isDarkMode,
    Palette,
    PaletteType,
    swatchByContrast,
} from "./palette";
import { neutralForegroundDark, neutralForegroundLight } from "./neutral-foreground";
import { ColorRecipe, colorRecipeFactory, Swatch, SwatchResolver } from "./common";
import { DesignSystem } from "../../design-system";
import { accentPalette, backgroundColor, neutralPalette } from "../design-system";

const targetRatio: number = 3;
const neutralContrast: SwatchResolver = swatchByContrast(backgroundColor)(neutralPalette)(
    (referenceColor: string, palette: Palette, designSystem: DesignSystem): number =>
        findClosestSwatchIndex(PaletteType.neutral, referenceColor)(designSystem)
)(
    (index: number, palette: Palette, designSystem: DesignSystem): 1 | -1 =>
        isDarkMode(designSystem) ? -1 : 1
)((contrastRatio: number): boolean => contrastRatio > targetRatio);

const accentFocus: SwatchResolver = swatchByContrast(backgroundColor)(accentPalette)(
    (referenceColor: string, palette: Palette, designSystem: DesignSystem): number =>
        findClosestSwatchIndex(PaletteType.accent, referenceColor)(designSystem)
)(
    (index: number, palette: Palette, designSystem: DesignSystem): 1 | -1 =>
        isDarkMode(designSystem) ? -1 : 1
)((contrastRatio: number): boolean => contrastRatio > targetRatio);

const neutralFocusAlgorithm: SwatchResolver = neutralContrast;
// const neutralFocusAlgorithm: SwatchResolver = accentFocus;

export function neutralFocus(designSystem: DesignSystem): Swatch;
export function neutralFocus(backgroundResolver: SwatchResolver): SwatchResolver;
export function neutralFocus(arg: any): any {
    if (typeof arg === "function") {
        return (designSystem: DesignSystem): Swatch => {
            const bgColor: Swatch = arg(designSystem);
            return neutralFocusAlgorithm(
                Object.assign({}, designSystem, {
                    backgroundColor: bgColor,
                })
            );
        };
    } else {
        return neutralFocusAlgorithm(arg);
    }
}
