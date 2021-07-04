/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Card",
    description: "A card component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/card",
    formPluginId: "@microsoft/fast-components-react-msft/card",
    properties: {
        tag: {
            title: "HTML tag",
            type: "string",
            enum: ["article", "div", "section"],
            default: "div",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/card/children",
            defaults: ["text"],
        },
    },
};
