import { attr, DOM, Observable, observable } from "@microsoft/fast-element";
import uniqueId from "lodash-es/uniqueId";
import { ListboxOption } from "../listbox-option/listbox-option";
import { ARIAGlobalStatesAndProperties } from "../patterns/aria-global";
import { StartEnd } from "../patterns/start-end";
import { applyMixins } from "../utilities/apply-mixins";
import { SelectPosition, SelectRole } from "../select/select.options";
import { FormAssociatedCombobox } from "./combobox.form-associated";
import { AnchoredRegion } from "../anchored-region";

const escapeRegex = /[.*+\-?^${}()|[\]\\]/g;

/**
 * A Select Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#select | ARIA select }.
 *
 * @public
 */
export class Combobox extends FormAssociatedCombobox {
    /**
     * The open attribute.
     *
     * @internal
     */
    @attr({ attribute: "open", mode: "boolean" })
    public open: boolean = false;

    @attr({ attribute: "autocomplete", mode: "fromView" })
    autocomplete: "inline" | "list" | "both" | "none" | undefined;

    protected openChanged(oldValue: boolean, newValue: boolean) {
        if (this.$fastController.isConnected && oldValue !== newValue) {
            this.ariaExpanded = this.open ? "true" : "false";
            if (this.open) {
                DOM.queueUpdate(() => {
                    this.setRegionProps();
                });
                this.indexWhenOpened = this.selectedIndex;
            } else {
                this.region.classList.toggle("loaded", false);
            }
        }
    }

    private autocompleteOptions: ListboxOption[];

    private indexWhenOpened: number;

    public listboxId: string = uniqueId("listbox-");

    /**
     * The internal value property.
     *
     * @internal
     */
    private _value: string;

    /**
     * The value property.
     *
     * @public
     */
    public get value() {
        Observable.track(this, "value");
        return this._value;
    }

    public set value(next: string) {
        const prev = `${this._value}`;

        if (this.$fastController.isConnected && this.options) {
            const selectedIndex = this.options.findIndex(el => el.value === next);

            const prevSelectedOption = this.options[this.selectedIndex];
            const nextSelectedOption = this.options[selectedIndex];

            const prevSelectedValue = prevSelectedOption
                ? prevSelectedOption.value
                : null;

            const nextSelectedValue = nextSelectedOption
                ? nextSelectedOption.value
                : null;

            if (selectedIndex === -1 || prevSelectedValue !== nextSelectedValue) {
                next = "";
                this.selectedIndex = selectedIndex;
            }

            if (this.firstSelectedOption) {
                next = this.firstSelectedOption.value;
            }
        }

        if (prev !== next) {
            this._value = next;
            super.valueChanged(prev, next);
            Observable.notify(this, "value");
        }
    }

    public valueInput: HTMLInputElement;

    private updateValue(shouldEmit?: boolean) {
        if (this.$fastController.isConnected) {
            this.value = this.firstSelectedOption ? this.firstSelectedOption.value : "";
            this.valueInput.value = this.firstSelectedOption
                ? this.firstSelectedOption.textContent || this.firstSelectedOption.value
                : this.value;
        }

        if (shouldEmit) {
            this.$emit("change");
        }
    }

    /**
     * Updates the proxy value when the selected index changes.
     *
     * @param prev - the previous selected index
     * @param next - the next selected index
     *
     * @internal
     */
    public selectedIndexChanged(prev, next): void {
        super.selectedIndexChanged(prev, next);
        this.updateValue();
    }

    /**
     * Reflects the placement for the listbox when the select is open.
     *
     * @public
     */
    @attr({ attribute: "position" })
    public positionAttribute: SelectPosition;

    /**
     * Indicates the initial state of the position attribute.
     *
     * @internal
     */
    private forcedPosition: boolean = false;

    /**
     * The role of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: role
     */
    public role: SelectRole = SelectRole.combobox;

    /**
     * Holds the current state for the calculated position of the listbox.
     *
     * @public
     */
    @observable
    public position: SelectPosition = SelectPosition.below;

    /**
     * Calculate and apply listbox positioning based on available viewport space.
     *
     * @param force - direction to force the listbox to display
     * @public
     */
    public setPositioning(): void {}

    /**
     * The max height for the listbox when opened.
     *
     * @internal
     */
    @observable
    public maxHeight: number = 0;

    /**
     * The value displayed on the button.
     *
     * @public
     */
    @observable
    public displayValue: string = "";

    /**
     * The timer that controls the time between position updates
     */
    private updateTimer: number | null = null;

    /**
     *
     *
     * @internal
     */
    @observable
    public region: AnchoredRegion;

    /**
     * Synchronize the `aria-disabled` property when the `disabled` property changes.
     *
     * @param prev - The previous disabled value
     * @param next - The next disabled value
     *
     * @internal
     */
    public disabledChanged(prev: boolean, next: boolean): void {
        if (super.disabledChanged) {
            super.disabledChanged(prev, next);
        }
        this.ariaDisabled = this.disabled ? "true" : "false";
    }

    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    public formResetCallback = (): void => {
        this.setProxyOptions();
        this.setDefaultSelectedOption();
        this.value = this.firstSelectedOption.value;
    };

    /**
     * Handle opening and closing the listbox when the select is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    public clickHandler(e: MouseEvent): boolean | void {
        // const composedPath = e.composedPath();

        // if (composedPath.includes(this.valueInput)) {
        //     console.log(composedPath);
        // }

        // do nothing if the select is disabled
        if (this.disabled) {
            return;
        }

        if (this.open) {
            const captured = (e.target as HTMLElement).closest(
                `option,[role=option]`
            ) as ListboxOption;

            if (captured && captured.disabled) {
                return;
            }
        }

        super.clickHandler(e);

        this.open = !this.open;

        if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
            this.updateValue(true);
        }

        return true;
    }

    /**
     * Handle focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    public focusoutHandler(e: FocusEvent): boolean | void {
        if (!this.open) {
            return true;
        }

        const focusTarget = e.relatedTarget as HTMLElement;
        if (this.isSameNode(focusTarget)) {
            this.focus();
            return;
        }

        if (!this.options || !this.options.includes(focusTarget as ListboxOption)) {
            this.open = false;
        }
    }

    /**
     * Synchronize the form-associated proxy and update the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    public slottedOptionsChanged(prev, next): void {
        super.slottedOptionsChanged(prev, next);
        this.setProxyOptions();
        this.updateValue();
    }

    /**
     * Reset and fill the proxy to match the component's options.
     *
     * @internal
     */
    private setProxyOptions(): void {
        if (this.proxy instanceof HTMLSelectElement && this.options) {
            this.proxy.options.length = 0;
            this.options.forEach(option => {
                const proxyOption =
                    option.proxy ||
                    (option instanceof HTMLOptionElement ? option.cloneNode() : null);

                if (proxyOption) {
                    this.proxy.appendChild(proxyOption);
                }
            });
        }
    }

    /**
     * Handle keyboard interaction for the select.
     *
     * @param e - the keyboard event
     * @internal
     */
    public keydownHandler(e: KeyboardEvent): boolean | void {
        super.keydownHandler(e);
        const key = e.key || e.key.charCodeAt(0);

        switch (key) {
            case " ": {
                if (this.typeAheadExpired) {
                    e.preventDefault();
                    this.open = !this.open;
                }
                break;
            }

            case "Enter": {
                e.preventDefault();
                this.open = !this.open;
                break;
            }

            case "Escape": {
                if (this.open) {
                    e.preventDefault();
                    this.open = false;
                }
                break;
            }

            case "Tab": {
                if (!this.open) {
                    return true;
                }

                e.preventDefault();
                this.open = false;
            }
        }

        if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
            this.updateValue(true);
        }

        return true;
    }

    public handleRegionLoaded = (e: Event): void => {
        // TODO: make updating configurable
        if (!this.open || this.updateTimer !== null) {
            return;
        }
        this.focusAndScrollOptionIntoView();
        this.updateTimer = window.setTimeout((): void => {
            this.startUpdateTimer();
        }, 100);
    };

    public handleTypeAhead = () => void 0;

    public typeaheadBufferChanged(prev: string = "", next: string): void {
        if (next.length <= prev.length) {
            return;
        }

        const pattern = this.typeaheadBuffer.replace(escapeRegex, "\\$&");
        const re = new RegExp(`^${pattern}`, "gi");

        const filteredOptions = this.options.filter((o: ListboxOption) =>
            o.text.trim().match(re)
        );
        if (filteredOptions.length) {
            const selectedIndex = this.options.findIndex(o =>
                o.isSameNode(filteredOptions[0])
            );
            if (selectedIndex > -1) {
                this.selectedIndex = selectedIndex;
            }
        }

        this.typeAheadExpired = false;

        this.valueInput.value = this.firstSelectedOption.text;

        this.valueInput.focus();

        this.valueInput.setSelectionRange(
            this.typeaheadBuffer.length,
            this.firstSelectedOption.text.length,
            "backward"
        );
    }

    public handleTextInput(e: InputEvent): void {
        if (this.typeaheadTimeout) {
            window.clearTimeout(this.typeaheadTimeout);
        }

        this.typeaheadTimeout = window.setTimeout(
            () => (this.typeAheadExpired = true),
            Combobox.TYPE_AHEAD_TIMEOUT_MS
        );

        this.typeaheadBuffer = this.valueInput.value;
    }

    public connectedCallback() {
        super.connectedCallback();
        this.forcedPosition = !!this.positionAttribute;
    }

    private setRegionProps = (): void => {
        if (!this.open) {
            return;
        }
        if (this.region === null || this.region === undefined) {
            // TODO: limit this
            DOM.queueUpdate(this.setRegionProps);
            return;
        }
        this.region.viewportElement = document.body;
        this.region.anchorElement = this;
    };

    /**
     * starts the update timer if not currently running
     */
    private startUpdateTimer = (): void => {
        DOM.queueUpdate(() => {
            this.region.classList.toggle("loaded", true);
        });

        this.updateTimer = window.setTimeout((): void => {
            this.updateTimerTick();
        }, 50);
    };

    private updateTimerTick = (): void => {
        this.clearUpdateTimer();
        if (this.open) {
            if (this.region !== undefined) {
                this.region.update();
            }
            this.updateTimer = window.setTimeout((): void => {
                this.updateTimerTick();
            }, 50);
        }
    };

    /**
     * clears the update timer
     */
    private clearUpdateTimer = (): void => {
        if (this.updateTimer !== null) {
            clearTimeout(this.updateTimer);
            this.updateTimer = null;
        }
    };
}

/**
 * Includes ARIA states and properties relating to the ARIA select role.
 *
 * @public
 */
export class DelegatesARIACombobox {
    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-expanded
     */
    @observable
    public ariaExpanded: "true" | "false" | undefined;

    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-pressed
     */
    @attr({ attribute: "aria-pressed", mode: "fromView" })
    public ariaPressed: "true" | "false" | "mixed" | undefined;

    /**
     * See {@link https://w3c.github.io/aria/#aria-autocomplete} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-autocomplete
     */
    @attr({ attribute: "aria-autocomplete", mode: "fromView" })
    public ariaAutocomplete: "inline" | "list" | "both" | "none" | undefined;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface DelegatesARIACombobox extends ARIAGlobalStatesAndProperties {}
applyMixins(DelegatesARIACombobox, ARIAGlobalStatesAndProperties);

/**
 * @internal
 */
export interface Combobox extends StartEnd, DelegatesARIACombobox {}
applyMixins(Combobox, StartEnd, DelegatesARIACombobox);
