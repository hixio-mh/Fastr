import { html } from "@microsoft/fast-element";
import { FeatureCard } from "./feature-card";

export const FeatureCardTemplate = html<FeatureCard>`
    <fast-card class="card">
        <section>
            <h5><slot name="featureId">featureID</slot></h5>
            <h4><slot name="heading">heading</slot></h4>
        </section>
        <section class="content">
            <slot></slot>
            <div>
                <fast-anchor class="link" href="#" appearance="lightweight"
                    >View Github</fast-anchor
                >
                <fast-anchor class="link" href="#" appearance="lightweight"
                    >Read Documentation</fast-anchor
                >
            </div>
        </section>
    </fast-card>
`;
