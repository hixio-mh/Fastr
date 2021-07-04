/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Caption",
    description: "A caption component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/caption",
    formPluginId: "@microsoft/fast-components-react-msft/caption",
    properties: {
        tag: {
            title: "HTML tag",
            type: "string",
            enum: ["p", "span", "caption", "figcaption"],
            default: "p",
        },
        size: {
            title: "Size",
            type: "number",
            enum: [1, 2],
            default: 1,
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/caption/children",
            defaults: ["text"],
            examples: ["Lorem ipsum dolor sit amet."],
        },
    },
    required: ["children"],
};
