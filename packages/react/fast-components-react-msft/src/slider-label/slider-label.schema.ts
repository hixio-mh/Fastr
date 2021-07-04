/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Slider label",
    description: "A slider label component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/slider-label",
    formPluginId: "@microsoft/fast-components-react-base/slider-label",
    properties: {
        valuePositionBinding: {
            title: "Value position binding",
            oneOf: [
                {
                    type: "number",
                },
                {
                    type: "string",
                    enum: [
                        "selectedRangeMin",
                        "selectedRangeMax",
                        "totalRangeMin",
                        "totalRangeMax",
                        "constrainedRangeMin",
                        "constrainedRangeMax",
                    ],
                },
            ],
        },
        showTickmark: {
            title: "Show tick mark",
            type: "boolean",
            default: true,
        },
        label: {
            title: "Label",
            type: "string",
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-base/listbox-item/children",
            defaults: ["text"],
        },
    },
};
