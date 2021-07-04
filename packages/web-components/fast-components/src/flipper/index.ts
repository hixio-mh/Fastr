import { Flipper, flipperTemplate as template } from "@microsoft/fast-foundation";
import { flipperStyles as styles } from "./flipper.styles";

/**
 * The FAST Flipper Element. Implements {@link @microsoft/fast-foundation#Flipper},
 * {@link @microsoft/fast-foundation#flipperTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-flipper\>
 */
export const fastFlipper = Flipper.compose({
    baseName: "flipper",
    template,
    styles,
});

/**
 * Styles for Flipper
 * @public
 */
export const flipperStyles = styles;
