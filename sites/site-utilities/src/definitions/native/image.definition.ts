import { WebComponentDefinition } from "@microsoft/fast-tooling/dist/data-utilities/web-component";
import { DataType } from "@microsoft/fast-tooling";

export const imageId = "img";
export const imageDefinition: WebComponentDefinition = {
    version: 1,
    tags: [
        {
            name: imageId,
            description: "The image element",
            attributes: [
                {
                    name: "src",
                    description: "The source image location",
                    default: "",
                    type: DataType.string,
                    required: false,
                },
            ],
            slots: [],
        },
    ],
};
