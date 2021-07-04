import { customElement } from "@microsoft/fast-element";
import { Combobox, ComboboxTemplate as template } from "@microsoft/fast-foundation";
import { ComboboxStyles as styles } from "./combobox.styles";

/**
 * The FAST select Custom Element. Implements, {@link @microsoft/fast-foundation#Select}
 * {@link @microsoft/fast-foundation#SelectTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-select\>
 *
 */
@customElement({
    name: "fast-combobox",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true
    }
})
export class FASTCombobox extends Combobox {}

/**
 * Styles for Select
 * @public
 */
export const ComboboxStyles = styles;
