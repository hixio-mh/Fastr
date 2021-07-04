import { TextFieldClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { ComponentStyles, CSSRules } from "@microsoft/fast-jss-manager";
import {
    applyFocusVisible,
    directionSwitch,
    format,
    important,
    subtract,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { TextActionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { DesignSystem } from "../../design-system";
import { applyCornerRadius } from "../../utilities/border";
import {
    neutralFillActiveCustomProperty,
    neutralFillActiveDefinition,
    neutralFillHoverCustomProperty,
    neutralFillHoverDefinition,
    neutralFillInputActiveCustomProperty,
    neutralFillInputActiveDefinition,
    neutralFillInputHoverCustomProperty,
    neutralFillInputHoverDefinition,
    neutralFillInputRestCustomProperty,
    neutralFillInputRestDefinition,
    neutralFillRestCustomProperty,
    neutralFillRestDefinition,
    neutralFocusCustomProperty,
    neutralFocusDefinition,
    neutralForegroundRestCustomProperty,
    neutralForegroundRestDefinition,
    neutralOutlineActiveCustomProperty,
    neutralOutlineActiveDefinition,
    neutralOutlineHoverCustomProperty,
    neutralOutlineHoverDefinition,
    neutralOutlineRestCustomProperty,
    neutralOutlineRestDefinition,
} from "../../utilities/color";
import { glyphSize, height, horizontalSpacing } from "../../utilities/density";
import { focusOutlineWidth, outlineWidth } from "../../utilities/design-system";
import { applyDisabledState } from "../../utilities/disabled";
import {
    highContrastButtonBackground,
    HighContrastColor,
    highContrastDisabledBorder,
    highContrastDisabledForeground,
    highContrastForeground,
    highContrastOutline,
    highContrastSelected,
    highContrastSelector,
} from "../../utilities/high-contrast";

// Since MSFT text field is already styled, we need to override in this way to alter text field classes
export const textFieldOverrides: ComponentStyles<
    Partial<TextFieldClassNameContract>,
    DesignSystem
> = {
    textField: {
        height: "calc(100% - 4px)",
        margin: "2px 1px",
        border: "none",
        flex: "1 0 0px", // IE 11 does not accept "0" for flex-basis. Using "0px" for compatibility.
        background: "transparent",
        "min-width": "inherit",
        "&:hover, &:hover:enabled, &:disabled, &:active, &:active:enabled, &:focus, &:focus:enabled": {
            background: "none",
            border: "none",
            "box-shadow": "none",
            ...highContrastButtonBackground,
        },
        ...highContrastForeground,
    },
};

const glyphStyles: CSSRules<{}> = {
    width: glyphSize,
    height: glyphSize,
    margin: "auto",
    fill: neutralForegroundRestCustomProperty,
    ...highContrastForeground,
};

const styles: ComponentStyles<TextActionClassNameContract, DesignSystem> = {
    textAction: {
        "box-sizing": "border-box",
        position: "relative",
        height: height(),
        margin: "0",
        "min-width": "92px",
        border: format(
            "{0} solid {1}",
            toPx<DesignSystem>(outlineWidth),
            neutralOutlineRestCustomProperty
        ),
        background: neutralFillInputRestCustomProperty,
        ...applyCornerRadius(),
        display: "flex",
        "flex-direction": "row",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            background: neutralFillInputHoverCustomProperty,
            "border-color": neutralOutlineHoverCustomProperty,
            [highContrastSelector]: {
                background: "transparent",
                "border-color": HighContrastColor.selectedBackground,
            },
        },
        "&:active": {
            background: neutralFillInputActiveCustomProperty,
            "border-color": neutralOutlineActiveCustomProperty,
        },
        ...highContrastOutline,
    },
    textAction__filled: {
        background: neutralFillRestCustomProperty,
        border: format("{0} solid transparent", toPx<DesignSystem>(outlineWidth)),
        "&:hover": {
            background: neutralFillHoverCustomProperty,
            "border-color": "transparent",
            [highContrastSelector]: {
                background: HighContrastColor.buttonBackground,
                "border-color": HighContrastColor.selectedBackground,
            },
        },
        "&:active": {
            background: neutralFillActiveCustomProperty,
            "border-color": "transparent",
        },
        [highContrastSelector]: {
            background: HighContrastColor.buttonBackground,
            border: format(
                "{0} solid {1}",
                toPx<DesignSystem>(outlineWidth),
                () => HighContrastColor.buttonText
            ),
        },
    },
    textAction__outline: {},
    textAction__focus: {
        "&, &:hover": {
            "box-shadow": format(
                "0 0 0 {0} {1} inset",
                toPx<DesignSystem>(subtract(focusOutlineWidth, outlineWidth)),
                neutralFocusCustomProperty
            ),
            border: format(
                "{0} solid {1}",
                toPx<DesignSystem>(outlineWidth),
                neutralFocusCustomProperty
            ),
        },
        [highContrastSelector]: {
            "&, &:hover": {
                "box-shadow": format(
                    "0 0 0 {0} {1} inset",
                    toPx<DesignSystem>(subtract(focusOutlineWidth, outlineWidth)),
                    () => HighContrastColor.buttonText
                ),
                border: format(
                    "{0} solid {1}",
                    toPx<DesignSystem>(outlineWidth),
                    () => HighContrastColor.buttonText
                ),
            },
        },
    },
    textAction__disabled: {
        ...applyDisabledState(),
        ...highContrastDisabledBorder,
        "&:hover": {
            background: neutralFillInputRestCustomProperty,
            "border-color": neutralOutlineRestCustomProperty,
        },
        "&:active": {
            background: neutralFillInputRestCustomProperty,
            "border-color": neutralOutlineRestCustomProperty,
        },
        "& $textAction_beforeGlyph, & $textAction_afterGlyph": {
            ...highContrastDisabledForeground,
        },
    },
    textAction_button: {
        "border-color": "transparent",
        color: neutralForegroundRestCustomProperty,
        fill: neutralForegroundRestCustomProperty,
        height: format("calc({0} - 6px)", height()),
        "min-width": "fit-content",
        margin: "2px",
        padding: `0 5px`,
        left: directionSwitch("0", ""),
        right: directionSwitch("", "0"),
        top: "0",
        transition: "color .1s, background-color .1s, border-color 0.2s ease-in-out",
        flex: "0 0 auto",
        cursor: "pointer",
        [highContrastSelector]: {
            background: HighContrastColor.buttonBackground,
            fill: HighContrastColor.buttonText,
        },
        "&:hover": {
            ...highContrastSelected,
        },
        "&:active": {
            ...highContrastSelected,
        },
        "&:disabled": {},
        ...applyFocusVisible<DesignSystem>({
            [highContrastSelector]: {
                background: HighContrastColor.selectedBackground,
                fill: HighContrastColor.selectedText,
                "border-color": important(HighContrastColor.buttonText),
                "box-shadow": format(
                    "0 0 0 {0} inset {1}",
                    toPx(focusOutlineWidth),
                    () => HighContrastColor.buttonBackground
                ),
            },
        }),
    },
    textAction_beforeGlyph: {
        ...glyphStyles,
        "margin-left": directionSwitch(horizontalSpacing(1), ""),
        "margin-right": directionSwitch("", horizontalSpacing(1)),
    },
    textAction_afterGlyph: {
        ...glyphStyles,
        "margin-left": directionSwitch("", horizontalSpacing(1)),
        "margin-right": directionSwitch(horizontalSpacing(1), ""),
    },
};

export default styles;
export const textActionDependencies = [
    neutralFillActiveDefinition,
    neutralFillHoverDefinition,
    neutralFillInputActiveDefinition,
    neutralFillInputHoverDefinition,
    neutralFillInputRestDefinition,
    neutralFillRestDefinition,
    neutralFocusDefinition,
    neutralForegroundRestDefinition,
    neutralOutlineActiveDefinition,
    neutralOutlineHoverDefinition,
    neutralOutlineRestDefinition,
];
