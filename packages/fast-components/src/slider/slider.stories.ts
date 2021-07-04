import { FASTSlider } from ".";
import { FASTDesignSystemProvider } from "../design-system-provider";
import Examples from "./fixtures/base.html";
import { STORY_RENDERED } from "@storybook/core-events";
import addons from "@storybook/addons";

// Prevent tree-shaking
FASTSlider;
FASTDesignSystemProvider;

export default {
    title: "Slider",
};

export const Slider = () => Examples;
