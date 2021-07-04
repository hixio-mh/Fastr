import { attr } from "@microsoft/fast-element";
import { FormAssociated } from "../form-associated/index";
import { StartEnd } from "../patterns/start-end";
import { applyMixins } from "../utilities/apply-mixins";

/**
 * An Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @public
 */
export class Button extends FormAssociated<HTMLInputElement> {
    /**
     * Determines if the element should receive document focus on page load.
     *
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    @attr({ mode: "boolean" })
    public autofocus: boolean;

    /**
     * The id of a form to associate the element to.
     *
     * @public
     * @remarks
     * HTML Attribute: form
     */
    @attr({ attribute: "form" })
    public formId: string;

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formaction
     */
    @attr
    public formaction: string;
    private formactionChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.formAction = this.formaction;
        }
    }

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formenctype
     */
    @attr
    public formenctype: string;
    private formenctypeChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.formEnctype = this.formenctype;
        }
    }

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formmethod
     */
    @attr
    public formmethod: string;
    private formmethodChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.formMethod = this.formmethod;
        }
    }

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formnovalidate
     */
    @attr({ mode: "boolean" })
    public formnovalidate: boolean;
    private formnovalidateChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.formNoValidate = this.formnovalidate;
        }
    }

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formtarget
     */
    @attr
    public formtarget: "_self" | "_blank" | "_parent" | "_top";
    private formtargetChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.formTarget = this.formtarget;
        }
    }

    /**
     * The name of the button
     *
     * @public
     * @remarks
     * HTML Attribute: name
     */
    @attr
    public name: string;

    /**
     * The button type.
     *
     * @public
     * @remarks
     * HTML Attribute: type
     */
    @attr
    public type: "submit" | "reset" | "button";
    private typeChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.type = this.type;
        }
    }

    /**
     * The value of the button.
     *
     * @public
     */
    public value: string;
    private valueChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.value = this.value;
        }
    }

    protected proxy: HTMLInputElement = document.createElement("input");

    /**
     * @internal
     */
    public connectedCallback(): void {
        super.connectedCallback();

        this.proxy.setAttribute("type", `${this.type}`);

        this.setFormValue(this.value, this.value);
    }
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line */
export interface Button extends StartEnd {}
applyMixins(Button, StartEnd);
