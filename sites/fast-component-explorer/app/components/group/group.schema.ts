export default {
    $schema: "http://json-schema.org/schema#",
    title: "HTML Element",
    description: "An arbitrary HTML element component's schema definition.",
    id: "react-html-element",
    type: "object",
    properties: {
        slot: {
            title: "Slot",
            type: "string",
        },
        tag: {
            title: "HTML Tag",
            type: "string",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            defaults: ["text"],
        },
    },
};
