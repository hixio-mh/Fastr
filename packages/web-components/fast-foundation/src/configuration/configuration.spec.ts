import { css, FASTElement, FASTElementDefinition, html } from "@microsoft/fast-element";
import { expect } from "chai";
import { over } from "lodash-es";
import { ConfigurationImpl } from "./index";

describe("ConfigurationImpl", () => {
    it("Should initialize with a default prefix of 'fast'", () => {
        expect(new ConfigurationImpl().prefix).to.equal("fast");
    });

    it("Should initialize with a provided prefix", () => {
        expect(new ConfigurationImpl({ prefix: "custom" }).prefix).to.equal("custom");
    });

    it("should allow registry and retrieval of a default template by element name", () => {
        const conf = new ConfigurationImpl();
        const template = html``;

        conf.setDefaultTemplateFor("my-element", template);

        expect(conf.getDefaultTemplateFor("my-element")).to.equal(template);
    });

    it("should allow registry and retrieval of a default style by element name", () => {
        const conf = new ConfigurationImpl();
        const styles = css``;

        conf.setDefaultStylesFor("my-element", styles);

        expect(conf.getDefaultStylesFor("my-element")).to.equal(styles);
    });

    it("should allow registration of custom elements with registerElement()", () => {
        class MyEl extends FASTElement {}

        new ConfigurationImpl().registerElement(MyEl, { name: "my-element" });

        expect(customElements.get("my-element")).to.equal(MyEl);
    });

    describe(".forComponent", () => {
        it("should register an element, default template, and default styles for a Configuration", () => {
            const conf = new ConfigurationImpl();
            const styles = css``;
            const template = html``;
            const baseName = "element";
            class MyElement extends FASTElement {}

            const myElement = ConfigurationImpl.forComponent({
                styles,
                template,
                baseName,
                type: MyElement,
            });

            conf.register(myElement());

            expect(conf.getDefaultStylesFor("element")).to.equal(styles);
            expect(conf.getDefaultTemplateFor("element")).to.equal(template);
            expect(customElements.get(`${conf.prefix}-${baseName}`)).to.equal(MyElement);
        });

        it("should provider opportunity to override template, styles, prefix, and baseName of a registry for a configuration", () => {
            const conf = new ConfigurationImpl();
            class MyElement extends FASTElement {}

            const myElement = ConfigurationImpl.forComponent({
                styles: css``,
                template: html``,
                baseName: "foo",
                type: MyElement,
            });

            const overrides = {
                prefix: "my",
                baseName: "custom-element",
                styles: css``,
                template: html``,
            };

            conf.register(myElement(overrides));

            expect(conf.getDefaultStylesFor("foo")).to.equal(null);
            expect(conf.getDefaultTemplateFor("foo")).to.equal(null);
            expect(customElements.get(`foo`)).to.equal(undefined);

            expect(conf.getDefaultStylesFor(overrides.baseName)).to.equal(
                overrides.styles
            );
            expect(conf.getDefaultTemplateFor(overrides.baseName)).to.equal(
                overrides.template
            );
            expect(
                customElements.get(`${overrides.prefix}-${overrides.baseName}`)
            ).to.equal(MyElement);
        });
    });
});
