export default {
    $schema: "http://json-schema.org/schema#",
    title: "Horizontal overflow",
    description: "A horizontal overflow component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/horizontal-overflow",
    formPluginId: "@microsoft/fast-components-react-base/horizontal-overflow",
    properties: {
        scrollDuration: {
            title: "Scroll duration",
            type: "number",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-base/horizontal-overflow/children",
            defaults: ["text"],
        },
    },
};
