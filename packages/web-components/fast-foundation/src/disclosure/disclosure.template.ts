import { html, ref } from "@microsoft/fast-element";
import { Disclosure } from "./disclosure";

/**
 * The template for the {@link @microsoft/fast-foundation#Disclosure} component.
 * @public
 */
export const DisclosureTemplate = html<Disclosure>`
    <details class="disclosure" ${ref("details")}>
        <summary
            class="invoker"
            role="button"
            aria-controls="disclosure-content"
            aria-expanded="${x => x.expanded}"
        >
            <slot name="start"></slot>
            <slot name="title">${x => x.title}</slot>
            <slot name="end"></slot>
        </summary>
        <div id="disclosure-content"><slot></slot></div>
    </details>
`;
