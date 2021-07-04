import {
    Slider,
    sliderLabelSchema,
    SliderProps,
    sliderSchema,
} from "@microsoft/fast-components-react-msft";
import Guidance from "../../.tmp/slider/guidance";
import { ComponentViewConfig } from "./data.props";

const sliderConfig: ComponentViewConfig<SliderProps> = {
    schema: sliderSchema,
    component: Slider,
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Basic",
            data: {},
        },
        {
            displayName: "Min and max",
            data: {
                range: {
                    minValue: 0,
                    maxValue: 100,
                },
            },
        },
        {
            displayName: "With indicators",
            data: {
                range: {
                    minValue: 0,
                    maxValue: 100,
                },
                children: [
                    {
                        id: sliderLabelSchema.id,
                        props: {
                            valuePositionBinding: 0,
                            label: "low",
                        },
                    },
                    {
                        id: sliderLabelSchema.id,
                        props: {
                            valuePositionBinding: 25,
                            label: "25",
                        },
                    },
                    {
                        id: sliderLabelSchema.id,
                        props: {
                            valuePositionBinding: 50,
                            label: "low",
                        },
                    },
                    {
                        id: sliderLabelSchema.id,
                        props: {
                            valuePositionBinding: 75,
                            label: "low",
                        },
                    },
                    {
                        id: sliderLabelSchema.id,
                        props: {
                            valuePositionBinding: 100,
                            label: "high",
                        },
                    },
                ],
            },
        },
    ],
};

export default sliderConfig;
