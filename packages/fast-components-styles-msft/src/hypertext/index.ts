import { DesignSystem, withDesignSystemDefaults } from "../design-system";
import {
    accentForegroundActive,
    accentForegroundHover,
    accentForegroundRest,
    neutralFocus,
    neutralForegroundRest,
} from "../utilities/color";
import {
    ComponentStyles,
    ComponentStyleSheet,
    CSSRules,
} from "@microsoft/fast-jss-manager";
import { HypertextClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { applyFocusVisible } from "@microsoft/fast-jss-utilities";
import { format } from "../utilities/format";

const styles: ComponentStyles<HypertextClassNameContract, DesignSystem> = {
    hypertext: {
        outline: "none",
        textDecoration: "none",
        color: neutralForegroundRest,
        transition: "all 0.2s ease-in-out, border 0.03s ease-in-out",
        "&:link, &:visited": {
            borderBottom: format("1px solid {0}", accentForegroundRest),
            color: accentForegroundRest,
            "&:hover": {
                borderBottom: format("2px solid {0}", accentForegroundHover),
                color: accentForegroundHover,
            },
            "&:active": {
                borderBottom: format("2px solid {0}", accentForegroundActive),
                color: accentForegroundActive,
            },
            ...applyFocusVisible({
                borderBottom: format("2px solid {0}", neutralFocus),
            }),
        },
    },
};

export default styles;
