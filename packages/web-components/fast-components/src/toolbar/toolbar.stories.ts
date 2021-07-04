import { STORY_RENDERED } from "@storybook/core-events";
import addons from "@storybook/addons";
import { FASTDesignSystemProvider } from "../design-system-provider";
import ToolbarTemplate from "./fixtures/base.html";
import { FASTToolbar } from "./";

// Prevent tree-shaking
FASTToolbar;
FASTDesignSystemProvider;

addons.getChannel().addListener(STORY_RENDERED, (name: string) => {
    if (name.toLowerCase().startsWith("toolbar")) {
    }
});

export default {
    title: "Toolbar",
};

export const base = () => ToolbarTemplate;
