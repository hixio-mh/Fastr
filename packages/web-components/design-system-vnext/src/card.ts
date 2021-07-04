import { css, html } from "@microsoft/fast-element";
import { FoundationElement } from "@microsoft/fast-foundation";
import { neutralFillCardRecipe, neutralForegroundRestRecipe } from "./recipes";
import { backgroundColor, neutralForegroundRest } from "./tokens";

class Card extends FoundationElement {
    connectedCallback() {
        super.connectedCallback();
        backgroundColor.setValueFor(this, neutralFillCardRecipe);
        neutralForegroundRest.setValueFor(this, neutralForegroundRestRecipe);
    }
}

const styles = css`
    :host {
        display: inline-block;
        width: 200px;
        height: 300px;
        background: ${backgroundColor};
        color: ${neutralForegroundRest};
        transform: translateY(20px);
    }
`;
export const CardDefinition = Card.compose({
    baseName: "card",
    styles,
    template: html`
        <slot>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but
                also the
            </p>
        </slot>
    `,
});
