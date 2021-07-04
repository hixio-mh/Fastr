import {
    ComponentStyles,
    ComponentStyleSheet,
    CSSRules,
} from "@microsoft/fast-jss-manager-react";
import {
    applyLocalizedProperty,
    Direction,
    ellipsis,
} from "@microsoft/fast-jss-utilities";
import { SelectDeviceClassNameContract } from "./select-device.class-name-contract";
import {
    DesignSystem,
    selectInputStyle,
    selectSpanStyle,
    withDesignSystemDefaults,
} from "../../style";

const styles: ComponentStyles<
    SelectDeviceClassNameContract,
    {}
> = (config: {}): ComponentStyleSheet<SelectDeviceClassNameContract, DesignSystem> => {
    const designSystem: DesignSystem = withDesignSystemDefaults(config);
    const direction: Direction = designSystem.direction;

    return {
        selectDevice: {
            display: "inline-block",
            verticalAlign: "text-bottom",
        },
        selectDevice_label: {
            lineHeight: "16px",
            fontSize: "14px",
            marginRight: "16px",
            ...ellipsis(),
        },
        selectDevice_contentRegion: {
            ...selectSpanStyle,
        },
        selectDevice_select: {
            ...selectInputStyle,
            paddingRight: "15px",
        },
    };
};

export default styles;
