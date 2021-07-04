export default {
    $schema: "http://json-schema.org/schema#",
    title: "Pivot Item Content",
    description: "A pivot item content component's schema definition.",
    id: "pivot-item-content",
    type: "object",
    properties: {},
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            defaults: ["text"],
        },
    },
};
