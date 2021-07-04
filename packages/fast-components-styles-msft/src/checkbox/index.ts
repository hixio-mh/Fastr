import { DesignSystem, DesignSystemResolver } from "../design-system";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { CheckboxClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    add,
    applyFocusVisible,
    directionSwitch,
    divide,
    format,
    toPx,
} from "@microsoft/fast-jss-utilities";
import {
    neutralFillInputActive,
    neutralFillInputHover,
    neutralFillInputRest,
    neutralFocus,
    neutralForegroundRest,
    neutralOutlineActive,
    neutralOutlineHover,
    neutralOutlineRest,
} from "../utilities/color";
import { applyCornerRadius } from "../utilities/border";
import {
    densityCategorySwitch,
    heightNumber,
    horizontalSpacing,
} from "../utilities/density";
import { applyDisabledState } from "../utilities/disabled";
import { applyScaledTypeRamp } from "../utilities/typography";
import { designUnit, outlineWidth } from "../utilities/design-system";
import { applyCursorDisabled, applyCursorPointer } from "../utilities/cursor";
import { ColorRecipe } from "../utilities/color/common";
import {
    HighContrastColor,
    highContrastColorBackground,
    highContrastDisabledBorder,
    highContrastHighlightBackground,
    highContrastOptOutProperty,
    highContrastSelectedBackground,
    highContrastSelector,
    highContrastTextForeground,
} from "../utilities/high-contrast";

const inputSize: DesignSystemResolver<string> = toPx(
    add(divide(heightNumber(), 2), designUnit)
);
const indeterminateIndicatorMargin: DesignSystemResolver<string> = toPx(
    add(designUnit, densityCategorySwitch(0, 1, 2))
);
const indicatorSvg: (
    color: ColorRecipe<string> | string
) => DesignSystemResolver<string> = (
    color: ColorRecipe<string> | string
): DesignSystemResolver<string> => {
    return (designSystem: DesignSystem): string => {
        const colorEval: string = typeof color === "string" ? color : color(designSystem);
        return `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="${encodeURIComponent(
            colorEval
        )}" fill-rule="evenodd" clip-rule="evenodd" d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"/></svg>`;
    };
};
const styles: ComponentStyles<CheckboxClassNameContract, DesignSystem> = {
    checkbox: {
        position: "relative",
        display: "inline-flex",
        "flex-direction": "row",
        "align-items": "center",
        transition: "all 0.2s ease-in-out",
        "& $checkbox_label": {
            "padding-left": directionSwitch(horizontalSpacing(2), ""),
            "padding-right": directionSwitch("", horizontalSpacing(2)),
        },
        [highContrastSelector]: {
            ...highContrastOptOutProperty,
        },
    },
    checkbox_input: {
        position: "absolute",
        width: inputSize,
        height: inputSize,
        appearance: "none",
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        ...applyCornerRadius(),
        "box-sizing": "border-box",
        margin: "0",
        "z-index": "1",
        background: neutralFillInputRest,
        transition: "all 0.2s ease-in-out",
        border: format(
            "{0} solid {1}",
            toPx<DesignSystem>(outlineWidth),
            neutralOutlineRest
        ),
        "&:enabled": {
            ...applyCursorPointer(),
        },
        "&:hover:enabled": {
            background: neutralFillInputHover,
            "border-color": neutralOutlineHover,
            [highContrastSelector]: {
                background: HighContrastColor.background,
                "border-color": HighContrastColor.selectedBackground,
            },
        },
        "&:active:enabled": {
            background: neutralFillInputActive,
            "border-color": neutralOutlineActive,
        },
        ...applyFocusVisible({
            "box-shadow": format<DesignSystem>("0 0 0 1px {0} inset", neutralFocus),
            "border-color": neutralFocus,
            [highContrastSelector]: {
                "box-shadow": format<DesignSystem>(
                    "0 0 0 1px {0}",
                    () => HighContrastColor.buttonText
                ),
            },
        }),
        ...highContrastColorBackground,
    },
    checkbox_stateIndicator: {
        position: "relative",
        ...applyCornerRadius(),
        display: "inline-block",
        width: inputSize,
        height: inputSize,
        "flex-shrink": "0",
        "&::before": {
            content: "''",
            "pointer-events": "none",
            position: "absolute",
            "z-index": "1",
            top: "0",
            left: "0",
            width: inputSize,
            height: inputSize,
        },
    },
    checkbox_label: {
        ...applyCursorPointer(),
        color: neutralForegroundRest,
        ...applyScaledTypeRamp("t7"),
        ...highContrastTextForeground,
    },
    checkbox__checked: {
        "& $checkbox_stateIndicator": {
            "&::before": {
                background: format(
                    "url('data:image/svg+xml;utf8,{0}')",
                    indicatorSvg(neutralForegroundRest)
                ),
                [highContrastSelector]: {
                    background: format(
                        "url('data:image/svg+xml;utf8,{0}')",
                        indicatorSvg(HighContrastColor.selectedText)
                    ),
                },
            },
        },
        "&:hover": {
            "& $checkbox_stateIndicator": {
                "&::before": {
                    [highContrastSelector]: {
                        background: format(
                            "url('data:image/svg+xml;utf8,{0}')",
                            indicatorSvg(HighContrastColor.selectedBackground)
                        ),
                    },
                },
            },
        },
        "& $checkbox_input": {
            ...highContrastHighlightBackground,
            "&:hover": {
                ...highContrastSelectedBackground,
            },
        },
    },
    checkbox__indeterminate: {
        "& $checkbox_stateIndicator": {
            "&::before": {
                ...applyCornerRadius(),
                transform: "none",
                top: indeterminateIndicatorMargin,
                right: indeterminateIndicatorMargin,
                bottom: indeterminateIndicatorMargin,
                left: indeterminateIndicatorMargin,
                width: "auto",
                height: "auto",
                background: neutralForegroundRest,
                [highContrastSelector]: {
                    backgroundColor: HighContrastColor.selectedBackground,
                },
            },
        },
    },
    checkbox__disabled: {
        ...applyDisabledState(),
        "& $checkbox_input, & $checkbox_label": {
            ...applyCursorDisabled(),
            ...highContrastDisabledBorder,
        },
    },
};

export default styles;
