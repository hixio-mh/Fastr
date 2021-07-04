import { isDarkMode } from "./palette";
import { neutralForegroundDark, neutralForegroundLight } from "./neutral-foreground";
import { Swatch, SwatchResolver } from "./common";
import {
    DesignSystem,
    ensureDesignSystemDefaults,
    withDesignSystemDefaults,
} from "../../design-system";

/**
 * Function to derive neutralFocus from color inputs.
 */
const neutralFocusAlgorithm: SwatchResolver = (designSystem: DesignSystem): Swatch => {
    return isDarkMode(designSystem)
        ? neutralForegroundLight(designSystem)
        : neutralForegroundDark(designSystem);
};

export function neutralFocus(designSystem: DesignSystem): Swatch;
export function neutralFocus(backgroundResolver: SwatchResolver): SwatchResolver;
export function neutralFocus(arg: any): any {
    if (typeof arg === "function") {
        return ensureDesignSystemDefaults(
            (designSystem: DesignSystem): Swatch => {
                const backgroundColor: Swatch = arg(designSystem);
                return neutralFocusAlgorithm(
                    Object.assign({}, designSystem, {
                        backgroundColor,
                    })
                );
            }
        );
    } else {
        return neutralFocusAlgorithm(withDesignSystemDefaults(arg));
    }
}
