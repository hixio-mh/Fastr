/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Flipper",
    description: "A flipper component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/flipper",
    formPluginId: "@microsoft/fast-components-react-msft/flipper",
    properties: {
        direction: {
            title: "Direction",
            type: "string",
            enum: ["next", "previous"],
            default: "next",
        },
        visibleToAssistiveTechnologies: {
            title: "Visible to screen readers",
            type: "boolean",
        },
        label: {
            title: "HTML aria-label attribute",
            type: "string",
            examples: ["See previous"],
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/flipper/children",
            defaults: ["text"],
        },
    },
};
