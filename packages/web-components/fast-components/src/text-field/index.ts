import { attr, customElement } from "@microsoft/fast-element";
import { TextFieldTemplate as template, TextField } from "@microsoft/fast-foundation";
import { TextFieldStyles as styles } from "./text-field.styles";

/**
 * Text field appearances
 * @public
 */
export type TextFieldAppearance = "filled" | "outline";

/**
 * The FAST Text Field Custom Element. Implements {@link @microsoft/fast-foundation#TextField},
 * {@link @microsoft/fast-foundation#TextFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-text-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
    name: "fast-text-field",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true,
    },
})
export class FASTTextField extends TextField {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance: TextFieldAppearance;

    /**
     * @internal
     */
    public appearanceChanged(
        oldValue: TextFieldAppearance,
        newValue: TextFieldAppearance
    ): void {
        if (oldValue !== newValue) {
            this.classList.add(newValue);
            this.classList.remove(oldValue);
        }
    }

    /**
     * @internal
     */
    public connectedCallback() {
        super.connectedCallback();

        if (!this.appearance) {
            this.appearance = "outline";
        }
    }
}
