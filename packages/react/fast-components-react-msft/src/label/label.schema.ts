/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Label",
    description: "A label component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/label",
    formPluginId: "@microsoft/fast-components-react-msft/label",
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
            formPluginId: "@microsoft/fast-components-react-msft/label/children",
            defaults: ["text"],
            examples: ["Lorem ipsum"],
        },
    },
    required: ["label"],
};
