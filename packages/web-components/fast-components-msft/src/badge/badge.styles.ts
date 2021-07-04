import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import {
    accentFillRestBehavior,
    accentForegroundCutRestBehavior,
    neutralFillRestBehavior,
    neutralForegroundRestBehavior,
} from "../styles";

export const BadgeStyles = css`
    ${display("inline-block")} :host {
        box-sizing: border-box;
        font-family: var(--body-font);
        font-size: var(--type-ramp-minus-1-font-size);
        line-height: var(--type-ramp-minus-1-height);
    }

    .badge {
        border-radius: calc(var(--corner-radius) * 1px);
        padding: calc(var(--design-unit) * 0.5px) calc(var(--design-unit) * 1px);
    }

    :host(.lightweight) {
        background: transparent;
        color: ${neutralForegroundRestBehavior.var};
        font-weight: 600;
    }

    :host(.accent) {
        background: ${accentFillRestBehavior.var};
        color: ${accentForegroundCutRestBehavior.var};
    }

    :host(.neutral) {
        background: ${neutralFillRestBehavior.var};
        color: ${neutralForegroundRestBehavior.var};
    }
`.withBehaviors(
    accentFillRestBehavior,
    accentForegroundCutRestBehavior,
    neutralFillRestBehavior,
    neutralForegroundRestBehavior
);
