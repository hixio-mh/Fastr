import { css } from "@microsoft/fast-element";
import { neutralForegroundRestBehavior } from "@microsoft/fast-components";
import { display } from "@microsoft/fast-foundation";

export const FeatureCardStyles = css`
    ${display("grid")} :host {
        contain: layout;
        grid-template-columns: repeat(3, minmax(150px, 1fr));
        grid-template-areas: "header main main";
        color: inherit;
        box-sizing: border-box;
        padding: 20px;
        box-shadow: unset;
    }

    :host::before {
        content: "";
        display: block;
        background-color: currentColor;
        position: fixed;
        height: 1px;
        width: 93%;
        left: 20px;
        top: 0;
    }

    :host(:hover) ::slotted(fast-anchor) {
        opacity: 1;
    }

    :host(:hover)::before {
        opacity: 0;
    }

    :host(:hover) ::slotted(:first-child) {
        color: var(--accent-fill-rest);
    }

    @media screen and (max-width: 540px) {
        ${display("grid")} :host {
            grid-template-columns: repeat(3, minmax(50px, 1fr));
            grid-template-areas:
                "header header header"
                "main main main";
        }
    }

    .card_heading {
        grid-area: header;
        padding-bottom: 10px;
    }

    .card_body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        grid-area: main;
    }

    ::slotted(h4) {
        font-size: 20px;
        margin: 0;
    }

    ::slotted(:first-child) {
        font-weight: bold;
        margin: 0 0 10px 0;
    }

    ::slotted(p) {
        margin: 0;
    }

    ::slotted(fast-anchor) {
        margin-right: 20px;
        opacity: 0;
    }
`.withBehaviors(neutralForegroundRestBehavior);
