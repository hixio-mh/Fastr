import React from "react";
import { ComponentViewConfig } from "./data.props";
import {
    NumberField,
    NumberFieldProps,
    numberFieldSchema,
} from "@microsoft/fast-components-react-msft";
import Guidance from "../../.tmp/number-field/guidance";
import API from "../api";

const numberFieldConfig: ComponentViewConfig<NumberFieldProps> = {
    api: API(React.lazy(() => import("../../.tmp/number-field/api"))),
    schema: numberFieldSchema,
    component: NumberField,
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Basic",
            data: {
                name: "numberField",
            },
        },
        {
            displayName: "Min, max and step",
            data: {
                min: 0,
                max: 100,
                step: 10,
                name: "numberField",
            },
        },
        {
            displayName: "Disabled",
            data: {
                disabled: true,
                name: "numberField",
            },
        },
    ],
};

export default numberFieldConfig;
