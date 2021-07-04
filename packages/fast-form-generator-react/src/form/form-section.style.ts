import { background800 } from "./form.constants.style";
import {
    applyControl,
    applyControlWrapper,
    applyLabelStyle,
    applySelectInputStyles,
    applySelectSpanStyles,
} from "./form.utilities.style";
import { ComponentStyles, CSSRules } from "@microsoft/fast-jss-manager";
import { FormSectionClassNameContract } from "../class-name-contracts/";

const styles: ComponentStyles<FormSectionClassNameContract, {}> = {
    formSection: {
        display: "block",
        "& h3": {
            borderBottom: `1px solid ${background800}`,
            paddingBottom: "12px",
            marginBottom: "0",
        },
    },
    formSection_selectWrapper: {
        ...applyControl(),
        ...applyControlWrapper(),
    },
    formSection_selectSpan: {
        ...applySelectSpanStyles(),
    },
    formSection_selectInput: {
        ...applySelectInputStyles(),
    },
    formSection_selectLabel: {
        ...applyLabelStyle(),
    },
};

export default styles;
