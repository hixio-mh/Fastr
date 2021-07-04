import React from "react";
import { ComponentViewConfig } from "./data.props";
import {
    Button,
    ButtonAppearance,
    ButtonProps,
    buttonSchema,
} from "@microsoft/fast-components-react-msft";
import Guidance from "../../.tmp/button/guidance";
import API from "../api";

const buttonConfig: ComponentViewConfig<ButtonProps> = {
    api: API(React.lazy(() => import("../../.tmp/button/api"))),
    schema: buttonSchema,
    component: Button,
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Neutral",
            data: {
                children: "Button",
            },
        },
        {
            displayName: "Anchor",
            data: {
                href: "#",
                children: "Button",
            },
        },
        {
            displayName: "Disabled",
            data: {
                appearance: ButtonAppearance.primary,
                disabled: true,
                children: "Button",
            },
        },
    ],
};

export default buttonConfig;
