import { html, repeat, when } from "@microsoft/fast-element";
import { ContentPlacementContainer } from "./content-placement-container";

export const ContentPlacementContainerTemplate = html<ContentPlacementContainer>`
    <div class="container">
        ${when(
            x => x.section === "framework",
            html<ContentPlacementContainer>`
                ${repeat(
                    x => x.frameworkContentPlacementData,
                    html`<site-content-placement divider>
                        <h3>${x => x.header}</h3>
                        <p slot="body">${x => x.body}</p>
                        <span slot="compatibility" :innerHTML=${x => x.compatibilityIcon}>
                        </span>
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
        ${when(
            x => x.section === "community",
            html<ContentPlacementContainer>`
                ${repeat(
                    x => x.communityContentPlacementData,
                    html`<site-content-placement>
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
