import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { DesignSystemProvider } from "@microsoft/fast-jss-manager-react";
import Creator from "./creator";
import { creatorDesignSystem } from "./creator.design-system";
import Preview from "./preview";

/**
 * Create the root node
 */
export default class App extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <BrowserRouter>
                <fast-design-system-provider use-defaults>
                    <DesignSystemProvider designSystem={creatorDesignSystem}>
                        <Route component={Creator} exact={true} path="/" />
                        <Route
                            component={Creator}
                            exact={true}
                            path="/data-dictionary/:key"
                        />
                    </DesignSystemProvider>
                    <Route component={Preview} exact={true} path="/preview" />
                </fast-design-system-provider>
            </BrowserRouter>
        );
    }
}
