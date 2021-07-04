import { IDesignSystem, withDesignSystemDefaults } from "../design-system";
import { ensureForegroundNormal, ensureNormalContrast } from "../utilities/colors";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { ILabelClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { toPx } from "@microsoft/fast-jss-utilities";
import { applyType } from "../utilities/typography";
import { applyScreenReader } from "@microsoft/fast-jss-utilities";
import { get } from "lodash-es";

const styles: ComponentStyles<ILabelClassNameContract, IDesignSystem> = {
    label: {
        ...applyType("t8", "vp3"),
        display: "inline-block",
        color: ensureForegroundNormal,
        padding: "0"
    },
    label__hidden: {
        ...applyScreenReader()
    }
};

export default styles;
