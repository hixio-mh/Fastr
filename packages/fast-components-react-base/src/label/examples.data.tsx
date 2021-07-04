import * as React from "react";
import Label, {
    ILabelHandledProps,
    ILabelManagedClasses,
    ILabelUnhandledProps,
    LabelTag
} from "./label";
import schema from "./label.schema.json";
import Documentation from "./.tmp/documentation";
import { IComponentFactoryExample } from "@microsoft/fast-development-site-react";

const examples: IComponentFactoryExample<ILabelHandledProps & ILabelManagedClasses> = {
    name: "Label",
    component: Label,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        managedClasses: {
            label: "label",
            label__hidden: "hidden_label"
        },
        tag: LabelTag.label,
        children: "Label"
    },
    data: [
        {
            managedClasses: {
                label: "label",
                label__hidden: "hidden_label"
            },
            tag: LabelTag.label,
            children: "Label"
        },
        {
            managedClasses: {
                label: "label",
                label__hidden: "hidden_label"
            },
            tag: LabelTag.legend,
            children: "Legend label"
        },
        {
            managedClasses: {
                label: "label",
                label__hidden: "hidden_label"
            },
            hidden: true,
            tag: LabelTag.label,
            children: "Hidden label for screen readers"
        }
    ]
};

export default examples;
