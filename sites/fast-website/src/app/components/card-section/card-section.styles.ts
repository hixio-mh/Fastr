import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import { neutralFillHoverBehavior } from "@microsoft/fast-components";

export const CardSectionStyles = css`
    :host {
        --flow: column;
    }

    @media screen and (max-width: 900px) {
        :host {
            --flow: row;
        }
    }

    ${display("grid")} :host {
        grid-template-rows: repeat(4, min-content);
        grid-auto-flow: var(--flow);
        justify-content: center;
    }

    :host(:hover) ::slotted(site-feature-card) {
        filter: saturate(0);
    }

    :host ::slotted(site-feature-card:hover) {
        cursor: pointer;
        color: currentColor;
        background-color: var(--neutral-fill-hover);
        filter: saturate(1);
    }
`.withBehaviors(neutralFillHoverBehavior);
