import React from "react";
import { ComponentViewConfig } from "./data.props";
import { Dialog, DialogProps, dialogSchema } from "@microsoft/fast-components-react-msft";
import Guidance from "../../.tmp/dialog/guidance";
import API from "../api";

const dialogConfig: ComponentViewConfig<DialogProps> = {
    api: API(React.lazy(() => import("../../.tmp/dialog/api"))),
    schema: dialogSchema,
    component: Dialog,
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Basic",
            data: {
                visible: true,
            },
        },
        {
            displayName: "Modal",
            data: {
                visible: true,
                modal: true,
            },
        },
    ],
};

export default dialogConfig;
