import * as React from "react";
import { toPx } from "@microsoft/fast-jss-utilities";
import { get, set } from "lodash-es";
import devSiteDesignSystemDefaults, { DevSiteDesignSystem } from "../design-system";
import { applyScrollbarStyle } from "../../utilities";
import Form from "@microsoft/fast-form-generator-react";
import CSSEditor from "@microsoft/fast-css-editor-react";
import manageJss, {
    ComponentStyles,
    ManagedClasses,
    ManagedJSSProps,
} from "@microsoft/fast-jss-manager-react";
import { mapSchemaLocationFromDataLocation } from "@microsoft/fast-data-utilities-react";

export enum TabType {
    presets = "Presets",
}

export interface ConfigurationPanelProps {
    formChildOptions: any;
    schema: any;
    data: any;
    dataLocation: string;
    onChange: any;
    onLocationUpdate: (dataLocation: string) => void;
    activeTab?: TabType;
    styleEditing?: boolean;
}

export interface ConfigurationPanelState {
    activeTab: TabType;
}

export interface ConfigurationPanelManagedClasses {
    configurationPanel: string;
    configurationPanel_controls: string;
    configurationPanel_controlsTabs: string;
    configurationPanel_tab: string;
    configurationPanel_tab__active: string;
    configurationPanel_tabPanel: string;
    configurationPanel_paneForm: string;
}

const style: ComponentStyles<ConfigurationPanelManagedClasses, DevSiteDesignSystem> = {
    configurationPanel: {
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        overflowX: "auto",
        color: (config: DevSiteDesignSystem): string => {
            return config.foreground300 || devSiteDesignSystemDefaults.foreground300;
        },
        ...applyScrollbarStyle(),
    },
    configurationPanel_controls: {
        display: "flex",
        padding: `0 ${toPx(4)}`,
        "& ul": {
            margin: "0",
            padding: "0",
            listStyleType: "none",
            "& li": {
                display: "inline-block",
            },
        },
        "& button": {
            color: (config: DevSiteDesignSystem): string => {
                return config.foreground300 || devSiteDesignSystemDefaults.foreground300;
            },
            border: "1px solid transparent",
            height: "30px",
            padding: "0 8px",
            minWidth: "25px",
            backgroundPosition: "center",
            "&:hover": {
                cursor: "pointer",
                background: "rgba(255, 255, 255, 0.04)",
            },
            "&:focus": {
                outline: "none",
                border: (config: DevSiteDesignSystem): string => {
                    return `1px solid ${config.brandColor ||
                        devSiteDesignSystemDefaults.brandColor}`;
                },
            },
        },
    },
    configurationPanel_controlsTabs: {
        flexGrow: "1",
    },
    configurationPanel_tab: {
        "& button": {
            fontFamily: "inherit",
            fontSize: "inherit",
            background: "none",
            borderRadius: toPx(2),
            position: "relative",
            "&:focus": {
                outline: "none",
            },
        },
    },
    configurationPanel_tab__active: {
        "& button": {
            borderRadius: toPx(3),
            position: "relative",
            "&:after": {
                position: "absolute",
                bottom: toPx(-1),
                left: toPx(4),
                right: toPx(4),
                content: "''",
                height: toPx(2),
                borderRadius: `${toPx(2)} ${toPx(2)} 0 0`,
                background: (config: DevSiteDesignSystem): string => {
                    return config.brandColor || devSiteDesignSystemDefaults.brandColor;
                },
            },
        },
    },
    configurationPanel_tabPanel: {
        '&[aria-hidden="true"]': {
            display: "none",
        },
    },
    configurationPanel_paneForm: {
        paddingLeft: "10px",
    },
};

/* tslint:disable-next-line */
class ConfigurationPanel extends React.Component<
    ConfigurationPanelProps & ManagedClasses<ConfigurationPanelManagedClasses>,
    ConfigurationPanelState
> {
    private tabs: TabType[];

    constructor(
        props: ConfigurationPanelProps & ManagedClasses<ConfigurationPanelManagedClasses>
    ) {
        super(props);

        this.tabs = [TabType.presets];

        this.state = {
            activeTab: this.props.activeTab || TabType.presets,
        };
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.managedClasses.configurationPanel}>
                <div className={this.props.managedClasses.configurationPanel_controls}>
                    {this.renderTabs()}
                </div>
                {this.renderTabPanels()}
            </div>
        );
    }

    private renderTabs(): JSX.Element {
        return (
            <ul className={this.props.managedClasses.configurationPanel_controlsTabs}>
                {this.renderTabItems()}
            </ul>
        );
    }

    private renderTabItems(): React.ReactNode {
        return this.tabs.map((tabItem: TabType, index: number) => {
            return (
                <li key={index} className={this.getTabClassNames(tabItem)}>
                    <button onClick={this.handleChangeTab(tabItem)}>{tabItem}</button>
                </li>
            );
        });
    }

    private renderTabPanels(): JSX.Element {
        return <div>{this.renderTabPanelItems()}</div>;
    }

    private renderTabPanelItems(): JSX.Element[] {
        return this.tabs.map((tabItem: TabType, index: number) => {
            return (
                <div
                    key={index}
                    aria-hidden={this.state.activeTab !== tabItem}
                    className={this.props.managedClasses.configurationPanel_tabPanel}
                >
                    {this.renderTabPanelContent(tabItem)}
                </div>
            );
        });
    }

    private renderTabPanelContent(tabItem: TabType): React.ReactNode {
        switch (tabItem) {
            case TabType.presets:
                return this.renderPresets();
            default:
                return null;
        }
    }

    private renderPresets(): React.ReactNode {
        return (
            <React.Fragment>
                <Form
                    className={this.props.managedClasses.configurationPanel_paneForm}
                    schema={this.props.schema}
                    data={this.props.data}
                    onChange={this.props.onChange}
                    childOptions={this.props.formChildOptions}
                    location={{
                        dataLocation: this.props.dataLocation,
                        onChange: this.handleLocationUpdate,
                    }}
                />
                {this.renderCSSEditor()}
            </React.Fragment>
        );
    }

    private renderCSSEditor(): React.ReactNode {
        if (!!this.props.styleEditing) {
            const schemaLocation: string = mapSchemaLocationFromDataLocation(
                this.props.dataLocation,
                this.props.data,
                this.props.schema
            );
            const schemaLocationSegments: string[] = schemaLocation.split(".");
            const isChild: boolean =
                this.props.dataLocation === "" ||
                (typeof get(this.props.data, this.props.dataLocation) !== "string" &&
                    schemaLocationSegments[schemaLocationSegments.length - 1] ===
                        "props"); // HACK: there is no garauntee that there will be no property named "props"

            if (isChild) {
                return (
                    <CSSEditor onChange={this.handleStyleChange} {...this.getStyle()} />
                );
            }
        }

        return null;
    }

    private getTabClassNames(tabItem: TabType): string {
        if (tabItem === this.state.activeTab) {
            return `${this.props.managedClasses.configurationPanel_tab} ${
                this.props.managedClasses.configurationPanel_tab__active
            }`;
        }

        return this.props.managedClasses.configurationPanel_tab;
    }

    private getStyle(): any {
        return get(
            this.props.data,
            `${this.props.dataLocation}${this.props.dataLocation === "" ? "" : "."}style`
        );
    }

    private handleStyleChange = (updatedStyle: any): void => {
        this.props.onChange(
            set(
                this.props.data,
                `${this.props.dataLocation}${
                    this.props.dataLocation === "" ? "" : "."
                }style`,
                updatedStyle
            )
        );
    };

    private handleLocationUpdate = (dataLocation: string): void => {
        this.props.onLocationUpdate(dataLocation);
    };

    private handleChangeTab(
        tab: TabType
    ): (e: React.MouseEvent<HTMLButtonElement>) => void {
        return (e: React.MouseEvent<HTMLButtonElement>): void => {
            this.setState({
                activeTab: tab,
            });
        };
    }
}

export default manageJss(style)(ConfigurationPanel);
