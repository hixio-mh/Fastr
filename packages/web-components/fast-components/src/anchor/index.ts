import { attr, customElement } from "@microsoft/fast-element";
import { Anchor, AnchorTemplate as template } from "@microsoft/fast-foundation";
import { ButtonAppearance } from "../button";
import { AnchorStyles as styles } from "./anchor.styles";

/**
 * Types of anchor appearance.
 * @public
 */
export type AnchorAppearance = ButtonAppearance | "hypertext";

/**
 * The FAST Anchor Element. Implements {@link @microsoft/fast-foundation#Anchor},
 * {@link @microsoft/fast-foundation#AnchorTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-anchor\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
@customElement({
    name: "fast-anchor",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true,
    },
})
export class FASTAnchor extends Anchor {
    /**
     * The appearance the anchor should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance: AnchorAppearance;
    public appearanceChanged(
        oldValue: AnchorAppearance,
        newValue: AnchorAppearance
    ): void {
        if (oldValue !== newValue) {
            this.classList.add(newValue);
            this.classList.remove(oldValue);
        }
    }

    public connectedCallback() {
        super.connectedCallback();

        if (!this.appearance) {
            this.appearance = "neutral";
        }
    }

    /**
     * Applies 'icon-only' class when there is only an SVG in the default slot
     *
     * @internal
     *
     */
    public defaultSlottedContentChanged(oldValue, newValue): void {
        const slottedElements = this.defaultSlottedContent.filter(
            x => x.nodeType === Node.ELEMENT_NODE
        );
        if (slottedElements.length === 1 && slottedElements[0] instanceof SVGElement) {
            this.control.classList.add("icon-only");
        } else {
            this.control.classList.remove("icon-only");
        }
    }
}

/**
 * Styles for Anchor
 * @public
 */
export const AnchorStyles = styles;
