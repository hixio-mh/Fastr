import { css } from "@microsoft/fast-element";
import { forcedColorsStylesheetBehavior } from "@microsoft/fast-foundation";
import {
    accentFillActiveBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    neutralFillHoverBehavior,
    neutralFillInputActiveBehavior,
    neutralFillInputHoverBehavior,
    neutralFillInputRestBehavior,
    neutralFillRestBehavior,
    neutralFocusBehavior,
    neutralForegroundRestBehavior,
    neutralOutlineRestBehavior,
} from "../styles/index";

export const PopoverStyles = css`
    :host {
        contain: layout;
        overflow: visible;
        height: 0;
        width: 0;
    }

    .popover {
        box-sizing: border-box;
        border-radius: calc(var(--corner-radius) * 1px);
        border: calc(var(--outline-width) * 1px) solid ${neutralFocusBehavior.var};
        box-shadow: 0 0 0 1px ${neutralFocusBehavior.var} inset;
        background: ${neutralFillRestBehavior.var};
        color: ${neutralForegroundRestBehavior.var};
        padding: 4px;
        height: fit-content;
        width: fit-content;
        font-family: var(--body-font);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        white-space: nowrap;
        // TODO: a mechanism to manage z-index across components
        // https://github.com/microsoft/fast/issues/3813
        z-index: 10000;
    }

    fast-anchored-region {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible;
    }

    :host([position="top"]) fast-anchored-region,
    :host([position="bottom"]) fast-anchored-region {
        flex-direction: row;
    }

    :host([position="right"]) fast-anchored-region,
    :host([position="left"]) fast-anchored-region {
        flex-direction: column;
    }

    :host([position="top"]) .popover {
        margin-bottom: 4px;
    }

    :host([position="bottom"]) .popover {
        margin-top: 4px;
    }

    :host([position="left"]) .popover {
        margin-right: 4px;
    }

    :host([position="right"]) .popover {
        margin-left: 4px;
    }
`.withBehaviors(
    accentFillActiveBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    neutralFillHoverBehavior,
    neutralFillInputActiveBehavior,
    neutralFillInputHoverBehavior,
    neutralFillInputRestBehavior,
    neutralFillRestBehavior,
    neutralFocusBehavior,
    neutralForegroundRestBehavior,
    neutralOutlineRestBehavior,
    forcedColorsStylesheetBehavior(
        css`
            :host([disabled]) {
                opacity: 1;
            }
        `
    )
);
