import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-components";

export const CardSectionStyles = css`
    :host {
        --text-font: Arial, Roboto, sans-serif;
        --flow: column;
        --max-width: 1240px;
    }

    @media screen and (max-width: 1000px) {
        :host {
            --flow: row;
            --max-width: 80vw;
        }
    }

    ${display("grid")} :host {
        grid-template-rows: repeat(4, min-content);
        grid-auto-flow: var(--flow);
        grid-column-gap: 20px;
        max-width: var(--max-width);
    }

    :host(:hover) ::slotted(x-card) {
        filter: blur(1px);
    }

    :host ::slotted(x-card:hover) {
        filter: blur(0);
    }
`;
