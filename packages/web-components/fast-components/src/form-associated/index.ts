import { attr, emptyArray, FASTElement } from "@microsoft/fast-element";
import { keyCodeEnter } from "@microsoft/fast-web-utilities";

/**
 * This file enables typing support for ElementInternals APIs.
 * It is largely taken from https://github.com/microsoft/TSJS-lib-generator/pull/818/files.
 *
 * When TypeScript adds support for these APIs we can delete this file.
 */

interface ValidityStateFlags {
    badInput?: boolean;
    customError?: boolean;
    patternMismatch?: boolean;
    rangeOverflow?: boolean;
    rangeUnderflow?: boolean;
    stepMismatch?: boolean;
    tooLong?: boolean;
    tooShort?: boolean;
    typeMismatch?: boolean;
    valueMissing?: boolean;
}

/**
 * Source:
 * https://html.spec.whatwg.org/multipage/custom-elements.html#elementinternals
 */
interface ElementInternals {
    /**
     * Returns the form owner of internals target element.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Returns a NodeList of all the label elements that internals target element is associated with.
     */
    readonly labels: NodeList;
    /**
     * Returns the error message that would be shown to the user if internals target element was to be checked for validity.
     */
    readonly validationMessage: string;
    /**
     * Returns the ValidityState object for internals target element.
     */
    readonly validity: ValidityState;
    /**
     * Returns true if internals target element will be validated when the form is submitted; false otherwise.
     */
    readonly willValidate: boolean;
    /**
     * Returns true if internals target element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.
     */
    checkValidity(): boolean;
    /**
     * Returns true if internals target element has no validity problems; otherwise,
     * returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user.
     */
    reportValidity(): boolean;
    /**
     * Sets both the state and submission value of internals target element to value.
     *
     * While "null" isn't enumerated as a argument type (here)[https://html.spec.whatwg.org/multipage/custom-elements.html#the-elementinternals-interface],
     * In practice it appears to remove the value from the form data on submission. Adding it as a valid type here
     * becuase that capability is required for checkbox and radio types
     */
    setFormValue(
        value: File | string | FormData | null,
        state?: File | string | FormData | null
    ): void;
    /**
     * Marks internals target element as suffering from the constraints indicated by the flags argument,
     * and sets the element's validation message to message.
     * If anchor is specified, the user agent might use
     * it to indicate problems with the constraints of internals target
     * element when the form owner is validated interactively or reportValidity() is called.
     */
    setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}

declare let ElementInternals: {
    prototype: ElementInternals;
    new (): ElementInternals;
};

interface HTMLElement {
    attachInternals?(): ElementInternals;
}

export const supportsElementInternals = "ElementInternals" in window;

/**
 * Disable member ordering to keep property callbacks
 * grouped with property declaration
 */
export abstract class FormAssociated<
    T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
> extends FASTElement {
    /**
     * Must evaluate to true to enable elementInternals.
     * Feature detects API support and resolve respectively
     */
    public static get formAssociated(): boolean {
        return supportsElementInternals;
    }

    /**
     * Returns the validty state of the element
     */
    public get validity(): ValidityState {
        return supportsElementInternals
            ? this.elementInternals.validity
            : this.proxy.validity;
    }

    /**
     * Retrieve a reference to the associated form.
     * Returns null if not associated to any form.
     */
    public get form(): HTMLFormElement | null {
        return supportsElementInternals ? this.elementInternals.form : this.proxy.form;
    }

    /**
     * Retrieve the localized validation message,
     * or custom validation message if set.
     */
    public get validationMessage(): string {
        return supportsElementInternals
            ? this.elementInternals.validationMessage
            : this.proxy.validationMessage;
    }

    /**
     * Whether the element will be validated when the
     * form is submitted
     */
    public get willValidate(): boolean {
        return supportsElementInternals
            ? this.elementInternals.willValidate
            : this.proxy.willValidate;
    }

    /**
     * A reference to all associated label elements
     */
    public get labels(): ReadonlyArray<Node> {
        if (supportsElementInternals) {
            return Object.freeze(Array.from(this.elementInternals.labels));
        } else if (
            this.proxy instanceof HTMLElement &&
            this.proxy.ownerDocument &&
            this.id
        ) {
            // Labels associated by wraping the element: <label><custom-element></custom-element></label>
            const parentLabels = this.proxy.labels;
            // Labels associated using the `for` attribute
            const forLabels = Array.from(
                (this.proxy.getRootNode() as HTMLDocument | ShadowRoot).querySelectorAll(
                    `[for='${this.id}']`
                )
            );

            const labels = parentLabels
                ? forLabels.concat(Array.from(parentLabels))
                : forLabels;

            return Object.freeze(labels);
        } else {
            return emptyArray;
        }
    }

    /**
     * The value of the element to be associated with the form
     */
    @attr
    public value: string = "";

    @attr({ mode: "boolean" })
    public disabled: boolean = false;
    protected disabledChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.disabled = this.disabled;
        }

        this.disabled
            ? this.classList.add("disabled")
            : this.classList.remove("disabled");
    }

    @attr
    public name: string;
    protected nameChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.name = this.name;
        }
    }

    /**
     * Require the field prior to form submission
     */
    @attr({ mode: "boolean" })
    public required: boolean = false;
    protected requiredChanged(): void {
        if (this.proxy instanceof HTMLElement) {
            this.proxy.required = this.required;
        }

        this.required
            ? this.classList.add("required")
            : this.classList.remove("required");
    }

    /**
     * The proxy element provided by
     */
    protected abstract proxy: T;

    /**
     * The element internals object. Will only exist
     * in browsers supporting the attachInternals API
     */
    protected elementInternals: ElementInternals;

    /**
     * These are events that are still fired by the proxy
     * element based on user / programmatic interaction.
     *
     * The proxy implementation should be transparent to
     * the app author, so block these events from emitting.
     */
    private proxyEventsToBlock = ["change", "click"];

    constructor() {
        super();

        if (supportsElementInternals) {
            this.elementInternals = (this as any).attachInternals();
        }
    }

    public connectedCallback(): void {
        super.connectedCallback();

        if (!supportsElementInternals) {
            this.proxy.style.display = "none";
            this.appendChild(this.proxy);

            this.proxyEventsToBlock.forEach(name =>
                this.proxy.addEventListener(name, this.stopPropagation)
            );

            // These are typically mapped to the proxy during
            // property change callbacks, but during initialization
            // on the intial call of the callback, the proxy is
            // still undefined. We should find a better way to address this.
            this.proxy.disabled = this.disabled;
            this.proxy.required = this.required;
            if (typeof this.name === "string") {
                this.proxy.name = this.name;
            }
            if (typeof this.value === "string") {
                this.proxy.value = this.value;
            }
        }
    }

    public disconnectedCallback(): void {
        this.proxyEventsToBlock.forEach(name =>
            this.proxy.removeEventListener(name, this.stopPropagation)
        );
    }

    /**
     * Return the current validity of the element
     */
    public checkValidity(): boolean {
        return supportsElementInternals
            ? this.elementInternals.checkValidity()
            : this.proxy.checkValidity();
    }

    /**
     * Return the current validity of the element.
     * If false, fires an invalid event at the element.
     */
    public reportValidity(): boolean {
        return supportsElementInternals
            ? this.elementInternals.reportValidity()
            : this.proxy.reportValidity();
    }

    /**
     * Set the validity of the control. In cases when the elementInternals object is not
     * available (and the proxy element is used to report validity), this function will
     * do nothing unless a message is provided, at which point the setCustomValidity method
     * of the proxy element will be invoked with the provided message.
     * @param flags Validity flags
     * @param message Optional message to supply
     * @param anchor Optional element used by UA to display an interactive validation UI
     */
    public setValidity(
        flags: ValidityStateFlags,
        message?: string,
        anchor?: HTMLElement
    ): void {
        if (supportsElementInternals) {
            this.elementInternals.setValidity(flags, message, anchor);
        } else if (typeof message === "string") {
            this.proxy.setCustomValidity(message);
        }
    }

    /**
     * Invoked when a connected component's form or fieldset has it's disabled
     * state changed.
     * @param disabled the disabled value of the form / fieldset
     */
    public formDisabledCallback(disabled: boolean): void {
        this.disabled = disabled;
    }

    /**
     *
     * @param value The value to set
     * @param state The state object provided to during session restores and when autofilling.
     */
    protected setFormValue(
        value: File | string | FormData | null,
        state?: File | string | FormData | null
    ): void {
        if (supportsElementInternals) {
            this.elementInternals.setFormValue(value, state);
        }
    }

    protected keypressHandler(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case keyCodeEnter:
                if (this.form instanceof HTMLFormElement) {
                    // Match native behavior
                    this.form.submit();
                }

                break;
        }
    }

    /**
     * Used to stop propagation of proxy element events
     * @param e Event object
     */
    private stopPropagation(e: Event): void {
        e.stopPropagation();
    }
}
