import { expect } from "chai";
import { TabPanel, TabPanelTemplate as template } from "./index";
import { fixture } from "../test-utilities/fixture";
import { customElement } from "@microsoft/fast-element";

@customElement({
    name: "fast-tab-panel",
    template,
})
class FASTTabPanel extends TabPanel {}

async function setup() {
    const { element, connect, disconnect } = await fixture<FASTTabPanel>(
        "fast-tab-panel"
    );

    return { element, connect, disconnect };
}

describe("TabPanel", () => {
    it("should have a role of `tabpanel`", async () => {
        const { element, connect, disconnect } = await setup();

        await connect();

        expect(element.getAttribute("role")).to.equal("tabpanel");

        await disconnect();
    });

    it("should have a slot attribute of `tabpanel`", async () => {
        const { element, connect, disconnect } = await setup();

        await connect();

        expect(element.getAttribute("slot")).to.equal("tabpanel");

        await disconnect();
    });
});
