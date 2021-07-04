import {
    ComponentStyles,
    ComponentStyleSheet,
    CSSRules,
} from "@microsoft/fast-jss-manager";
import {
    ButtonClassNameContract,
    CallToActionClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-msft";
import {
    applyFocusVisible,
    Direction,
    directionSwitch,
    format,
    multiply,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { DesignSystem, DesignSystemResolver } from "../design-system";
import {
    accentForegroundActive,
    accentForegroundCut,
    accentForegroundHover,
    accentForegroundRest,
    neutralForegroundRest,
} from "../utilities/color";
import { glyphSize } from "../utilities/density";
import { designUnit } from "../utilities/design-system";

function applyContentRegionTransform(): CSSRules<DesignSystem> {
    return {
        transform: format(
            "translateX({0})",
            toPx(multiply(designUnit, directionSwitch(-1, 1)))
        ),
    };
}

function applyGlyphTransform(): CSSRules<DesignSystem> {
    return {
        transform: directionSwitch(
            format("translateX({0})", toPx(designUnit)),
            format("rotate(180deg) translateX({})", toPx(designUnit))
        ),
        position: "relative",
    };
}

// Since MSFT button is already styled, we need to override in this way to alter button classes
export const callToActionButtonOverrides: ComponentStyles<
    Partial<ButtonClassNameContract>,
    DesignSystem
> = {
    button: {
        maxWidth: "100%",
        "&:hover": {
            "& $button_contentRegion": {
                ...applyContentRegionTransform(),
            },
        },
    },
    button_contentRegion: {
        transition: "all 600ms cubic-bezier(0.19, 1, 0.22, 1)",
    },
    button__justified: {
        "&:hover": {
            "& $button_contentRegion": {
                transform: "none",
            },
        },
    },
    button__disabled: {
        "&:hover": {
            "& $button_contentRegion": {
                transform: "none",
            },
        },
    },
};

const translateXValue: DesignSystemResolver<string> = toPx(designUnit);
const styles: ComponentStyles<CallToActionClassNameContract, DesignSystem> = {
    callToAction: {
        transition: "all 0.2s ease-in-out",
        display: "inline-flex",
        maxWidth: "100%",
        lineHeight: "1",
        textDecoration: "none",
        whiteSpace: "nowrap",
        "&:hover": {
            "& $callToAction_glyph": {
                ...applyGlyphTransform(),
            },
        },
        ...applyFocusVisible("& $callToAction_glyph", {
            ...applyGlyphTransform(),
        }),
    },
    callToAction_glyph: {
        fill: neutralForegroundRest,
        display: "inline-block",
        position: "relative",
        width: glyphSize,
        height: glyphSize,
        marginLeft: directionSwitch("6px", ""),
        marginRight: directionSwitch("", "6px"),
        transform: directionSwitch("none", "rotate(180deg)"),
        transition: "all 600ms cubic-bezier(0.19, 1, 0.22, 1)",
    },
    callToAction__primary: {
        "& $callToAction_glyph": {
            fill: accentForegroundCut,
        },
    },
    callToAction__lightweight: {
        "& $callToAction_glyph": {
            fill: accentForegroundRest,
        },
        "&:hover": {
            "& $callToAction_glyph": {
                fill: accentForegroundHover,
            },
        },
        "&:active": {
            "& $callToAction_glyph": {
                fill: accentForegroundActive,
            },
        },
    },
    callToAction__justified: {
        paddingRight: directionSwitch(translateXValue, ""),
        paddingLeft: directionSwitch("", translateXValue),
        "& $callToAction_glyph": {
            fill: accentForegroundRest,
        },
        "&:hover": {
            "& $callToAction_glyph": {
                fill: accentForegroundHover,
            },
        },
        "&:active": {
            "& $callToAction_glyph": {
                fill: accentForegroundActive,
            },
        },
    },
    callToAction__outline: {},
    callToAction__stealth: {},
    callToAction__disabled: {
        "&:hover": {
            "& $callToAction_glyph": {
                transform: "none",
            },
        },
    },
};

export default styles;
