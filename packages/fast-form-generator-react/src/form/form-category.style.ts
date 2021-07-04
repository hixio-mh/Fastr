import { background200, background800, foreground300 } from "./form.constants.style";
import { ComponentStyles, CSSRules } from "@microsoft/fast-jss-manager";
import { FormCategoryClassNameContract } from "../class-name-contracts/";

const styles: ComponentStyles<FormCategoryClassNameContract, {}> = {
    formCategory_button: {
        minHeight: "30px",
        boxSizing: "border-box",
        outline: "0",
        fontWeight: "600",
        color: foreground300,
        textTransform: "uppercase",
        border: "none",
        background: background200,
        borderTop: `1px solid ${background800}`,
        borderBottom: `1px solid ${background800}`,
        position: "relative",
        width: "calc(100% + 10px)",
        fontFamily: "inherit",
        fontSize: "12px",
        padding: "0 0 0 10px",
        marginLeft: "-10px",
        textAlign: "left",
        "&:hover": {
            cursor: "pointer",
        },
        '&[aria-expanded="true"]': {
            "&::before": {
                transform: "rotate(-45deg)",
            },
            "&::after": {
                transform: "rotate(45deg)",
            },
        },
        "&::before": {
            position: "absolute",
            content: "''",
            pointerEvents: "none",
            width: "1px",
            height: "6px",
            right: "10px",
            top: "12px",
            transform: "rotate(45deg)",
            background: foreground300,
        },
        "&::after": {
            position: "absolute",
            content: "''",
            pointerEvents: "none",
            width: "1px",
            height: "6px",
            right: "14px",
            top: "12px",
            transform: "rotate(-45deg)",
            background: foreground300,
        },
    },
    formCategory_header: {
        display: "flex",
        alignItems: "center",
        textTransform: "uppercase",
        minHeight: "30px",
        margin: "0",
        fontWeight: "600",
        boxSizing: "border-box",
        fontSize: "12px",
        padding: "0 0 0 10px",
        marginLeft: "-10px",
        background: background200,
        borderTop: `1px solid ${background800}`,
        borderBottom: `1px solid ${background800}`,
        "& h3": {
            margin: "0",
        },
    },
    formCategory__collapsed: {
        display: "none",
    },
};

export default styles;
