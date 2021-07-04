import React from "react";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import { Divider, DividerProps, DividerRoles, dividerSchema } from "./index";
import Documentation from "./.tmp/documentation";

export default {
    name: "Divider",
    component: Divider,
    schema: dividerSchema as any,
    documentation: <Documentation />,
    detailData: {
        role: void 0,
    },
    data: [
        {
            role: void 0,
            "data-sketch-symbol": "Divider",
        },
        {
            role: DividerRoles.presentation,
        },
        {
            role: DividerRoles.separator,
        },
    ],
} as ComponentFactoryExample<DividerProps>;
