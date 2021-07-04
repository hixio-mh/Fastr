/* eslint-disable */
const jss = require("jss").default;
const preset = require("jss-preset-default").default;
const path = require("path");
// import * as preset from "jss-preset-default";
import fs from "fs";
import {
    AccentButtonStyles,
    ActionToggleStyles,
    ActionTriggerStyles,
    AutoSuggestStyles,
    AutoSuggestOptionStyles,
    BadgeStyles,
    BreadcrumbStyles,
    ButtonStyles,
    CallToActionStyles,
    CaptionStyles,
    CardStyles,
    CarouselStyles,
    CheckboxStyles,
    ContextMenuStyles,
    ContextMenuItemStyles,
    DialogStyles,
    DividerStyles,
    FlipperStyles,
    FlyoutStyles,
    HeadingStyles,
    HypertextStyles,
    ImageStyles,
    LabelStyles,
    LightweightButtonStyles,
    MetatextStyles,
    NeutralButtonStyles,
    NumberFieldStyles,
    OutlineButtonStyles,
    ParagraphStyles,
    PivotStyles,
    ProgressStyles,
    RadioStyles,
    SelectStyles,
    SelectOptionStyles,
    SliderStyles,
    SliderLabelStyles,
    StealthButtonStyles,
    SubheadingStyles,
    TextActionStyles,
    TextAreaStyles,
    TextFieldStyles,
    ToggleStyles,
    TreeViewStyles,
    TreeViewItemStyles,
    TypographyStyles,
    DesignSystemDefaults,
} from "./src";

function generateClassName(rule, sheet) {
    return rule.key;
}

jss.setup(preset());

[
    ["accent-button", AccentButtonStyles],
    ["action-toggle", ActionToggleStyles],
    ["action-trigger", ActionTriggerStyles],
    ["auto-suggest", AutoSuggestStyles],
    ["auto-suggest-option", AutoSuggestOptionStyles],
    ["badge", BadgeStyles],
    ["breadcrumb", BreadcrumbStyles],
    ["button", ButtonStyles],
    ["call-to-action", CallToActionStyles],
    ["caption", CaptionStyles],
    ["card", CardStyles],
    ["carousel", CarouselStyles],
    ["checkbox", CheckboxStyles],
    ["context-menu", ContextMenuStyles],
    ["context-menu-item", ContextMenuItemStyles],
    ["dialog", DialogStyles],
    ["divider", DividerStyles],
    ["flipper", FlipperStyles],
    ["flyout", FlyoutStyles],
    ["heading", HeadingStyles],
    ["hypertext", HypertextStyles],
    ["image", ImageStyles],
    ["label", LabelStyles],
    ["lightweight-button", LightweightButtonStyles],
    ["metatext", MetatextStyles],
    ["neutral-button", NeutralButtonStyles],
    ["number-field", NumberFieldStyles],
    ["outline-button", OutlineButtonStyles],
    ["paragraph", ParagraphStyles],
    ["pivot", PivotStyles],
    ["progress", ProgressStyles],
    ["radio", RadioStyles],
    ["select", SelectStyles],
    ["select-option", SelectOptionStyles],
    ["slider", SliderStyles],
    ["slider-label", SliderLabelStyles],
    ["stealth-button", StealthButtonStyles],
    ["subheading", SubheadingStyles],
    ["text-action", TextActionStyles],
    ["text-area", TextAreaStyles],
    ["text-field", TextFieldStyles],
    ["toggle", ToggleStyles],
    ["tree-view", TreeViewStyles],
    ["tree-view-item", TreeViewItemStyles],
    ["typography", TypographyStyles],
].forEach(pair => {
    const style = jss.createStyleSheet(pair[1], { generateClassName });
    style.update(DesignSystemDefaults);
    const outDir = path.resolve(process.cwd(), "css");

    fs.mkdir(outDir, { recursive: true }, err => {
        if (err) throw err;

        fs.writeFileSync(path.resolve(outDir, `${pair[0]}.css`), style);
    });
});
