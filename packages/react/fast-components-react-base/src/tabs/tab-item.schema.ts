/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Tab item",
    description: "A tab item component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/tab-item",
    formPluginId: "@microsoft/fast-components-react-base/tab-item",
    properties: {
        id: {
            title: "Unique ID",
            type: "string",
        },
        slot: {
            title: "Slot",
            type: "string",
            default: "tab-item",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/tab-item/children",
            ids: ["tab", "tab-panel"],
        },
    },
    required: ["id", "slot"],
};
