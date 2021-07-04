import * as React from "react";
import { get } from "lodash-es";
import { KeyCodes } from "@microsoft/fast-web-utilities";
import {
    ManagedClasses,
    TabsClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import {
    TabsHandledProps,
    TabsManagedClasses,
    TabsProps,
    TabsUnhandledProps,
} from "./tabs.props";

export enum TabLocation {
    first,
    last,
    previous,
    next,
}

export enum TabsSlot {
    tab = "tab",
    tabItem = "tab-item",
    tabPanel = "tab-panel",
}

export interface TabsState {
    activeId: string;
}

class Tabs extends Foundation<TabsHandledProps, TabsUnhandledProps, TabsState> {
    public static displayName: string = "Tabs";

    /**
     * React life-cycle method
     */
    public static getDerivedStateFromProps(
        nextProps: TabsProps,
        prevState: TabsState
    ): null | TabsState {
        if (nextProps.activeId && nextProps.activeId !== prevState.activeId) {
            return {
                activeId: nextProps.activeId,
            };
        }

        return null;
    }

    protected handledProps: HandledProps<TabsHandledProps> = {
        activeId: void 0,
        label: void 0,
        managedClasses: void 0,
        onUpdate: void 0,
        orientation: void 0,
        tabItemSlot: void 0,
        tabPanelSlot: void 0,
        tabSlot: void 0,
    };

    /**
     * React ref for the tab list
     */
    private tabListRef: React.RefObject<HTMLDivElement>;

    constructor(props: TabsProps) {
        super(props);

        const tabItems: React.ReactNode[] = React.Children.toArray(this.tabItems());

        this.tabListRef = React.createRef();

        this.state = {
            activeId: this.props.activeId
                ? this.props.activeId
                : tabItems.length > 0
                    ? get(tabItems[0], "props.id")
                    : "",
        };
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const tabElements: JSX.Element[] = this.renderTabElements();

        return (
            <div {...this.unhandledProps()} className={this.generateClassNames()}>
                <div
                    role="tablist"
                    ref={this.tabListRef}
                    className={get(this.props, "managedClasses.tabs_tabList")}
                    aria-label={this.props.label}
                    aria-orientation={this.props.orientation}
                >
                    {tabElements}
                </div>
                <div className={get(this.props, "managedClasses.tabs_tabPanels")}>
                    {this.renderTabPanels()}
                </div>
            </div>
        );
    }

    /**
     * React lifecycle hook
     */
    public componentDidUpdate(prevProps: TabsProps): void {
        if (
            typeof this.props.activeId === "string" &&
            this.props.activeId !== prevProps.activeId
        ) {
            const items: React.ReactNode[] = React.Children.toArray(
                this.getChildrenBySlot(
                    this.props.children,
                    this.getSlot(TabsSlot.tabItem)
                )
            );

            const currentItemIndex: number = items.findIndex(this.getCurrentIndexById);

            (Array.from(this.tabListRef.current.children)[
                currentItemIndex
            ] as HTMLButtonElement).focus();
        }
    }

    /**
     * Generates class names based on props
     */
    protected generateClassNames(): string {
        return super.generateClassNames(get(this.props, "managedClasses.tabs"));
    }

    /**
     * Renders the tab elements
     */
    private renderTabElements(): JSX.Element[] {
        return React.Children.map(this.tabItems(), this.renderTabItem);
    }

    private tabItems(): React.ReactNode {
        return this.getChildrenBySlot(
            this.props.children,
            this.getSlot(TabsSlot.tabItem)
        );
    }

    private renderTabItem = (tabItem: JSX.Element, index: number): JSX.Element => {
        return React.cloneElement(
            this.getChildrenBySlot(tabItem.props.children, this.getSlot(TabsSlot.tab))[0],
            {
                key: tabItem.props.id,
                "aria-controls": tabItem.props.id,
                active: this.state.activeId === tabItem.props.id,
                onClick: this.handleClick,
                onKeyDown: this.handleKeyDown,
                tabIndex: this.state.activeId !== tabItem.props.id ? -1 : 0,
            }
        );
    };

    /**
     * Renders the tab panels
     */
    private renderTabPanels(): JSX.Element[] {
        return React.Children.map(this.tabItems(), this.renderTabPanel);
    }

    private renderTabPanel = (tabItem: JSX.Element, index: number): JSX.Element => {
        return React.cloneElement(
            this.getChildrenBySlot(
                tabItem.props.children,
                this.getSlot(TabsSlot.tabPanel)
            )[0],
            {
                key: tabItem.props.id,
                id: tabItem.props.id,
                "aria-labelledby": tabItem.props.id,
                active: this.state.activeId === tabItem.props.id,
            }
        );
    };

    /**
     * Handles the click event on the tab element
     */
    private handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if (!this.props.activeId) {
            this.setState({
                activeId: e.currentTarget.getAttribute("aria-controls"),
            });
        } else if (typeof this.props.onUpdate === "function") {
            this.props.onUpdate(e.currentTarget.getAttribute("aria-controls"));
        }
    };

    /**
     * Handles the keydown event on the tab element
     */
    private handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
        switch (e.keyCode) {
            case KeyCodes.arrowLeft:
            case KeyCodes.arrowUp:
                this.activateTab(TabLocation.previous);
                break;
            case KeyCodes.arrowRight:
            case KeyCodes.arrowDown:
                this.activateTab(TabLocation.next);
                break;
            case KeyCodes.home:
                this.activateTab(TabLocation.first);
                break;
            case KeyCodes.end:
                this.activateTab(TabLocation.last);
                break;
        }
    };

    /**
     * Activates a tab
     */
    private activateTab(location: TabLocation): void {
        const items: React.ReactNode[] = React.Children.toArray(this.tabItems());
        const count: number = items.length;
        const currentItemIndex: number = React.Children.toArray(items).findIndex(
            this.getCurrentIndexById
        );
        let itemIndex: number;

        switch (location) {
            case TabLocation.first:
                itemIndex = 0;
                break;
            case TabLocation.last:
                itemIndex = count - 1;
                break;
            case TabLocation.previous:
                itemIndex = currentItemIndex > 0 ? currentItemIndex - 1 : count - 1;
                break;
            case TabLocation.next:
                itemIndex = currentItemIndex < count - 1 ? currentItemIndex + 1 : 0;
                break;
        }

        const activeId: string | undefined = get(items[itemIndex], "props.id");

        if (!this.props.activeId) {
            this.setState({
                activeId,
            });

            (Array.from(this.tabListRef.current.children)[
                itemIndex
            ] as HTMLButtonElement).focus();
        } else if (typeof this.props.onUpdate === "function") {
            this.props.onUpdate(activeId);
        }
    }

    /**
     * Gets the current index by tab item ID
     */
    private getCurrentIndexById = (item: JSX.Element): boolean => {
        return item.props.id === this.state.activeId;
    };

    /**
     * Gets the slot to use for tab children
     */
    private getSlot(slot: TabsSlot): TabsSlot | string {
        switch (slot) {
            case TabsSlot.tab:
                return typeof this.props.tabSlot === "string"
                    ? this.props.tabSlot
                    : TabsSlot.tab;
            case TabsSlot.tabItem:
                return typeof this.props.tabItemSlot === "string"
                    ? this.props.tabItemSlot
                    : TabsSlot.tabItem;
            case TabsSlot.tabPanel:
                return typeof this.props.tabPanelSlot === "string"
                    ? this.props.tabPanelSlot
                    : TabsSlot.tabPanel;
        }
    }

    /**
     * Gets the child by the slot property
     */
    private getChildrenBySlot(
        children: React.ReactNode,
        slot: TabsSlot | string
    ): React.ReactNode {
        const childBySlot: React.ReactNode = this.withSlot(slot, children);

        return slot !== this.getSlot(TabsSlot.tabItem)
            ? childBySlot
            : React.Children.map(
                  childBySlot,
                  (node: React.ReactNode): React.ReactNode | null => {
                      return this.isValidTabItem(node) ? node : null;
                  }
              );
    }

    /**
     * Return a tab item if it has a tab and tab panel
     */
    private isValidTabItem(child: React.ReactNode): boolean {
        const children: React.ReactNode = get(child, "props.children");
        return (
            !!this.getChildrenBySlot(children, this.getSlot(TabsSlot.tab))[0] &&
            !!this.getChildrenBySlot(children, this.getSlot(TabsSlot.tabPanel))[0]
        );
    }
}

export default Tabs;
export * from "./tabs.props";
