import * as React from "react";
import { IComponentFactoryExample } from "@microsoft/fast-development-site-react";
import { Label } from "./index";
import { ILabelHandledProps, LabelTag } from "@microsoft/fast-components-react-base";
import schema from "@microsoft/fast-components-react-base/dist/label/label.schema.json";
import Documentation from "./.tmp/documentation";

export default {
    name: "Label",
    component: Label,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        tag: LabelTag.label,
        children: "Label"
    },
    data: [
        {
            tag: LabelTag.label,
            children: "Label",
            "data-sketch-symbol": "Label"
        },
        {
            tag: LabelTag.legend,
            children: "Legend label"
        },
        {
            hidden: true,
            tag: LabelTag.label,
            children: "Hidden label"
        }
    ]
} as IComponentFactoryExample<ILabelHandledProps>;
