import React from "react";
import Toggle, {
    ToggleHandledProps,
    ToggleManagedClasses,
    ToggleUnhandledProps,
} from "./toggle";
import { toggleSchema } from "../index";
import Documentation from "./.tmp/documentation";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";

const examples: ComponentFactoryExample<ToggleHandledProps> = {
    name: "Toggle",
    component: Toggle,
    schema: toggleSchema as any,
    documentation: <Documentation />,
    detailData: {
        managedClasses: {
            toggle: "toggle",
            toggle_label: "toggle_label",
            toggle_toggleButton: "toggle_toggleButton",
            toggle_input: "toggle_input",
            toggle_stateIndicator: "toggle_stateIndicator",
        },
        children: "Toggle",
        inputId: "toggle01",
        labelId: "label01",
        selectedMessage: "On",
        statusMessageId: "span01",
        unselectedMessage: "Off",
    },
    data: [
        {
            managedClasses: {
                toggle: "toggle",
                toggle_label: "toggle_label",
                toggle_toggleButton: "toggle_toggleButton",
                toggle_input: "toggle_input",
                toggle_stateIndicator: "toggle_stateIndicator",
            },
            children: "Toggle label",
            disabled: false,
            inputId: "toggle01",
            labelId: "label01",
            selected: true,
            selectedMessage: "On",
            statusMessageId: "span01",
            unselectedMessage: "Off",
        },
    ],
};

export default examples;
