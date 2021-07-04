import { html, repeat, when } from "@microsoft/fast-element";
import { ContentPlacementContainer } from "./content-placement-container";

export const ContentPlacementContainerTemplate = html<ContentPlacementContainer>`
    <div
        class="container ${x =>
            ["framework", "feature", "community"].includes(x.section)
                ? `${x.section}_container`
                : ""}"
    >
        ${when(
            x => x.section === "framework",
            html<ContentPlacementContainer>`
                ${repeat(
                    x => x.frameworkContentPlacementData,
                    html`<site-content-placement class="framework_ContentPlacement">
                        <h3>${x => x.header}</h3>
                        <p slot="body">${x => x.body}</p>
                    </site-content-placement>`
                )}
            `
        )}
        ${when(
            x => x.section === "feature",
            html<ContentPlacementContainer>`
                ${repeat(
                    x => x.featureCardData,
                    html`<site-feature-card>
                        <div>${x => x.item}</div>
                        <h4>${x => x.header}</h4>
                        <p slot="body">${x => x.body}</p>
                        <fast-anchor
                            slot="footer"
                            href=${x => x.githubLink}
                            appearance="lightweight"
                            >View Github</fast-anchor
                        >
                        <fast-anchor
                            slot="footer"
                            href=${x => x.documentationLink}
                            appearance="lightweight"
                            >Read Documentation</fast-anchor
                        >
                    </site-feature-card>`
                )}
            `
        )}
        ${when(
            x => x.section === "community",
            html<ContentPlacementContainer>`
                ${repeat(
                    x => x.communityContentPlacementData,
                    html`<site-content-placement icon>
                        <div slot="icon" :innerHTML=${x => x.icon}></div>
                        <h3>${x => x.header}</h3>
                        <p slot="body">${x => x.body}</p>
                        <fast-anchor
                            slot="action"
                            appearance="lightweight"
                            href=${x => x.actionLink}
                            >${x => x.actionText}</fast-anchor
                        >
                    </site-content-placement>`
                )}
            `
        )}
    </div>
`;
