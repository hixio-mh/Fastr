import { Dialog, dialogTemplate as template } from "@microsoft/fast-foundation";
import { dialogStyles as styles } from "./dialog.styles";

/**
 * The FAST Dialog Element. Implements {@link @microsoft/fast-foundation#Dialog},
 * {@link @microsoft/fast-foundation#dialogTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-dialog\>
 */
export const fastDialog = Dialog.compose({
    baseName: "dialog",
    template,
    styles,
});

/**
 * Styles for Dialog
 * @public
 */
export const dialogStyles = styles;
