import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import {
    ChildOptionItem,
    mapDataToComponent,
} from "@microsoft/fast-data-utilities-react";
import {
    ViewerContentHandledProps,
    ViewerContentUnhandledProps,
} from "./viewer-content.props";
import {
    ComponentData,
    ViewerMessage,
    ViewerMessageTarget,
    ViewerMessageType,
} from "../utilities/message-system";

export interface ViewerContentState {
    componentData?: ComponentData[];
}

export default class ViewerContent extends Foundation<
    ViewerContentHandledProps,
    ViewerContentUnhandledProps,
    ViewerContentState
> {
    public static displayName: string = "ViewerContent";

    protected handledProps: HandledProps<ViewerContentHandledProps> = {
        managedClasses: void 0,
        components: void 0,
    };

    constructor(props: ViewerContentHandledProps) {
        super(props);

        this.state = {
            componentData: [],
        };

        if (window) {
            window.addEventListener("message", this.handleMessage);
        }
    }

    public render(): JSX.Element {
        return <React.Fragment>{this.renderComponents()}</React.Fragment>;
    }

    public componentDidMount(): void {
        const initMessage: ViewerMessage = {
            target: ViewerMessageTarget.viewer,
            type: ViewerMessageType.initializeComponent,
        };

        if (window) {
            window.postMessage(JSON.stringify(initMessage), "*");
        }
    }

    private renderComponents(): React.ReactNode {
        if (!this.state.componentData) {
            return null;
        }

        return this.state.componentData.map(
            (componentDataItem: ComponentData, index: number) => {
                const mappedComponent: any = this.props.components.find(
                    (component: ChildOptionItem) => {
                        return componentDataItem.id === component.schema.id;
                    }
                );

                return (
                    <mappedComponent.component
                        key={`${mappedComponent.schema.id}${index}`}
                        {...mapDataToComponent(
                            mappedComponent.schema,
                            componentDataItem.props,
                            this.props.components
                        )}
                    />
                );
            }
        );
    }

    private handleMessage = (e: MessageEvent): void => {
        const message: ViewerMessage =
            typeof e.data === "string" ? JSON.parse(e.data) : undefined;

        if (message && message.target === ViewerMessageTarget.viewerContent) {
            switch (message.type) {
                case ViewerMessageType.initializeComponent:
                    this.setState({
                        componentData: message.componentData,
                    });
                    break;
                case ViewerMessageType.updateComponentData:
                    this.setState({
                        componentData: message.componentData,
                    });
                    break;
            }
        }
    };
}
