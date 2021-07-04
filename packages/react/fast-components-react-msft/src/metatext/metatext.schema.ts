/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Metatext",
    description: "A metatext component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/metatext",
    formPluginId: "@microsoft/fast-components-react-msft/metatext",
    properties: {
        tag: {
            title: "HTML tag",
            type: "string",
            enum: ["p", "span"],
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/metatext/children",
            defaults: ["text"],
            examples: ["Lorem ipsum"],
        },
    },
    required: ["children"],
};
