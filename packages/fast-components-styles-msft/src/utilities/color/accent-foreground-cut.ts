import { black, white } from "./color-constants";
import { DesignSystem } from "../../design-system";
import { accentSwatch } from "./accent";
import { contrast, Swatch, SwatchRecipe, SwatchResolver } from "./common";

/**
 * Function to derive accentForegroundCut from an input background and target contrast ratio
 */
const accentForegroundCutAlgorithm: (
    backgroundColor: Swatch,
    targetContrast: number
) => Swatch = (backgroundColor: Swatch, targetContrast: number): Swatch => {
    return contrast(white, backgroundColor) >= targetContrast ? white : black;
};

/**
 * Factory to create a accent-foreground-cut function that operates on a target contrast ratio
 */
function accentForegroundCutFactory(targetContrast: number): SwatchRecipe {
    function accentForegroundCutInternal(designSystem: DesignSystem): Swatch;
    function accentForegroundCutInternal(
        backgroundResolver: SwatchResolver
    ): SwatchResolver;
    function accentForegroundCutInternal(arg: any): any {
        if (typeof arg === "function") {
            return (designSystem: DesignSystem): Swatch => {
                return accentForegroundCutAlgorithm(arg(designSystem), targetContrast);
            };
        } else {
            return accentForegroundCutAlgorithm(accentSwatch(arg), targetContrast);
        }
    }

    return accentForegroundCutInternal;
}

/**
 * Cut text for normal sized text, less than 18pt normal weight
 */
export const accentForegroundCut: SwatchRecipe = accentForegroundCutFactory(4.5);

/**
 * Cut text for large sized text, greater than 18pt or 16pt and bold
 */
export const accentForegroundCutLarge: SwatchRecipe = accentForegroundCutFactory(3);
