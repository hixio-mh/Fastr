export default {
    $schema: "http://json-schema.org/schema#",
    title: "Divider",
    description: "A divider component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/divider",
    formPluginId: "@microsoft/fast-components-react-base/divider",
    properties: {
        role: {
            title: "HTML role attribute",
            type: "string",
            enum: ["presentation", "separator"],
        },
    },
};
