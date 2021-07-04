import { composedParent } from "./composed-parent.js";
import chai from "chai";
const { expect } = chai;

describe("The composedParent function", () => {
    it("returns the parent of an an element, if it has one", () => {
        const parent = document.createElement("div");
        const child = document.createElement("div");
        parent.appendChild(child);

        const found = composedParent(child);

        expect(found).to.equal(parent);
    });
});
