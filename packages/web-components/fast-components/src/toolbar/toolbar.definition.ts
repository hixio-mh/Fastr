import { WebComponentDefinition } from "@microsoft/fast-tooling/dist/data-utilities/web-component";
import { DataType } from "@microsoft/fast-tooling";

export const fastToolbarDefinition: WebComponentDefinition = {
    version: 1,
    tags: [
        {
            name: "fast-toolbar",
            description: "The FAST toolbar element",
            attributes: [
                {
                    name: "orientation",
                    description: "The orientation attribute",
                    type: DataType.string,
                    default: "horizontal",
                    required: false,
                },
            ],
            slots: [
                {
                    name: "",
                    description: "The default slot",
                },
            ],
        },
    ],
};
