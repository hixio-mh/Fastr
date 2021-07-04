import * as React from "react";
import manageJss, {
    ComponentStyles,
    ManagedClasses,
    ManagedJSSProps,
} from "@microsoft/fast-jss-manager-react";
import { PageHandledProps, PageProps, PageUnhandledProps } from "./page.props";
import Foundation, {
    FoundationProps,
    HandledProps,
} from "@microsoft/fast-components-foundation-react";

export interface PageClassNamesContract {
    page?: string;
}

export const pageStyleSheet: ComponentStyles<PageClassNamesContract, undefined> = {
    "@global": {
        "html, body": {
            padding: 0,
            margin: 0,
        },
    },
    page: {
        display: "grid",
    },
};

export class Page extends Foundation<PageHandledProps, PageUnhandledProps, {}> {
    public static defaultProps: Partial<PageProps> = {
        margin: "minmax(5vw, 1fr)",
        maxWidth: "1600px",
    };

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
        const attributes: React.HTMLAttributes<HTMLDivElement> = Object.assign(
            {},
            this.unhandledProps(),
            {
                className: super.generateClassNames(this.props.managedClasses.page),
            }
        );
        const columns: string = `${this.props.margin} minmax(0, ${this.props.maxWidth}) ${
            this.props.margin
        }`;

        if (!attributes.style) {
            attributes.style = {};
        }

        attributes.style = {
            gridTemplateColumns: columns,
            msGridColumns: columns,
        };

        return attributes;
    }
}

export * from "./page.props";
