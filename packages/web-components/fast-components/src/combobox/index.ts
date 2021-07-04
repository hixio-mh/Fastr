import {
    Combobox,
    ComboboxOptions,
    comboboxTemplate as template,
} from "@microsoft/fast-foundation";
import { comboboxStyles as styles } from "./combobox.styles";

/**
 * The FAST Combobox Custom Element. Implements {@link @microsoft/fast-foundation#Combobox},
 * {@link @microsoft/fast-foundation#comboboxTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fast-combobox\>
 *
 */
export const fastCombobox = Combobox.compose<ComboboxOptions>({
    baseName: "combobox",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true,
    },
    indicator: `
        <svg
            class="select-indicator"
            part="select-indicator"
            viewBox="0 0 12 7"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
            />
        </svg>
    `,
});

/**
 * Styles for combobox
 * @public
 */
export const comboboxStyles = styles;
