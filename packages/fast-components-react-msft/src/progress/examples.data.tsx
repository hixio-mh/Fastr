import React from "react";
import { ManagedClasses } from "@microsoft/fast-jss-manager-react";
import { Progress, ProgressProps, progressSchema } from "./index";
import Documentation from "./.tmp/documentation";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";

export default {
    name: "Progress",
    component: Progress,
    schema: progressSchema as any,
    documentation: <Documentation />,
    detailData: {
        children: "Progress",
        value: 50,
        minValue: 0,
        maxValue: 100,
    },
    data: [
        {
            minValue: 0,
            maxValue: 100,
            value: 50,
        },
        {},
    ],
} as ComponentFactoryExample<ProgressProps>;
