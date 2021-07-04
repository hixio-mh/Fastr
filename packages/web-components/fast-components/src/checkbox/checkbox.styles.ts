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
    neutralForegroundRestBehavior,
    neutralOutlineActiveBehavior,
    neutralOutlineHoverBehavior,
    neutralOutlineRestBehavior,
} from "../styles";

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
        border: calc(var(--outline-width) * 1px) solid var(--neutral-outline-rest);
        background: var(--neutral-fill-input-rest);
        outline: none;
        cursor: pointer;
    }

    .label {
        font-family: var(--body-font);
        color: var(--neutral-foreground-rest);
        ${
            /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast-dna/issues/2766 */ ""
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
        fill: var(--accent-foreground-cut-rest);
        opacity: 0;
        pointer-events: none;
    }

    .indeterminate-indicator {
        border-radius: calc(var(--corner-radius) * 1px);
        background: var(--accent-foreground-cut-rest);
        position: absolute;
        top: 25%;
        right: 25%;
        bottom: 25%;
        left: 25%;
        opacity: 0;
    }

    .control:hover {
        background: var(--neutral-fill-input-hover);
        border-color: var(--neutral-outline-hover);
    }

    .control:active {
        background: var(--neutral-fill-input-active);
        border-color: var(--neutral-outline-active);
    }

    :host(:${focusVisible}) .control {
        box-shadow: 0 0 0 1px var(--neutral-focus) inset;
        border-color: var(--neutral-focus);
    }

    :host(.checked) .control {
        background: var(--accent-fill-rest);
        border: calc(var(--outline-width) * 1px) solid var(--accent-fill-rest);
    }

    :host(.checked) .control:hover {
        background: var(--accent-fill-hover);
        border: calc(var(--outline-width) * 1px) solid var(--accent-fill-hover);
    }

    :host(.checked) .control:active {
        background: var(--accent-fill-active);
        border: calc(var(--outline-width) * 1px) solid var(--accent-fill-active);
    }

    :host(.checked:${focusVisible}) .control {
        box-shadow: 0 0 0 1px var(--neutral-focus) inset;
        border-color: var(--neutral-focus);
    }


    :host(.disabled) .label,
    :host(.readonly) .label,
    :host(.readonly) .control,
    :host(.disabled) .control {
        cursor: ${disabledCursor};
    }

    :host(.checked:not(.indeterminate)) .checked-indicator,
    :host(.indeterminate) .indeterminate-indicator {
        opacity: 1;
    }

    :host(.disabled) {
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
    neutralForegroundRestBehavior,
    neutralOutlineActiveBehavior,
    neutralOutlineHoverBehavior,
    neutralOutlineRestBehavior,
    forcedColorsStylesheetBehavior(
        css`
            .control, .control:hover, .control:active {
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
            :host(:${focusVisible}) .control {
                border-color: ${SystemColors.Highlight};
            }
            :host(.checked:${focusVisible}) .control {
                border-color: ${SystemColors.FieldText};
                box-shadow: 0 0 0 2px ${SystemColors.Field} inset;
            }
            :host(.checked) .control {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.Highlight};
            }
            :host(.checked) .control:hover, .control:active {
                background: ${SystemColors.HighlightText};
            }
            :host(.checked) .checked-indicator {
                fill: ${SystemColors.HighlightText};
            }
            :host(.checked) .control:hover .checked-indicator {
                fill: ${SystemColors.Highlight}
            }
            :host(.checked) .indeterminate-indicator {
                background: ${SystemColors.HighlightText};
            }
            :host(.checked) .control:hover .indeterminate-indicator {
                background: ${SystemColors.Highlight}
            }
            :host(.disabled) {
                opacity: 1;
            }
            :host(.disabled) .control {
                forced-color-adjust: none;
                border-color: ${SystemColors.GrayText};
                background: ${SystemColors.Field};
            }
            :host(.disabled) .indeterminate-indicator,
            :host(.checked.disabled) .control:hover .indeterminate-indicator {
                forced-color-adjust: none;
                background: ${SystemColors.GrayText};
            }
            :host(.disabled) .checked-indicator,
            :host(.checked.disabled) .control:hover .checked-indicator {
                forced-color-adjust: none;
                fill: ${SystemColors.GrayText};
            }
        `
    )
);
