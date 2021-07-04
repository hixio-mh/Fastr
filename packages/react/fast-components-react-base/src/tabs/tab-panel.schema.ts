/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Tab panel",
    description: "A tab panel component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/tab-panel",
    formPluginId: "@microsoft/fast-components-react-base/tab-panel",
    properties: {
        slot: {
            title: "Slot",
            type: "string",
            default: "tab-panel",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/tab-panel/children",
            defaults: ["text"],
        },
    },
    required: ["slot"],
};
