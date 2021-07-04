import React from "react";
import { ComponentStyles } from "@microsoft/fast-jss-manager-react";
import { PageHandledProps, PageProps, PageUnhandledProps } from "./page.props";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { canUseCssGrid } from "@microsoft/fast-web-utilities";

export interface PageClassNamesContract {
    page?: string;
}

export class Page extends Foundation<PageHandledProps, PageUnhandledProps, {}> {
    public static displayName: string = "Page";

    public static defaultProps: Partial<PageProps> = {
        margin: "minmax(5vw, 1fr)",
        maxWidth: "1600px",
    };

    private static display: string = canUseCssGrid() ? "grid" : "-ms-grid";

    protected handledProps: HandledProps<PageHandledProps> = {
        managedClasses: void 0,
        margin: void 0,
        maxWidth: void 0,
    };

    /**
     * Renders the Page markup
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return <div {...this.generateAttributes()}>{this.props.children}</div>;
    }

    private generateAttributes(): React.HTMLAttributes<HTMLDivElement> {
        const columns: string = `${this.props.margin} minmax(0, ${this.props.maxWidth}) ${
            this.props.margin
        }`;

        const attributes: React.HTMLAttributes<HTMLDivElement> = {
            ...this.unhandledProps(),
            className: super.generateClassNames(this.props.managedClasses.page),
        };

        return {
            ...attributes,
            style: {
                // attributes.style has to be spread here again in order to
                // merge the styles attribute, otherwise it is just overriden
                ...attributes.style,
                display: Page.display,
                gridTemplateColumns: columns,
                msGridColumns: columns,
            },
        };
    }
}

export * from "./page.props";
