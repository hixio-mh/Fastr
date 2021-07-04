import React from "react";
import Foundation from "@microsoft/fast-components-foundation-react";
import {
    DataDictionary,
    DataMessageOutgoing,
    htmlResolver,
    InitializeMessageOutgoing,
    mapDataDictionary,
    MessageSystemOutgoing,
    MessageSystemType,
    NavigationMessageOutgoing,
    SchemaDictionary,
} from "@microsoft/fast-tooling";
import {
    WebComponentDefinition,
    WebComponentDefinitionTag,
} from "@microsoft/fast-tooling/dist/esm/data-utilities/web-component";
import { ViewerCustomAction } from "@microsoft/fast-tooling-react";
import {
    fastComponentDefinitions,
    nativeElementDefinitions,
    previewDirection,
    previewTheme,
} from "@microsoft/site-utilities";
import { Direction } from "@microsoft/fast-web-utilities";
import * as FASTComponents from "@microsoft/fast-components";
import { fastDesignSystemDefaults } from "@microsoft/fast-components/src/fast-design-system";
import { createColorPalette } from "@microsoft/fast-components/src/color/create-color-palette";
import { parseColorHexRGB } from "@microsoft/fast-colors";
import { previewAccentColor } from "./creator";
import { dataSetDictionaryId, htmlMapper } from "./utilities";
import { createWrapper } from "./utilities/wrapper";

// Prevent tree shaking
FASTComponents;

export const previewReady: string = "PREVIEW::READY";

export interface PreviewState {
    activeDictionaryId: string;
    dataDictionary: DataDictionary<unknown> | void;
    schemaDictionary: SchemaDictionary;
    theme: FASTComponents.StandardLuminance;
    direction: Direction;
    accentColor: string;
}

class Preview extends Foundation<{}, {}, PreviewState> {
    private ref: React.RefObject<HTMLDivElement>;
    private activeDictionaryItemWrapperRef: React.RefObject<HTMLDivElement>;

    constructor(props: {}) {
        super(props);

        this.ref = React.createRef();
        this.activeDictionaryItemWrapperRef = React.createRef();

        this.state = {
            activeDictionaryId: "",
            dataDictionary: void 0,
            schemaDictionary: {},
            theme: FASTComponents.StandardLuminance.LightMode,
            direction: Direction.ltr,
            accentColor: fastDesignSystemDefaults.accentBaseColor,
        };

        window.addEventListener("message", this.handleMessage);
        document.body.addEventListener("load", this.attachActiveDictionaryIdWrapper, {
            capture: true,
        });
    }

    public render(): React.ReactNode {
        if (this.state.dataDictionary !== undefined) {
            return (
                <React.Fragment>
                    <div className="preview" dir={this.state.direction} ref={this.ref}>
                        <div />
                    </div>
                    <div ref={this.activeDictionaryItemWrapperRef}>
                        <div />
                    </div>
                </React.Fragment>
            );
        }

        return null;
    }

    public componentDidMount(): void {
        window.postMessage(
            {
                type: MessageSystemType.custom,
                action: ViewerCustomAction.call,
                value: previewReady,
            },
            "*"
        );
    }

    public componentWillUnmount(): void {
        document.body.removeEventListener("load", this.attachActiveDictionaryIdWrapper, {
            capture: true,
        });
    }

    /**
     * Sets up the DOM with quick exit cases
     * if another request is performed.
     */
    private attachMappedComponents(): void {
        if (this.state.dataDictionary !== undefined && this.ref.current !== null) {
            const designSystemProvider = document.createElement(
                "fast-design-system-provider"
            );

            designSystemProvider.setAttribute(
                "accent-base-color",
                this.state.accentColor
            );
            const generatedAccentPalette = createColorPalette(
                parseColorHexRGB(this.state.accentColor)
            );
            (designSystemProvider as FASTComponents.FASTDesignSystemProvider).accentPalette = generatedAccentPalette;

            designSystemProvider.setAttribute(
                "background-color",
                FASTComponents.neutralLayerL1(
                    Object.assign({}, fastDesignSystemDefaults, {
                        baseLayerLuminance: this.state.theme,
                    })
                )
            );
            designSystemProvider.setAttribute(
                "style",
                "background: var(--background-color); height: 100vh;"
            );
            designSystemProvider.setAttribute("use-defaults", "");
            designSystemProvider.appendChild(
                mapDataDictionary({
                    dataDictionary: this.state.dataDictionary,
                    schemaDictionary: this.state.schemaDictionary,
                    mapper: htmlMapper({
                        version: 1,
                        tags: Object.entries({
                            ...fastComponentDefinitions,
                            ...nativeElementDefinitions,
                        }).reduce(
                            (
                                previousValue: WebComponentDefinitionTag[],
                                currentValue: [string, WebComponentDefinition]
                            ) => {
                                if (Array.isArray(currentValue[1].tags)) {
                                    return previousValue.concat(currentValue[1].tags);
                                }

                                return previousValue;
                            },
                            []
                        ),
                    }),
                    resolver: htmlResolver,
                })
            );

            if (this.ref.current.lastChild) {
                this.ref.current.replaceChild(
                    designSystemProvider,
                    this.ref.current.lastChild
                );
            }
            this.attachActiveDictionaryIdWrapper();
        }
    }

    private updateDOM(messageData: MessageSystemOutgoing): () => void {
        return this.attachMappedComponents;
    }

    private attachActiveDictionaryIdWrapper = (): void => {
        const activeElement = this.ref.current?.querySelector(
            `[${dataSetDictionaryId}="${this.state.activeDictionaryId}"]`
        );

        if (activeElement) {
            createWrapper(this.activeDictionaryItemWrapperRef, activeElement);
        }
    };

    private handleMessage = (message: MessageEvent): void => {
        if (message.origin === location.origin) {
            let messageData: unknown;

            try {
                messageData = JSON.parse(message.data);
            } catch (e) {
                return;
            }

            if (messageData !== undefined) {
                switch ((messageData as MessageSystemOutgoing).type) {
                    case MessageSystemType.initialize:
                        this.setState(
                            {
                                dataDictionary: (messageData as InitializeMessageOutgoing)
                                    .dataDictionary,
                                schemaDictionary: (messageData as InitializeMessageOutgoing)
                                    .schemaDictionary,
                                activeDictionaryId: (messageData as InitializeMessageOutgoing)
                                    .activeDictionaryId,
                            },
                            this.updateDOM(messageData as MessageSystemOutgoing)
                        );
                        break;
                    case MessageSystemType.data:
                        this.setState(
                            {
                                dataDictionary: (messageData as DataMessageOutgoing)
                                    .dataDictionary,
                            },
                            this.updateDOM(messageData as MessageSystemOutgoing)
                        );
                        break;
                    case MessageSystemType.navigation:
                        this.setState(
                            {
                                activeDictionaryId: (messageData as NavigationMessageOutgoing)
                                    .activeDictionaryId,
                            },
                            this.updateDOM(messageData as MessageSystemOutgoing)
                        );
                        break;
                    case MessageSystemType.custom:
                        if ((messageData as any).id === previewDirection) {
                            this.setState(
                                {
                                    direction: (messageData as any).value,
                                },
                                this.updateDOM(messageData as MessageSystemOutgoing)
                            );
                        } else if ((messageData as any).id === previewAccentColor) {
                            this.setState(
                                {
                                    accentColor: (messageData as any).value,
                                },
                                this.updateDOM(messageData as MessageSystemOutgoing)
                            );
                        } else if ((messageData as any).id === previewTheme) {
                            this.setState(
                                {
                                    theme: (messageData as any).value,
                                },
                                this.updateDOM(messageData as MessageSystemOutgoing)
                            );
                        }
                        break;
                }
            }
        }
    };
}

export default Preview as React.ComponentType;
