import { accent, applyCleanListStyle, foreground300, neutralLayerL4 } from "../style";
import { ComponentStyles } from "@microsoft/fast-jss-manager-react";
import { FormClassNameContract } from "./form.props";

const styles: ComponentStyles<FormClassNameContract, {}> = {
    form: {
        background: neutralLayerL4,
        color: foreground300,
        height: "100%",
        padding: "0 0 0 10px",
    },
    form_breadcrumbs: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "4px",
        fontSize: "12px",
        lineHeight: "16px",
        paddingBottom: "12px",
        ...applyCleanListStyle(),
        "& li": {
            display: "inline-block",
            paddingRight: "8px",
            "&::after": {
                content: "'/'",
                paddingLeft: "8px",
            },
            "&:last-child::after": {
                content: "''",
                paddingLeft: "0",
            },
            "& a": {
                color: accent,
            },
        },
    },
};

export default styles;
