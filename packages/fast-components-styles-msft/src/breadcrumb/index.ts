import { DesignSystem } from "../design-system";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { directionSwitch } from "@microsoft/fast-jss-utilities";
import { neutralForegroundHint, neutralForegroundRest } from "../utilities/color";
import { BreadcrumbClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { applyCursorDefault } from "../utilities/cursor";
import { applyScaledTypeRamp } from "../utilities/typography";

const styles: ComponentStyles<BreadcrumbClassNameContract, DesignSystem> = {
    breadcrumb: {
        color: neutralForegroundRest,
        ...applyScaledTypeRamp("t7"),
        ...applyCursorDefault(),
    },
    breadcrumb_item: {
        display: "inline",
        outline: "none",
        textDecoration: "none",
        transition: "all 0.2s ease-in-out, border none",
        "&:link, &:visited": {
            borderBottom: "0px",
        },
    },
    breadcrumb_itemsContainer: {
        listStyle: "none",
        paddingLeft: directionSwitch("0", ""),
        paddingRight: directionSwitch("", "0"),
        margin: "0",
        display: "flex",
        flexWrap: "wrap",
    },
    breadcrumb_separator: {
        display: "inline-block",
        ...applyCursorDefault(),
        color: neutralForegroundHint,
        margin: "0 6px",
    },
};

export default styles;
