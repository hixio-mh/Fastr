import React from "react";
import Checkbox, {
    CheckboxHandledProps,
    CheckboxManagedClasses,
    CheckboxUnhandledProps,
} from "./checkbox";
import { checkboxSchema } from "../index";
import Documentation from "./.tmp/documentation";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";

const classes: CheckboxManagedClasses = {
    managedClasses: {
        checkbox: "checkbox",
        checkbox_input: "checkbox_input",
        checkbox_label: "checkbox_label",
        checkbox__disabled: "checkbox__disabled",
        checkbox_stateIndicator: "checkbox_stateIndicator",
    },
};

const examples: ComponentFactoryExample<CheckboxHandledProps> = {
    name: "Checkbox",
    component: Checkbox,
    schema: checkboxSchema,
    documentation: <Documentation />,
    detailData: {
        ...classes,
        checked: true,
        inputId: "checkbox",
    },
    data: [
        {
            ...classes,
            inputId: "checkbox1",
        },
        {
            ...classes,
            checked: true,
            inputId: "checkbox2",
            name: "checkbox-name",
        },
        {
            ...classes,
            indeterminate: true,
            inputId: "checkbox3",
        },
        {
            ...classes,
            disabled: true,
            inputId: "checkbox4",
        },
    ],
};

export default examples;
