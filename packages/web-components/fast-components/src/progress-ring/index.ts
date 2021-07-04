import {
    BaseProgress as Progress,
    progressRingTemplate as template,
} from "@microsoft/fast-foundation";
import { progressRingStyles as styles } from "./progress-ring.styles";

/**
 * The FAST Progress Ring Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#progressRingTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-progress-ring\>
 */
export const fastProgressRing = Progress.compose({
    baseName: "progress-ring",
    template,
    styles,
});

/**
 * Styles for ProgressRing
 * @public
 */
export const progressRingStyles = styles;
