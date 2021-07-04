import { DesignSystem, withDesignSystemDefaults } from "../design-system";
import { ensureForegroundNormal, ensureNormalContrast } from "../utilities/colors";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { LabelClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { toPx } from "@microsoft/fast-jss-utilities";
import { applyTypeRampConfig } from "../utilities/typography";
import { applyScreenReader } from "@microsoft/fast-jss-utilities";
import { get } from "lodash-es";

const styles: ComponentStyles<LabelClassNameContract, DesignSystem> = {
    label: {
        ...applyTypeRampConfig("t7"),
        display: "inline-block",
        color: ensureForegroundNormal,
        padding: "0",
    },
    label__hidden: {
        ...applyScreenReader(),
    },
};

export default styles;
