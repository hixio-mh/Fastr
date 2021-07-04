import React from "react";
import { toPx } from "@microsoft/fast-jss-utilities";
import devSiteDesignSystemDefaults, { DevSiteDesignSystem } from "../design-system";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { ComponentViewTypes } from "./component-view";
import {
    glyphBuildingblocks,
    glyphExamples,
    glyphPage,
} from "@microsoft/fast-glyphs-msft";
import ComponentViewToggle from "./component-view-toggle";
import manageJss, {
    ComponentStyles,
    CSSRules,
    ManagedClasses,
    ManagedJSSProps,
} from "@microsoft/fast-jss-manager-react";

export enum ActionEnum {
    configure = "configure",
    view = "view",
}

export interface ActionBarProps extends RouteComponentProps<any> {
    /*
     * The current ComponentView of the app
     */
    componentView: ComponentViewTypes;

    /**
     * The current viewable state of the Form
     */
    formView: boolean;

    /**
     * The current viewable state of the Dev Tools
     */
    devToolsView: boolean;

    /**
     * A callback to get called when the app's ComponentView should be changed
     */
    onComponentViewChange: (type: ComponentViewTypes) => void;

    /**
     * A callback to get called when the pane containing the form changes visibility
     */
    onFormToggle: () => void;

    /**
     * A callback to get called when the dev tools changes visibility
     */
    onDevToolsToggle: () => void;
}

export interface ActionBarClassNameContract {
    actionBar: string;
    actionBar_componentViewToggles: string;
    actionBar_menu: string;
    actionBar_menu_button: string;
    actionBar_menu_button__active: string;
}

function menuButtonBase(): CSSRules<DevSiteDesignSystem> {
    return {
        position: "relative",
        border: "1px solid transparent",
        height: "30px",
        borderRadius: "2px",
        background: "none",
        fill: (config: DevSiteDesignSystem): string => {
            return config.foreground300 || devSiteDesignSystemDefaults.foreground300;
        },
        color: (config: DevSiteDesignSystem): string => {
            return config.foreground300 || devSiteDesignSystemDefaults.foreground300;
        },
        padding: "0 12px",
        fontSize: "inherit",
        fontFamily: "inherit",
        "& span": {
            width: toPx(16),
            height: toPx(16),
            marginRight: toPx(5),
            display: "inline-block",
            fontSize: toPx(16),
            verticalAlign: "text-bottom",
        },
        "&:hover": {
            cursor: "pointer",
            background: "rgba(0, 0, 0, 0.04)",
        },
        "&:focus": {
            outline: "none",
            border: (config: DevSiteDesignSystem): string => {
                return `${toPx(1)} solid ${config.brandColor ||
                    devSiteDesignSystemDefaults.brandColor}`;
            },
        },
    };
}

const styles: ComponentStyles<ActionBarClassNameContract, DevSiteDesignSystem> = {
    actionBar: {
        display: "flex",
        flexBasis: "100%",
        borderBottom: (config: DevSiteDesignSystem): string => {
            return `1px solid ${config.background300 ||
                devSiteDesignSystemDefaults.background300}`;
        },
        background: (config: DevSiteDesignSystem): string => {
            return config.background100 || devSiteDesignSystemDefaults.background100;
        },
        boxSizing: "border-box",
        height: "30px",
    },
    actionBar_componentViewToggles: {
        display: "flex",
        justifyContent: "flex-end",
        flexGrow: "1",
    },
    actionBar_menu: {
        flexGrow: "1",
    },
    actionBar_menu_button: {
        ...menuButtonBase(),
    },
    actionBar_menu_button__active: {
        ...menuButtonBase(),
        "&::after": {
            content: "''",
            position: "absolute",
            height: toPx(2),
            bottom: toPx(-1),
            borderRadius: `${toPx(2)} ${toPx(2)} 0 0`,
            left: toPx(12),
            right: toPx(12),
            background: (config: DevSiteDesignSystem): string => {
                return config.brandColor || devSiteDesignSystemDefaults.brandColor;
            },
        },
    },
};

class ActionBar extends React.Component<
    ActionBarProps & ManagedClasses<ActionBarClassNameContract>,
    {}
> {
    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.actionBar}>
                <div className={this.props.managedClasses.actionBar_menu}>
                    <button
                        className={this.getActionBarMenuButtonClassNames(
                            ActionEnum.configure
                        )}
                        onClick={this.props.onFormToggle}
                    >
                        Configure
                    </button>
                    <button
                        className={this.getActionBarMenuButtonClassNames(ActionEnum.view)}
                        onClick={this.props.onDevToolsToggle}
                    >
                        Dev Tools
                    </button>
                </div>
                <div className={this.props.managedClasses.actionBar_componentViewToggles}>
                    <ComponentViewToggle
                        to={this.normalizePath()}
                        onClick={this.onComponentViewChangeCallback(
                            ComponentViewTypes.detail
                        )}
                        label="View detail"
                        current={this.isAriaCurrent(ComponentViewTypes.detail)}
                        glyph={glyphPage}
                    />
                    <ComponentViewToggle
                        to={`${this.normalizePath()}${
                            ComponentViewTypes[ComponentViewTypes.examples]
                        }/`}
                        onClick={this.onComponentViewChangeCallback(
                            ComponentViewTypes.examples
                        )}
                        label="View examples"
                        current={this.isAriaCurrent(ComponentViewTypes.examples)}
                        glyph={glyphExamples}
                    />
                </div>
            </div>
        );
    }

    private normalizePath(local?: string): string {
        const rootPathRegex: RegExp = /\(.*/g;
        let normalizePath: string = this.props.match.path;
        normalizePath = normalizePath.replace(rootPathRegex, "");

        return normalizePath;
    }

    private getActionBarMenuButtonClassNames(type: ActionEnum): string {
        if (
            (this.props.formView && type === ActionEnum.configure) ||
            (this.props.devToolsView && type === ActionEnum.view)
        ) {
            return this.props.managedClasses.actionBar_menu_button__active;
        }

        return this.props.managedClasses.actionBar_menu_button;
    }

    private isAriaCurrent(type: ComponentViewTypes): boolean {
        return this.props.componentView === type;
    }

    /**
     * Get a function to call callback with a passed param
     */
    private onComponentViewChangeCallback(
        type: ComponentViewTypes
    ): (e: React.MouseEvent<HTMLAnchorElement>) => void {
        return (e: React.MouseEvent<HTMLAnchorElement>): void => {
            if (typeof this.props.onComponentViewChange === "function") {
                this.props.onComponentViewChange(type);
            }
        };
    }
}

export default withRouter(manageJss(styles)(ActionBar));
