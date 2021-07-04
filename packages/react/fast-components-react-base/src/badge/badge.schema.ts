/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Badge",
    description: "A badge component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/badge",
    formPluginId: "@microsoft/fast-components-react-base/badge",
    properties: {},
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/badge/children",
            defaults: ["text"],
        },
    },
};
