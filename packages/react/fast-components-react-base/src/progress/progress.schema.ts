/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Progress",
    description: "A progress component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/progress",
    formPluginId: "@microsoft/fast-components-react-base/progress",
    properties: {
        value: {
            title: "HTML value attribute",
            type: "number",
        },
        minValue: {
            title: "HTML minValue attribute",
            type: "number",
        },
        maxValue: {
            title: "HTML maxValue attribute",
            type: "number",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/progress/children",
        },
    },
};
