import * as React from "react";
import manageJss, { ComponentStyles, IJSSManagerProps, IManagedClasses } from "@microsoft/fast-jss-manager-react";
import { IPageHandledProps, PageProps } from "./page.props";
import Foundation, { IFoundationProps } from "../foundation";

export interface IPageClassNamesContract {
    "@global": string;
    page: string;
}

const styles: ComponentStyles<IPageClassNamesContract, undefined> = {
    "@global": {
        "html, body": {
            padding: 0,
            margin: 0
        }
    },
    page: {
        display: "grid"
    }
};

class Page extends Foundation<PageProps, undefined> {
    public static defaultProps: Partial<IPageHandledProps> = {
        margin: "minmax(5vw, 1fr)",
        maxWidth: "1600px"
    };

    protected handledProps: IPageHandledProps & IManagedClasses<IPageClassNamesContract> = {
        managedClasses: void 0,
        margin: void 0,
        maxWidth: void 0
    };

    /**
     * Renders the Page markup
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div {...this.generateAttributes()}>
                {this.props.children}
            </div>
        );
    }

    private generateAttributes(): React.HTMLAttributes<HTMLDivElement> {
        const attributes: React.HTMLAttributes<HTMLDivElement> = Object.assign({}, this.unhandledProps(), {
            className: super.generateClassNames(this.props.managedClasses.page)
        });
        const margin: string = this.props.margin;
        const maxWidth: string = this.props.maxWidth;

        if (!attributes.style) {
            attributes.style = {};
        }

        attributes.style = {
            gridTemplateColumns: `${margin} minmax(auto, ${maxWidth}) ${margin}`,
            msGridColumns: `${margin} minmax(0, ${maxWidth}) ${margin}`
        };

        return attributes;
    }
}

export default manageJss(styles)(Page);
