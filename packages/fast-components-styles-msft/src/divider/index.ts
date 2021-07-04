import { IDesignSystem } from "../design-system";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { IDividerClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { toPx } from "@microsoft/fast-jss-utilities";

const styles: ComponentStyles<IDividerClassNameContract, IDesignSystem> = {
    divider: {
        boxSizing: "content-box",
        height: toPx(0),
        marginTop: toPx(12),
        marginBottom: toPx(12),
        border: "none",
        borderTop: `${toPx(1)} solid rgba(0,0,0,0.2)`
    }
};

export default styles;
