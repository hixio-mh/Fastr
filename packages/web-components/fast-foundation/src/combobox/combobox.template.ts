import { html, ref, slotted, when } from "@microsoft/fast-element";
import { Listbox } from "../listbox/listbox";
import { endTemplate, startTemplate } from "../patterns/start-end";
import { Combobox } from "./combobox";

/**
 * The template for the {@link @microsoft/fast-foundation#(Select:class)} component.
 * @public
 */
export const ComboboxTemplate = html<Combobox>`
    <template
        autocomplete="${x => x.autocomplete}"
        class="${x => (x.open ? "open" : "")} ${x =>
            x.disabled ? "disabled" : ""} ${x => x.position}"
        role="${x => x.role}"
        tabindex="${x => (!x.disabled ? "0" : null)}"
        aria-disabled="${x => x.ariaDisabled}"
        aria-autocomplete="${x => x.autocomplete}"
        @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
        @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
        @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
        <div
            aria-activedescendant="${x => (x.open ? x.ariaActiveDescendant : null)}"
            aria-controls="${x => x.listboxId}"
            aria-expanded="${x => x.ariaExpanded}"
            aria-haspopup="listbox"
            class="control"
            part="control"
            role="button"
            ?disabled="${x => x.disabled}"
        >
            ${startTemplate}
            <slot name="button-container">
                <div class="selected-value" part="selected-value">
                    <slot name="selected-value">
                        <input
                            class="selected-value"
                            part="selected-value"
                            type="text"
                            @input="${(x, c) => x.handleTextInput(c.event as InputEvent)}"
                            ${ref("valueInput")}
                        />
                    </slot>
                </div>
                <div class="indicator" part="indicator" aria-hidden="true">
                    <slot name="indicator">
                        <svg
                            class="select-indicator"
                            part="select-indicator"
                            viewBox="0 0 12 7"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
                            />
                        </svg>
                    </slot>
                </div>
            </slot>
            ${endTemplate}
        </div>
        ${when(
            x => x.open,
            html<Combobox>`
                <fast-anchored-region
                    class="region"
                    fixed-placement="true"
                    vertical-positioning-mode="dynamic"
                    vertical-scaling="fill"
                    vertical-inset="false"
                    horizontal-positioning-mode="dynamic"
                    horizontal-scaling="anchor"
                    horizontal-inset="true"
                    @loaded="${(x, c) => x.handleRegionLoaded(c.event as Event)}"
                    ${ref("region")}
                >
                    <div
                        aria-disabled="${x => x.disabled}"
                        class="listbox"
                        id="${x => x.listboxId}"
                        part="listbox"
                        role="listbox"
                        ?disabled="${x => x.disabled}"
                    >
                        <slot
                            ${slotted({
                                flatten: true,
                                property: "slottedOptions",
                            })}
                        ></slot>
                    </div>
                </fast-anchored-region>
            `
        )}
    </template>
`;

// <slot
// ${slotted({
//     filter: Listbox.slottedOptionFilter,
//     flatten: true,
//     property: "slottedOptions",
// })}
// ></slot>
