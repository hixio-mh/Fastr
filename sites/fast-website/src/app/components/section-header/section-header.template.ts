import { html } from "@microsoft/fast-element";
import { SectionHeader } from "./section-header";

export const SectionHeaderTemplate = html<SectionHeader>`
    <template>
        <slot name="badge"></slot>
        <slot></slot>
        <slot name="body"></slot>
        <slot name="action"></slot>
    </template>
`;
