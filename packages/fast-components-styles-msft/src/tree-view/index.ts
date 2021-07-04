import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { TreeViewClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { DesignSystem } from "../design-system";
import { applyFocusVisible } from "@microsoft/fast-jss-utilities";

const styles: ComponentStyles<TreeViewClassNameContract, DesignSystem> = {
    treeView: {
        display: "flex",
        "flex-direction": "column",
        "align-items": "stretch",
        "min-width": "fit-content",
        "font-size": "0",
        ...applyFocusVisible({}),
    },
};

export default styles;
