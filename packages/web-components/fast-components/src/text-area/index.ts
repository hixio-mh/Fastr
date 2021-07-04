import { attr } from "@microsoft/fast-element";
import {
    TextArea as FoundationTextArea,
    textAreaTemplate as template,
} from "@microsoft/fast-foundation";
import { textAreaStyles as styles } from "./text-area.styles";

/**
 * Text area appearances
 * @public
 */
export type TextAreaAppearance = "filled" | "outline";

/**
 * @internal
 */
export class TextArea extends FoundationTextArea {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance: TextAreaAppearance;

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

/**
 * The FAST Text Area Custom Element. Implements {@link @microsoft/fast-foundation#TextArea},
 * {@link @microsoft/fast-foundation#textAreaTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-text-area\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export const fastTextArea = TextArea.compose({
    baseName: "text-area",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true,
    },
});

/**
 * Styles for TextArea
 * @public
 */
export const textAreaStyles = styles;
