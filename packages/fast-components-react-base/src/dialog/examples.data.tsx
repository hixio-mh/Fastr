import React from "react";
import Dialog, {
    DialogHandledProps,
    DialogManagedClasses,
    DialogUnhandledProps,
} from "./dialog";
import schema from "./dialog.schema.json";
import Documentation from "./.tmp/documentation";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";

const examples: ComponentFactoryExample<DialogHandledProps> = {
    name: "Dialog",
    component: Dialog,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        modal: true,
        managedClasses: {
            dialog: "dialog",
            dialog_modalOverlay: "dialog-modal-overlay",
            dialog_contentRegion: "dialog-content-region",
        },
    },
    data: [
        {
            contentHeight: "300px",
            contentWidth: "500px",
            managedClasses: {
                dialog: "dialog",
                dialog_modalOverlay: "dialog-modal-overlay",
                dialog_contentRegion: "dialog-content-region",
            },
        },
        {
            contentHeight: "350px",
            contentWidth: "500px",
            modal: true,
            managedClasses: {
                dialog: "dialog",
                dialog_modalOverlay: "dialog-modal-overlay",
                dialog_contentRegion: "dialog-content-region",
            },
        },
    ],
};

export default examples;
