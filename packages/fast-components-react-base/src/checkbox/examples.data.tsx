import * as React from "react";
import Checkbox, { CheckboxHTMLTags, ICheckboxHandledProps,  ICheckboxManagedClasses, ICheckboxUnhandledProps  } from "./checkbox";
import schema from "./checkbox.schema.json";
import Documentation from "./.tmp/documentation";
import { IComponentFactoryExample } from "@microsoft/fast-development-site-react";

const classes: ICheckboxManagedClasses = {
    managedClasses: {
        checkbox: "checkbox",
        checkbox_input: "checkbox_input",
        checkbox_label: "checkbox_label",
        checkbox__disabled: "checkbox__disabled",
        checkbox_stateIndicator: "checkbox_stateIndicator"
    }
};

const examples: IComponentFactoryExample<ICheckboxHandledProps & ICheckboxManagedClasses> = {
    name: "Checkbox",
    component: Checkbox,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        ...classes,
        checked: true
    },
    data: [
        {
            ...classes
        },
        {
            ...classes,
            tag: "foobar" as any
        },
        {
            ...classes,
            tag: CheckboxHTMLTags.div
        },
        {
            ...classes,
            tag: CheckboxHTMLTags.label
        },
        {
            ...classes,
            checked: true
        },
        {
            ...classes,
            indeterminate: true
        },
        {
            ...classes,
            disabled: true
        }
    ]
};

export default examples;
