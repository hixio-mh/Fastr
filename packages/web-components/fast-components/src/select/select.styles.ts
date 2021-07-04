import { css } from "@microsoft/fast-element";
import {
    disabledCursor,
    display,
    focusVisible,
    forcedColorsStylesheetBehavior,
} from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import { elevation } from "../styles/elevation";
import {
    accentFillActiveBehavior,
    accentFillFocusBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    accentForegroundCutRestBehavior,
    accentForegroundFocusBehavior,
    neutralFillInputActiveBehavior,
    neutralFillInputHoverBehavior,
    neutralFillInputRestBehavior,
    neutralFillStealthRestBehavior,
    neutralFocusBehavior,
    neutralFocusInnerAccentBehavior,
    neutralForegroundRestBehavior,
    neutralLayerFloatingBehavior,
    neutralOutlineRestBehavior,
} from "../styles/recipes";
import { heightNumber } from "../styles/size";

export const SelectStyles = css`
    ${display("inline-flex")} :host {
        --elevation: 14;
        background: ${neutralFillInputRestBehavior.var};
        border-radius: calc(var(--corner-radius) * 1px);
        border: calc(var(--outline-width) * 1px) solid ${accentFillRestBehavior.var};
        box-sizing: border-box;
        color: ${neutralForegroundRestBehavior.var};
        contain: contents;
        height: calc(${heightNumber} * 1px);
        position: relative;
        user-select: none;
        min-width: 250px;
        outline: none;
    }

    .listbox {
        ${elevation}
        background: ${neutralLayerFloatingBehavior.var};
        border: calc(var(--outline-width) * 1px) solid ${neutralOutlineRestBehavior.var};
        border-radius: calc(var(--corner-radius) * 1px);
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: column;
        left: 0;
        max-height: calc(var(--max-height) - (${heightNumber} * 1px));
        padding: calc(var(--design-unit) * 1px) 0;
        overflow-y: auto;
        position: absolute;
        width: 100%;
        z-index: 1;
    }

    .listbox[hidden] {
        display: none;
    }

    .control {
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        font-size: var(--type-ramp-base-font-size);
        font: inherit;
        line-height: var(--type-ramp-base-line-height);
        min-height: calc(${heightNumber} * 1px);
        padding: 0 calc(var(--design-unit) * 2.25px);
        width: 100%;
    }

    :host(:not([disabled]):hover) {
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${accentFillHoverBehavior.var};
    }

    :host(:${focusVisible}) {
        border-color: ${neutralFocusBehavior.var};
        box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) ${
            neutralFocusBehavior.var
        };
    }

    :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
        box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset ${
            neutralFocusInnerAccentBehavior.var
        };
        border-color: ${neutralFocusBehavior.var};
        background: ${accentFillHoverBehavior.var};
        color: ${accentForegroundCutRestBehavior.var};
    }

    :host([disabled]) {
        cursor: ${disabledCursor};
        opacity: var(--disabled-opacity);
    }

    :host([disabled]) .control {
        cursor: ${disabledCursor};
    }

    :host([disabled]:hover) {
        background: ${neutralFillStealthRestBehavior.var};
        color: ${neutralForegroundRestBehavior.var};
        fill: currentcolor;
    }

    :host(:not([disabled])) .control:active {
        background: ${neutralFillInputActiveBehavior.var};
        border-color: ${accentFillActiveBehavior.var};
    }

    :host([open][position="above"]) .listbox,
    :host([open][position="below"]) .control {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    :host([open][position="above"]) .control,
    :host([open][position="below"]) .listbox {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    :host([open][position="above"]) .listbox {
        border-bottom: 0;
        bottom: calc(${heightNumber} * 1px);
    }

    :host([open][position="below"]) .listbox {
        border-top: 0;
        top: calc(${heightNumber} * 1px);
    }

    .selected-value {
        font-family: var(--body-font);
        flex: 1 1 auto;
        text-align: start;
    }

    .indicator {
        flex: 0 0 auto;
        margin-inline-start: 1em;
    }

    slot[name="listbox"] {
        display: none;
        width: 100%;
    }

    :host([open]) slot[name="listbox"] {
        display: flex;
        position: absolute;
        ${elevation}
    }

    .end {
        margin-inline-start: auto;
    }

    .start,
    .end,
    .indicator,
    .select-indicator,
    ::slotted(svg) {
        ${`` /* Glyph size is temporary - replace when glyph-size var is added */}
        fill: currentcolor;
        height: 1em;
        min-height: calc(var(--design-unit) * 4px);
        min-width: calc(var(--design-unit) * 4px);
        width: 1em;
    }

    ::slotted([role="option"]),
    ::slotted(option) {
        flex: 0 0 auto;
    }

`.withBehaviors(
    accentFillActiveBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    accentForegroundCutRestBehavior,
    accentForegroundFocusBehavior,
    forcedColorsStylesheetBehavior(
        css`
            :host(:not([disabled]):hover),
            :host(:not([disabled]):active) {
                border-color: ${SystemColors.Highlight};
            }

            :host(:not([disabled]):${focusVisible}) {
                background-color: ${SystemColors.ButtonFace};
                box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) ${SystemColors.Highlight};
                color: ${SystemColors.ButtonText};
                fill: currentcolor;
                forced-color-adjust: none;
            }

            :host(:not([disabled]):${focusVisible}) .listbox {
                background: ${SystemColors.ButtonFace};
            }

            :host([disabled]) {
                border-color: ${SystemColors.GrayText};
                background-color: ${SystemColors.ButtonFace};
                color: ${SystemColors.GrayText};
                fill: currentcolor;
                opacity: 1;
                forced-color-adjust: none;
            }

            :host([disabled]:hover) {
                background: ${SystemColors.ButtonFace};
            }

            :host([disabled]) .control {
                color: ${SystemColors.GrayText};
                border-color: ${SystemColors.GrayText};
            }

            :host([disabled]) .control .select-indicator {
                fill: ${SystemColors.GrayText};
            }

            :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]),
            :host(:${focusVisible}) ::slotted(option[aria-selected="true"]),
            :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.ButtonText};
                box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset ${SystemColors.HighlightText};
                color: ${SystemColors.HighlightText};
                fill: currentcolor;
            }

            .start,
            .end,
            .indicator,
            .select-indicator,
            ::slotted(svg) {
                color: ${SystemColors.ButtonText};
                fill: currentcolor;
            }
        `
    ),
    neutralFillInputActiveBehavior,
    neutralFillInputHoverBehavior,
    neutralFillInputRestBehavior,
    neutralFocusBehavior,
    neutralFocusInnerAccentBehavior,
    neutralForegroundRestBehavior,
    neutralLayerFloatingBehavior,
    neutralOutlineRestBehavior
);
