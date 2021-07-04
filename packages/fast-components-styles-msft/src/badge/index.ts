import {
    ComponentStyles,
    ComponentStyleSheet,
    CSSRules,
} from "@microsoft/fast-jss-manager";
import { BadgeClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import {
    applyLocalizedProperty,
    Direction,
    ellipsis,
    localizeSpacing,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { DesignSystem, withDesignSystemDefaults } from "../design-system/index";
import { applyTypeRampConfig } from "../utilities/typography";
import { ensureNormalContrast } from "../utilities/colors";
import { fontWeight } from "../utilities/fonts";

function smallBadgeStyle(): CSSRules<DesignSystem> {
    return {
        ...applyTypeRampConfig("t8"),
        padding: localizeSpacing(Direction.ltr)(`2px ${toPx(8)} 0 0`),
        height: "17px",
        "&$badge__highlight, &$badge__lowlight, &$badge__accent": {
            padding: "1px 8px 2px",
        },
    };
}

function largeBadgeStyle(direction: Direction): CSSRules<DesignSystem> {
    return {
        [applyLocalizedProperty("paddingRight", "paddingLeft", direction)]: "12px",
        height: "20px",
        "&$badge__highlight, &$badge__lowlight, &$badge__accent": {
            padding: "3px 12px",
        },
    };
}

function backplateStyle(designSystem: DesignSystem): CSSRules<DesignSystem> {
    return {
        borderRadius: toPx(designSystem.cornerRadius),
        fontWeight: `${fontWeight.normal}`,
    };
}

const styles: ComponentStyles<BadgeClassNameContract, DesignSystem> = (
    config: DesignSystem
): ComponentStyleSheet<BadgeClassNameContract, DesignSystem> => {
    const designSystem: DesignSystem = withDesignSystemDefaults(config);
    const direction: Direction = designSystem.direction;
    const contrast: number = designSystem.contrast;
    // Badges do not switch color on theme change
    const foregroundColor: string = "#111";
    const backgroundColor: string = "#FFF";
    const lowlightBackground: string = "#333";
    const highlightBackground: string = "#FFD800";
    const accentBackground: string = designSystem.brandColor;
    const accentForegroundColor: string = ensureNormalContrast(
        contrast,
        backgroundColor,
        accentBackground
    );
    const hightlightForegroundColor: string = ensureNormalContrast(
        contrast,
        foregroundColor,
        highlightBackground
    );
    const lowlightForegroundColor: string = ensureNormalContrast(
        contrast,
        backgroundColor,
        lowlightBackground
    );

    return {
        badge: {
            ...applyTypeRampConfig("t7"),
            ...ellipsis(),
            overflow: "hidden",
            fontWeight: `${fontWeight.semibold}`,
            display: "inline-block",
            maxWidth: "215px",
            color: designSystem.foregroundColor,
        },
        badge__highlight: {
            ...backplateStyle(designSystem),
            backgroundColor: highlightBackground,
            color: hightlightForegroundColor,
        },
        badge__lowlight: {
            ...backplateStyle(designSystem),
            backgroundColor: lowlightBackground,
            color: lowlightForegroundColor,
        },
        badge__accent: {
            ...backplateStyle(designSystem),
            backgroundColor: accentBackground,
            color: accentForegroundColor,
        },
        badge__small: {
            ...smallBadgeStyle(),
        },
        badge__large: {
            ...largeBadgeStyle(direction),
        },
    };
};

export default styles;
