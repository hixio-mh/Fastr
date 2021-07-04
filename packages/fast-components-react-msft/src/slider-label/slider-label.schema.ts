export default {
    $schema: "http://json-schema.org/schema#",
    title: "Slider label",
    description: "A slider label component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/slider-label",
    formPluginId: "@microsoft/fast-components-react-base/slider-label",
    properties: {
        maxValuePositionBinding: {
            title: "Upper value position binding",
            type: "string",
            enum: [
                "selectedRangeMin",
                "selectedRangeMax",
                "totalRangeMin",
                "totalRangeMax",
            ],
        },
        minValuePositionBinding: {
            title: "Lower value position binding",
            type: "string",
            enum: [
                "selectedRangeMin",
                "selectedRangeMax",
                "totalRangeMin",
                "totalRangeMax",
            ],
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
