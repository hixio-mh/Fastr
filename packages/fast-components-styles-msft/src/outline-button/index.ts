import { ButtonBaseClassNameContract as LightweightButtonClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { DesignSystem, ensureDesignSystemDefaults } from "../design-system";
import { baseButton, buttonStyles } from "../patterns/button";
import {
    neutralFocus,
    neutralForegroundRest,
    neutralOutlineActive,
    neutralOutlineHover,
    neutralOutlineRest,
} from "../utilities/color";
import { horizontalSpacing } from "../utilities/density";
import { outlineWidth } from "../utilities/design-system";
import { applyFocusVisible, format, toPx } from "@microsoft/fast-jss-utilities";

const styles: ComponentStyles<LightweightButtonClassNameContract, DesignSystem> = {
    ...baseButton,
    button: {
        ...buttonStyles(),
        color: neutralForegroundRest,
        fill: neutralForegroundRest,
        background: "transparent",
        border: format(
            "{0} solid {1}",
            toPx<DesignSystem>(outlineWidth),
            neutralOutlineRest
        ),
        padding: format("0 {0}", horizontalSpacing(outlineWidth)),
        "&:hover:enabled": {
            background: "transparent",
            border: format(
                "{0} solid {1}",
                toPx<DesignSystem>(outlineWidth),
                neutralOutlineHover
            ),
            "@media (-ms-high-contrast:active)": {
                background: "Highlight",
                color: "HighlightText",
            },
            "& $button_beforeContent, & $button_afterContent": {
                "@media (-ms-high-contrast:active)": {
                    fill: "HighlightText",
                },
            },
        },
        "&:active:enabled": {
            background: "transparent",
            border: format(
                "{0} solid {1}",
                toPx<DesignSystem>(outlineWidth),
                neutralOutlineActive
            ),
        },
        ...applyFocusVisible<DesignSystem>({
            boxShadow: ensureDesignSystemDefaults(
                (designSystem: DesignSystem): string => {
                    return `0 0 0 ${toPx(
                        designSystem.focusOutlineWidth - designSystem.outlineWidth
                    )} ${neutralFocus(designSystem)} inset`;
                }
            ),
            borderColor: neutralFocus,
        }),
        "& $button_beforeContent, & $button_afterContent": {
            "@media (-ms-high-contrast:active)": {
                fill: "ButtonText",
                "-ms-high-contrast-adjust": "none",
            },
        },
        "&$button__disabled": {
            "@media (-ms-high-contrast:active)": {
                opacity: "1",
                border: "1px solid graytext",
                backgroundColor: "transparent",
                color: "graytext",
            },
            "& $button_beforeContent, & $button_afterContent": {
                "@media (-ms-high-contrast:active)": {
                    fill: "graytext",
                },
            },
        },
        "@media (-ms-high-contrast:active)": {
            color: "ButtonText",
            "-ms-high-contrast-adjust": "none",
        },
    },
};

export default styles;
