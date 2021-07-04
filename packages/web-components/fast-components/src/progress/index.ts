import {
    BaseProgress as Progress,
    progressTemplate as template,
} from "@microsoft/fast-foundation";
import { progressStyles as styles } from "./progress.styles";

/**
 * The FAST Progress Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#progressTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-progress\>
 */
export const fastProgress = Progress.compose({
    baseName: "progress",
    template,
    styles,
});

/**
 * Styles for Progress
 * @public
 */
export const progressStyles = styles;
