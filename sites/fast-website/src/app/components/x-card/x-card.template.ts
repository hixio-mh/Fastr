import { html } from "@microsoft/fast-element";
import { XCard } from "./x-card";

export const XCardTemplate = html<XCard>`
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot></slot>
        <div>
            <slot name="links"></slot>
        </div>
    </main>
`;
