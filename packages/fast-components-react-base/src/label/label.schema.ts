export default {
    $schema: "http://json-schema.org/schema#",
    title: "Label",
    description: "A label component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/label",
    formPluginId: "@microsoft/fast-components-react-base/label",
    properties: {
        tag: {
            title: "HTML tag",
            type: "string",
            enum: ["label", "legend"],
            default: "label",
        },
        hidden: {
            title: "Hidden",
            type: "boolean",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/label/children",
            defaults: ["text"],
        },
    },
};
