import React from "react";
import ReactDOM from "react-dom";
import Site, {
    componentFactory,
    formChildFromExamplesFactory,
    FormChildOption,
    SiteCategory,
    SiteCategoryIcon,
    SiteCategoryItem,
    SiteProps,
    SiteTitle,
    SiteTitleBrand,
} from "@microsoft/fast-development-site-react";
import * as examples from "./examples";
import reactHTMLElementExamples from "./components/examples.data";

import { Tab, TabItem, TabPanel } from "../src/index";
import { tabItemSchema, tabPanelSchema, tabSchema } from "../src";
import { Plugin, PluginProps } from "@microsoft/fast-tooling-react";
import ClassNamePlugin from "./utilities/class-name.plugin";

/**
 * Create the root node
 */
const root: HTMLElement = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

let formChildOptions: FormChildOption[] = [reactHTMLElementExamples].concat(
    formChildFromExamplesFactory(examples)
);

formChildOptions = formChildOptions.concat([
    {
        name: "Tab",
        component: Tab,
        schema: tabSchema,
    },
    {
        name: "TabItem",
        component: TabItem,
        schema: tabItemSchema,
    },
    {
        name: "TabPanel",
        component: TabPanel,
        schema: tabPanelSchema,
    },
]);

const formPlugins: Array<Plugin<PluginProps>> = [
    new ClassNamePlugin({
        id: ["@microsoft/fast-components-react-base/breadcrumb/separator"],
    }),
];

/* tslint:disable */
function render(): void {
    ReactDOM.render(
        <Site
            formChildOptions={formChildOptions}
            formPlugins={formPlugins}
            showTransparencyToggle={true}
            styleEditing={true}
        >
            <SiteTitle slot={"title"}>
                <SiteTitleBrand>FAST</SiteTitleBrand> base component documentation
            </SiteTitle>
            <SiteCategory slot={"category"} name={"Components"}>
                {componentFactory(examples)}
            </SiteCategory>
        </Site>,
        root
    );
}

render();
