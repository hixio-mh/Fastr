import React from "react";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import { NumberField, NumberFieldProps, numberFieldSchema } from "./index";
import Documentation from "./.tmp/documentation";

export default {
    name: "Number field",
    component: NumberField,
    schema: numberFieldSchema as any,
    documentation: <Documentation />,
    detailData: {
        name: "Number field",
        step: 10,
        min: 0,
        max: 100,
    },
    data: [
        {
            step: 0.1,
        },
        {
            min: 1,
        },
        {
            max: 100,
        },
        {
            value: 100,
        },
        {
            disabled: true,
        },
        {
            readOnly: true,
        },
        {
            required: true,
        },
        {
            placeholder: "Placeholder",
        },
        {
            name: "Name",
        } as any,
    ],
} as ComponentFactoryExample<NumberFieldProps>;
