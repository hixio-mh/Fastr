import { css } from "@microsoft/fast-element";
import { forcedColorsStylesheetBehavior } from "@microsoft/fast-foundation";
import { display } from "@microsoft/fast-foundation";
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
import { elevation } from "../styles/index";

export const ToolbarStyles = css`
    ${display("flex")}:host {
        --elevation: 10;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        background: ${neutralFillRestBehavior.var};
        ${elevation}
    }
    :host([orientation="vertical"]) {
        flex-direction: column;
    }
    :host([orientation="horizontal"]) {
        flex-direction: row;
    }
    ::slotted(*) {
        margin: calc((var(--design-unit) + var(--density)) * 1px);
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
    forcedColorsStylesheetBehavior(css``)
);
