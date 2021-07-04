import * as React from "react";
import NumberField, {
    NumberFieldHandledProps,
    NumberFieldManagedClasses,
    NumberFieldProps,
    NumberFieldUnhandledProps,
} from "./number-field";
import schema from "./number-field.schema.json";
import Documentation from "./.tmp/documentation";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";

const classes: NumberFieldManagedClasses = {
    managedClasses: {
        numberField: "number-field",
    },
};

const examples: ComponentFactoryExample<NumberFieldProps> = {
    name: "Number field",
    component: NumberField,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        ...classes,
        name: "Number field",
        min: 0,
        max: 100,
        step: 10,
    },
    data: [
        {
            ...classes,
            step: 0.1,
        },
        {
            ...classes,
            min: 1,
        },
        {
            ...classes,
            max: 100,
        },
        {
            ...classes,
            value: 100,
        },
        {
            ...classes,
            disabled: true,
        },
        {
            ...classes,
            readOnly: true,
        },
        {
            ...classes,
            required: true,
        },
        {
            ...classes,
            placeholder: "Placeholder",
        },
        {
            ...classes,
            name: "Name",
        },
    ],
};

export default examples;
