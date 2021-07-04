import * as React from "react";
import { toPx } from "@microsoft/fast-jss-utilities";
import { IDevSiteDesignSystem } from "../design-system";
import Form from "@microsoft/fast-form-generator-react";
import manageJss, { ComponentStyles, IJSSManagerProps, IManagedClasses } from "@microsoft/fast-jss-manager-react";

export enum TabType {
    presets = "Presets"
}

export interface IConfigurationPanelProps {
    formChildOptions: any;
    schema: any;
    data: any;
    onChange: any;
    activeTab?: TabType;
}

export interface IConfigurationPanelState {
    activeTab: TabType;
}

export interface IConfigurationPanelManagedClasses {
    configurationPanel: string;
    configurationPanel_controls: string;
    configurationPanel_controlsTabs: string;
    configurationPanel_tab: string;
    configurationPanel_tab__active: string;
    configurationPanel_tabPanel: string;
    configurationPanel_paneForm: string;
}

const style: ComponentStyles<IConfigurationPanelManagedClasses, IDevSiteDesignSystem> = {
    configurationPanel: {
        width: "100%"
    },
    configurationPanel_controls: {
        display: "flex",
        padding: `${toPx(2)} ${toPx(4)}`,
        "& ul": {
            margin: "0",
            padding: "0",
            listStyleType: "none",
            "& li": {
                display: "inline-block"
            }
        },
        "& button": {
            border: "none",
            height: toPx(38),
            padding: `${toPx(6)} ${toPx(8)}`,
            minWidth: toPx(25),
            backgroundPosition: "center"
        }
    },
    configurationPanel_controlsTabs: {
        flexGrow: "1"
    },
    configurationPanel_tab: {
        "& button": {
            background: "none",
            "&:focus": {
                outline: "none"
            }
        }
    },
    configurationPanel_tab__active: {
        "& button": {
            borderRadius: toPx(3),
            position: "relative",
            "&:after": {
                position: "absolute",
                bottom: "0",
                left: toPx(4),
                right: toPx(4),
                content: "''",
                height: toPx(2),
                borderRadius: toPx(3),

                background: "#FB356D"
            }
        }
    },
    configurationPanel_tabPanel: {
        "&[aria-hidden=\"true\"]": {
            display: "none"
        }
    },
    configurationPanel_paneForm: {
        padding: toPx(12)
    },
};

/* tslint:disable-next-line */
class ConfigurationPanel extends React.Component<IConfigurationPanelProps & IManagedClasses<IConfigurationPanelManagedClasses>, IConfigurationPanelState> {
    private tabs: TabType[];

    constructor(props: IConfigurationPanelProps & IManagedClasses<IConfigurationPanelManagedClasses>) {
        super(props);

        this.tabs = [TabType.presets];

        this.state = {
            activeTab: this.props.activeTab || TabType.presets
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

    private renderTabItems(): JSX.Element[] {
        return this.tabs.map((tabItem: TabType, index: number) => {
            if (tabItem === TabType.presets) {
                return (
                    <li key={index} className={this.getTabClassNames(tabItem)}>
                        <button onClick={this.handleChangeTab(tabItem)}>
                            {tabItem}
                        </button>
                    </li>
                );
            }
        });
    }

    private renderTabPanels(): JSX.Element {
        return (
            <div>
                {this.renderTabPanelItems()}
            </div>
        );
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

    private renderTabPanelContent(tabItem: TabType): JSX.Element {
        switch (tabItem) {
            case TabType.presets:
                return this.renderPresets();
            default:
                return null;
        }
    }

    private renderPresets(): JSX.Element {
        return (
            <Form
                className={this.props.managedClasses.configurationPanel_paneForm}
                schema={this.props.schema}
                data={this.props.data}
                onChange={this.props.onChange}
                childOptions={this.props.formChildOptions}
            />
        );
    }

    private getTabClassNames(tabItem: TabType): string {
        if (tabItem === this.state.activeTab) {
            return `${this.props.managedClasses.configurationPanel_tab} ${this.props.managedClasses.configurationPanel_tab__active}`;
        }

        return this.props.managedClasses.configurationPanel_tab;
    }

    private handleChangeTab(tab: TabType): (e: React.MouseEvent<HTMLButtonElement>) => void {
        return (e: React.MouseEvent<HTMLButtonElement>): void => {
            this.setState({
                activeTab: tab
            });
        };
    }
}

export default manageJss(style)(ConfigurationPanel);
