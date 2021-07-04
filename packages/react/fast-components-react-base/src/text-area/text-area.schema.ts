export default {
    $schema: "http://json-schema.org/schema#",
    title: "Text area",
    description: "A text area component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/text-area",
    formPluginId: "@microsoft/fast-components-react-base/text-area",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
        placeholder: {
            title: "Placeholder",
            type: "string",
        },
    },
};
