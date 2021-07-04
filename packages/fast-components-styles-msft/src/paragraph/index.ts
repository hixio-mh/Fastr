import { DesignSystem } from "../design-system";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { ParagraphClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { applyFontWeightNormal } from "../utilities/fonts";
import { applyCursorDefault } from "../utilities/cursor";

const styles: ComponentStyles<ParagraphClassNameContract, DesignSystem> = {
    paragraph: {
        ...applyCursorDefault(),
        ...applyFontWeightNormal(),
    },
    paragraph__1: {},
    paragraph__2: {},
    paragraph__3: {},
};

export default styles;
