import { Slider, sliderTemplate as template } from "@microsoft/fast-foundation";
import { sliderStyles as styles } from "./slider.styles";

/**
 * The FAST Slider Custom Element. Implements {@link @microsoft/fast-foundation#(Slider:class)},
 * {@link @microsoft/fast-foundation#sliderTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-slider\>
 */
export const fastSlider = Slider.compose({
    baseName: "slider",
    template,
    styles,
});

/**
 * Styles for Slider
 * @public
 */
export const sliderStyles = styles;
