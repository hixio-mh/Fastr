import * as React from "react";
import { IComponentFactoryExample } from "@microsoft/fast-development-site-react";
import { Toggle } from "./index";
import { IToggleHandledProps, IToggleUnhandledProps } from "@microsoft/fast-components-react-base";
import schema from "@microsoft/fast-components-react-base/dist/toggle/toggle.schema.json";
import Documentation from "./.tmp/documentation";

export default {
    name: "Toggle",
    component: Toggle,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        children: "Toggle label default on",
        id: "toggle01",
        labelId: "label01",
        selectedString: "On",
        statusLabelId: "span01",
        unselectedString: "Off"
    },
    data: [
        {
            children: "Toggle label default on",
            disabled: false,
            id: "toggle01",
            labelId: "label01",
            selected: true,
            selectedString: "On",
            statusLabelId: "span01",
            unselectedString: "Off",
            "data-sketch-symbol": "Toggle (on)"
        },
        {
            children: "Toggle label default off",
            disabled: false,
            id: "toggle02",
            labelId: "label02",
            selected: false,
            selectedString: "On",
            statusLabelId: "span02",
            unselectedString: "Off",
            "data-sketch-symbol": "Toggle (off)"
        },
        {
            children: "Toggle label disabled on",
            disabled: true,
            id: "toggle03",
            labelId: "label03",
            selected: true,
            selectedString: "On",
            statusLabelId: "span03",
            unselectedString: "Off",
            "data-sketch-symbol": "Toggle disabled (on)"
        },
        {
            children: "Toggle label disabled off",
            disabled: true,
            id: "toggle04",
            labelId: "label04",
            selected: false,
            selectedString: "On",
            statusLabelId: "span04",
            unselectedString: "Off",
            "data-sketch-symbol": "Toggle disabled (off)"
        }
    ]
} as IComponentFactoryExample<IToggleHandledProps>;
