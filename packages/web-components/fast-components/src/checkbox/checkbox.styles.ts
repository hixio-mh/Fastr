import { css } from "@microsoft/fast-element";
import {
    disabledCursor,
    display,
    focusVisible,
    forcedColorsStylesheetBehavior,
} from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
    accentFillActiveBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    accentForegroundCutRestBehavior,
    heightNumber,
    neutralFillInputActiveBehavior,
    neutralFillInputHoverBehavior,
    neutralFillInputRestBehavior,
    neutralFocusBehavior,
    neutralFocusInnerAccentBehavior,
    neutralForegroundRestBehavior,
    neutralOutlineActiveBehavior,
    neutralOutlineHoverBehavior,
    neutralOutlineRestBehavior,
} from "../styles/index";

export const CheckboxStyles = css`
    ${display("inline-flex")} :host {
        align-items: center;
        outline: none;
        margin: calc(var(--design-unit) * 1px) 0;
        ${
            /*
             * Chromium likes to select label text or the default slot when
             * the checkbox is clicked. Maybe there is a better solution here?
             */ ""
        } user-select: none;
    }

    .control {
        position: relative;
        width: calc((${heightNumber} / 2 + var(--design-unit)) * 1px);
        height: calc((${heightNumber} / 2 + var(--design-unit)) * 1px);
        box-sizing: border-box;
        border-radius: calc(var(--corner-radius) * 1px);
        border: calc(var(--outline-width) * 1px) solid ${neutralOutlineRestBehavior.var};
        background: ${neutralFillInputRestBehavior.var};
        outline: none;
        cursor: pointer;
    }

    .label {
        font-family: var(--body-font);
        color: ${neutralForegroundRestBehavior.var};
        ${
            /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast/issues/2766 */ ""
        } padding-inline-start: calc(var(--design-unit) * 2px + 2px);
        margin-inline-end: calc(var(--design-unit) * 2px + 2px);
        cursor: pointer;
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .checked-indicator {
        width: 100%;
        height: 100%;
        display: block;
        fill: ${accentForegroundCutRestBehavior.var};
        opacity: 0;
        pointer-events: none;
    }

    .indeterminate-indicator {
        border-radius: calc(var(--corner-radius) * 1px);
        background: ${accentForegroundCutRestBehavior.var};
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
    }

    :host(:not([disabled])) .control:hover {
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${neutralOutlineHoverBehavior.var};
    }

    :host(:not([disabled])) .control:active {
        background: ${neutralFillInputActiveBehavior.var};
        border-color: ${neutralOutlineActiveBehavior.var};
    }

    :host(:${focusVisible}) .control {
        box-shadow: 0 0 0 2px var(--background-color), 0 0 0 4px ${
            neutralFocusBehavior.var
        };
        border-color: ${neutralFocusBehavior.var};
    }

    :host([aria-checked="true"]) .control {
        background: ${accentFillRestBehavior.var};
        border: calc(var(--outline-width) * 1px) solid ${accentFillRestBehavior.var};
    }

    :host([aria-checked="true"]:not([disabled])) .control:hover {
        background: ${accentFillHoverBehavior.var};
        border: calc(var(--outline-width) * 1px) solid ${accentFillHoverBehavior.var};
    }

    :host([aria-checked="true"]:not([disabled])) .control:active {
        background: ${accentFillActiveBehavior.var};
        border: calc(var(--outline-width) * 1px) solid ${accentFillActiveBehavior.var};
    }

    :host([aria-checked="true"]:${focusVisible}:not([disabled])) .control {
        box-shadow: 0 0 0 2px var(--background-color), 0 0 0 4px ${
            neutralFocusBehavior.var
        };
        border-color: transparent;
    }


    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${disabledCursor};
    }

    :host([aria-checked="true"]:not(.indeterminate)) .checked-indicator,
    :host(.indeterminate) .indeterminate-indicator {
        opacity: 1;
    }

    :host([disabled]) {
        opacity: var(--disabled-opacity);
    }
`.withBehaviors(
    accentFillActiveBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    accentForegroundCutRestBehavior,
    neutralFillInputActiveBehavior,
    neutralFillInputHoverBehavior,
    neutralFillInputRestBehavior,
    neutralFocusBehavior,
    neutralFocusInnerAccentBehavior,
    neutralForegroundRestBehavior,
    neutralOutlineActiveBehavior,
    neutralOutlineHoverBehavior,
    neutralOutlineRestBehavior,
    forcedColorsStylesheetBehavior(
        css`
            .control {
                forced-color-adjust: none;
                border-color: ${SystemColors.FieldText};
                background: ${SystemColors.Field};
            }
            .checked-indicator {
                fill: ${SystemColors.FieldText};
            }
            .indeterminate-indicator {
                background: ${SystemColors.FieldText};
            }
            :host(:not([disabled])) .control:hover, .control:active {
                border-color: ${SystemColors.Highlight};
                background: ${SystemColors.Field};
            }
            :host(:${focusVisible}) .control {
                border-color: ${SystemColors.Highlight};
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host([aria-checked="true"]:${focusVisible}:not([disabled])) .control {
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host([aria-checked="true"]) .control {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover, .control:active {
                border-color: ${SystemColors.Highlight};
                background: ${SystemColors.HighlightText};
            }
            :host([aria-checked="true"]) .checked-indicator {
                fill: ${SystemColors.HighlightText};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
                fill: ${SystemColors.Highlight}
            }
            :host([aria-checked="true"]) .indeterminate-indicator {
                background: ${SystemColors.HighlightText};
            }
            :host([aria-checked="true"]) .control:hover .indeterminate-indicator {
                background: ${SystemColors.Highlight}
            }
            :host([disabled]) {
                opacity: 1;
            }
            :host([disabled]) .control {
                forced-color-adjust: none;
                border-color: ${SystemColors.GrayText};
                background: ${SystemColors.Field};
            }
            :host([disabled]) .indeterminate-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .indeterminate-indicator {
                forced-color-adjust: none;
                background: ${SystemColors.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                forced-color-adjust: none;
                fill: ${SystemColors.GrayText};
            }
        `
    )
);
