import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { HypertextClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { applyFocusVisible, format, toPx } from "@microsoft/fast-jss-utilities";
import {
    accentForegroundActiveCustomProperty,
    accentForegroundActiveDefinition,
    accentForegroundHoverCustomProperty,
    accentForegroundHoverDefinition,
    accentForegroundRestCustomProperty,
    accentForegroundRestDefinition,
    neutralFocusCustomProperty,
    neutralFocusDefinition,
    neutralForegroundRestCustomProperty,
    neutralForegroundRestDefinition,
} from "../../utilities/color";
import { DesignSystem } from "../../design-system";
import { focusOutlineWidth, outlineWidth } from "../../utilities/design-system";
import {
    HighContrastColor,
    highContrastLinkValue,
    highContrastOptOutProperty,
    highContrastSelector,
} from "../../utilities/high-contrast";

const styles: ComponentStyles<HypertextClassNameContract, DesignSystem> = {
    hypertext: {
        outline: "none",
        "text-decoration": "none",
        color: neutralForegroundRestCustomProperty,
        transition: "all 0.2s ease-in-out, border 0.03s ease-in-out",
        "&:link, &:visited": {
            "border-bottom": format<DesignSystem>(
                "{0} solid {1}",
                toPx(outlineWidth),
                accentForegroundRestCustomProperty
            ),
            color: accentForegroundRestCustomProperty,
            "&:hover": {
                "border-bottom-color": accentForegroundHoverCustomProperty,
                color: accentForegroundHoverCustomProperty,
                [highContrastSelector]: {
                    "border-bottom-color": highContrastLinkValue,
                    color: highContrastLinkValue,
                },
            },
            "&:active": {
                "border-bottom-color": accentForegroundActiveCustomProperty,
                color: accentForegroundActiveCustomProperty,
            },
            ...applyFocusVisible({
                "border-bottom": format<DesignSystem>(
                    "{0} solid {1}",
                    toPx(focusOutlineWidth),
                    neutralFocusCustomProperty
                ),
                [highContrastSelector]: {
                    "border-bottom-color": highContrastLinkValue,
                    color: highContrastLinkValue,
                },
            }),
            [highContrastSelector]: {
                color: highContrastLinkValue,
                "border-bottom-color": highContrastLinkValue,
            },
        },
        [highContrastSelector]: {
            ...highContrastOptOutProperty,
            color: HighContrastColor.text,
        },
    },
};

export default styles;
export const hypertextDependencies = [
    accentForegroundActiveDefinition,
    accentForegroundHoverDefinition,
    accentForegroundRestDefinition,
    neutralFocusDefinition,
    neutralForegroundRestDefinition,
];
