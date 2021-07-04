import { expect } from "chai";
import { customElement, DOM, html } from "@microsoft/fast-element";
import { fixture } from "../fixture";
import { ToolbarTemplate, Toolbar } from "./index";

@customElement({
    name: "fast-toolbar",
    template: ToolbarTemplate,
})
class FASTToolbar extends Toolbar {}

async function setup() {
    const { element, connect, disconnect } = await fixture(html<HTMLDivElement>`
        <fast-toolbar></fast-toolbar>
    `);
    return { element, connect, disconnect };
}

describe("Toolbar", () => {});
