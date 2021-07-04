/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Hypertext",
    description: "A hypertext component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/hypertext",
    formPluginId: "@microsoft/fast-components-react-msft/hypertext",
    properties: {
        href: {
            title: "HTML href attribute",
            type: "string",
            examples: ["#", "http://microsoft.com"],
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/hypertext/children",
            defaults: ["text"],
            examples: ["Lorem ipsum"],
        },
    },
    required: ["children"],
};
