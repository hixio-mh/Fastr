import { memoize, uniqueId } from "lodash-es";
import {
    ActionTrigger,
    Background,
    Badge,
    Heading,
    HeadingSize,
} from "@microsoft/fast-components-react-msft";
import { ColorRGBA64, parseColor } from "@microsoft/fast-colors";
import {
    createColorPalette,
    neutralLayerL1,
    neutralLayerL2,
    neutralLayerL3,
    StandardLuminance,
} from "@microsoft/fast-components-styles-msft";
import {
    Canvas,
    Container,
    Pane,
    PaneResizeDirection,
    Row,
} from "@microsoft/fast-layouts-react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { Direction } from "@microsoft/fast-web-utilities";
import React from "react";
import ReactDOM from "react-dom";
import {
    AjvMapper,
    MessageSystem,
    MessageSystemDataTypeAction,
    MessageSystemNavigationTypeAction,
    MessageSystemType,
    SchemaDictionary,
} from "@microsoft/fast-tooling";
import {
    ControlConfig,
    ControlType,
    defaultDevices,
    Device,
    Display,
    LinkedDataControl,
    ModularForm,
    ModularNavigation,
    ModularViewer,
    SelectDevice,
    StandardControlPlugin,
} from "@microsoft/fast-tooling-react";
import {
    ControlContext,
    ControlOnChangeConfig,
} from "@microsoft/fast-tooling-react/dist/form/templates/types";
import FASTMessageSystemWorker from "@microsoft/fast-tooling/dist/message-system.min.js";
import * as schemas from "./msft-components";
import {
    CreatorHandledProps,
    CreatorProps,
    CreatorState,
    ProjectFile,
    ProjectFileView,
} from "./creator.props";
import { exampleData, LinkedDataStack } from "./msft-components/example-data";
import { dotDotDotGlyph } from "./icons/dot-dot-dot";
import {
    AccentColorPicker,
    Dimension,
    DirectionSwitch,
    ProjectFileTransfer,
    ThemeSelector,
} from "./components";
import { selectDeviceOverrideStyles } from "./utilities/style-overrides";
import designSystemSchema from "./msft-component-helpers/design-system.schema";
import { previewReady } from "./preview";

const fastMessageSystemWorker = new FASTMessageSystemWorker();
let ajvMapper: AjvMapper;
let fastMessageSystem: MessageSystem;
let componentLinkedDataId: string = "root";
let componentNavigationConfigId: string = "";
const schemaDictionary: SchemaDictionary = {
    ...Object.entries(schemas).reduce(
        (dictionary: any, [key, value]: [string, any]): any => {
            dictionary[value.id] = value;
            return dictionary;
        },
        {}
    ),
    [designSystemSchema.id]: designSystemSchema,
};

export const designSystemLinkedDataId: string = "designSystem";

class Creator extends Foundation<CreatorHandledProps, {}, CreatorState> {
    public static displayName: string = "Creator";

    private viewerContainerRef: React.RefObject<HTMLDivElement> = React.createRef();

    private viewerContentAreaPadding: number = 20;

    private devices: Device[];

    private handleDimensionChange: (
        cb: (value: number) => void
    ) => React.ChangeEventHandler<HTMLInputElement> = memoize(
        (cb: (value: number) => void): React.ChangeEventHandler<HTMLInputElement> => {
            return (e: React.ChangeEvent<HTMLInputElement>): void => {
                const value: number = parseInt(e.target.value, 10);

                if (!isNaN(value)) {
                    cb(value);
                }
            };
        }
    );

    constructor(props: CreatorProps) {
        super(props);

        const initialViewId: string = uniqueId("view");

        this.devices = this.getDevices();

        const initialView: ProjectFileView = {
            dataDictionary: [
                {
                    [componentLinkedDataId]: {
                        schemaId: schemas.cardSchema2.id,
                        data: {},
                    },
                    [designSystemLinkedDataId]: {
                        schemaId: designSystemSchema.id,
                        data: {},
                    },
                },
                componentLinkedDataId,
            ],
        };

        this.state = {
            xCoord: 0,
            yCoord: 0,
            width: 0,
            height: 0,
            deviceId: this.devices[0].id,
            activeView: initialViewId,
            theme: StandardLuminance.LightMode,
            direction: Direction.ltr,
            accentColor: "#0078D4",
            views: {
                [initialViewId]: initialView,
            },
            activeDictionaryId: componentLinkedDataId,
            linkedDataStack: null,
            linkedDataIdsForStack: null,
        };

        if ((window as any).Worker) {
            fastMessageSystem = new MessageSystem({
                webWorker: fastMessageSystemWorker,
                dataDictionary: initialView.dataDictionary,
                schemaDictionary,
            });
            ajvMapper = new AjvMapper({
                messageSystem: fastMessageSystem,
            });
            fastMessageSystem.add({ onMessage: this.handleMessageSystem });
        }
    }

    public render(): React.ReactNode {
        return (
            <Background value={neutralLayerL1}>
                <Container>
                    <Row style={{ flex: "1" }}>
                        <Pane resizable={true} resizeFrom={PaneResizeDirection.east}>
                            <Background
                                value={neutralLayerL3}
                                drawBackground={true}
                                style={{
                                    display: "flex",
                                    height: "32px",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0 8px",
                                }}
                            >
                                <Heading size={HeadingSize._6}>FAST Creator</Heading>
                                <Badge>ALPHA</Badge>
                            </Background>
                            <ModularNavigation messageSystem={fastMessageSystem} />
                            <ProjectFileTransfer
                                projectFile={this.state}
                                onUpdateProjectFile={this.handleUpdateProjectFile}
                            />
                        </Pane>
                        <Canvas>
                            <Row fill={true}>
                                <Background
                                    value={neutralLayerL2}
                                    drawBackground={true}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "0 8px",
                                    }}
                                >
                                    <SelectDevice
                                        devices={this.devices}
                                        activeDeviceId={this.state.deviceId}
                                        onUpdateDevice={this.handleUpdateDevice}
                                        jssStyleSheet={selectDeviceOverrideStyles}
                                    />
                                    <Dimension
                                        width={this.state.width}
                                        height={this.state.height}
                                        onUpdateWidth={this.handleUpdateWidth}
                                        onUpdateHeight={this.handleUpdateHeight}
                                        onUpdateOrientation={this.handleUpdateOrientation}
                                        onDimensionChange={this.handleDimensionChange}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            marginLeft: "auto",
                                        }}
                                    >
                                        <ThemeSelector
                                            id={"theme-selector"}
                                            theme={this.state.theme}
                                            onUpdateTheme={this.handleUpdateTheme}
                                        />
                                        <DirectionSwitch
                                            id={"direction-switch"}
                                            direction={this.state.direction}
                                            onUpdateDirection={this.handleUpdateDirection}
                                        />
                                        <AccentColorPicker
                                            id={"accent-color-picker"}
                                            accentBaseColor={this.state.accentColor}
                                            onAccentColorPickerChange={
                                                this.handleAccentColorPickerChange
                                            }
                                        />
                                        <ActionTrigger
                                            glyph={dotDotDotGlyph}
                                            style={{
                                                marginLeft: 4,
                                                width: "24px",
                                                padding: "0",
                                            }}
                                            onClick={this.handleShowDesignSystemEditor}
                                        />
                                    </div>
                                </Background>
                            </Row>
                            <Row fill={true} style={{ height: "100%" }}>
                                <div
                                    ref={this.viewerContainerRef}
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <ModularViewer
                                        iframeSrc={"/preview"}
                                        messageSystem={fastMessageSystem}
                                        width={this.state.width}
                                        height={this.state.height}
                                        onUpdateHeight={this.handleUpdateHeight}
                                        onUpdateWidth={this.handleUpdateWidth}
                                        responsive={true}
                                    />
                                </div>
                            </Row>
                        </Canvas>
                        <Pane>
                            <ModularForm
                                messageSystem={fastMessageSystem}
                                controls={[
                                    new StandardControlPlugin({
                                        type: ControlType.linkedData,
                                        context: ControlContext.fill,
                                        control: (
                                            config: ControlConfig
                                        ): React.ReactNode => {
                                            return (
                                                <LinkedDataControl
                                                    {...config}
                                                    onChange={this.handleAddLinkedData(
                                                        config.onChange
                                                    )}
                                                />
                                            );
                                        },
                                    }),
                                ]}
                            />
                        </Pane>
                    </Row>
                </Container>
            </Background>
        );
    }

    private handleAddLinkedData = (
        onChange: (e: ControlOnChangeConfig) => void
    ): ((e: ControlOnChangeConfig) => void) => {
        return (e: ControlOnChangeConfig): void => {
            onChange({
                ...e,
                value: [
                    {
                        ...e.value[0],
                        data: exampleData[e.value[0].schemaId].props,
                    },
                ],
            });

            if (exampleData[e.value[0].schemaId].linkedData) {
                this.setState({
                    linkedDataStack: [
                        exampleData[e.value[0].schemaId].linkedData as LinkedDataStack,
                    ],
                });
            }
        };
    };

    private handleMessageSystem = (e: MessageEvent): void => {
        const updatedState: Partial<CreatorState> = {};

        if (e.data.type === MessageSystemType.data) {
            updatedState.views = {
                ...this.state.views,
                [this.state.activeView]: {
                    dataDictionary: e.data.dataDictionary,
                },
            };
        }

        // When linked data is added, check to see if other linked data
        // should be automatically added, for example a text linked data
        // if Heading has been added. This is done via the private array linkedDataStack
        if (
            e.data.type === MessageSystemType.data &&
            e.data.action === MessageSystemDataTypeAction.addLinkedData &&
            this.state.linkedDataStack !== null
        ) {
            updatedState.linkedDataIdsForStack = e.data.linkedDataIds;
        }

        if (
            e.data.type === MessageSystemType.navigation &&
            e.data.activeDictionaryId !== designSystemLinkedDataId
        ) {
            componentLinkedDataId = e.data.activeDictionaryId;
            componentNavigationConfigId = e.data.activeNavigationConfigId;
        }

        if (e.data.type === MessageSystemType.custom && e.data.action === previewReady) {
            fastMessageSystem.postMessage({
                type: MessageSystemType.initialize,
                data: this.state.views[this.state.activeView].dataDictionary,
                schemaDictionary,
            });
        }

        this.setState(updatedState as CreatorState);
    };

    private handleUpdateProjectFile = (projectFile: ProjectFile): void => {
        this.setState(projectFile, () =>
            fastMessageSystem.postMessage({
                type: MessageSystemType.initialize,
                data: projectFile.views[projectFile.activeView].dataDictionary,
                schemaDictionary,
            })
        );
    };

    public componentDidMount(): void {
        this.setViewerToFullSize();
    }

    public componentDidUpdate(): void {
        if (
            this.state.linkedDataStack !== null &&
            this.state.linkedDataIdsForStack !== null
        ) {
            for (
                let i = 0, linkedDataLength = this.state.linkedDataStack.length;
                i < linkedDataLength;
                i++
            ) {
                fastMessageSystem.postMessage({
                    type: MessageSystemType.data,
                    action: MessageSystemDataTypeAction.addLinkedData,
                    dictionaryId: this.state.linkedDataIdsForStack[i].id,
                    dataLocation: this.state.linkedDataStack[i].dataLocation,
                    linkedData: [
                        {
                            ...this.state.linkedDataStack[i].data[0],
                            parent: {
                                id: this.state.linkedDataIdsForStack[i].id,
                                dataLocation: this.state.linkedDataStack[i].dataLocation,
                            },
                        },
                    ],
                });
            }

            this.setState({
                linkedDataStack: null,
                linkedDataIdsForStack: null,
            });
        }
    }

    private handleShowDesignSystemEditor = (): void => {
        const isDesignSystem: boolean =
            this.state.activeDictionaryId === designSystemLinkedDataId;
        const activeDictionaryId: string = isDesignSystem
            ? componentLinkedDataId
            : designSystemLinkedDataId;

        this.setState({
            activeDictionaryId,
        });

        fastMessageSystem.postMessage({
            type: MessageSystemType.navigation,
            action: MessageSystemNavigationTypeAction.update,
            activeDictionaryId,
            activeNavigationConfigId: isDesignSystem ? "" : componentNavigationConfigId,
        });
    };

    private setViewerToFullSize(): void {
        const viewerContainer: HTMLDivElement | null = this.viewerContainerRef.current;

        if (viewerContainer) {
            /* eslint-disable-next-line react/no-find-dom-node */
            const viewerNode: Element | Text | null = ReactDOM.findDOMNode(
                viewerContainer
            );

            if (viewerNode instanceof Element) {
                const height: number =
                    viewerNode.clientHeight - this.viewerContentAreaPadding * 2;
                const width: number =
                    viewerNode.clientWidth - this.viewerContentAreaPadding * 2;
                this.setState({
                    width,
                    height: height - 24, // 24 is height of view label
                });
            }
        }
    }

    private getDevices(): Device[] {
        return defaultDevices.concat({
            id: "desktop",
            displayName: "Desktop (1920x1080)",
            display: Display.fixed,
            width: 1920,
            height: 1080,
        });
    }

    private getDeviceById(id: string): Device | void {
        return this.devices.find((device: Device): boolean => {
            return device.id === id;
        });
    }

    private handleUpdateDevice = (deviceId: string): void => {
        const device: Device | void = this.getDeviceById(deviceId);
        let height: number = this.state.height;
        let width: number = this.state.width;

        if (device) {
            height =
                device.display === Display.responsive
                    ? this.state.height
                    : (device.height as number);
            width =
                device.display === Display.responsive
                    ? this.state.width
                    : (device.width as number);
        }

        this.setState({
            deviceId,
            height,
            width,
        });
    };

    private handleUpdateOrientation = (): void => {
        this.setState({
            width: this.state.height,
            height: this.state.width,
        });
    };

    private setResponsiveDeviceId(): void {
        const activeDevice: Device | void = this.getDeviceById(this.state.deviceId);

        if (activeDevice && activeDevice.display !== Display.responsive) {
            this.setState({
                deviceId: Display.responsive,
            });
        }
    }

    private handleUpdateHeight = (height: number): void => {
        this.setResponsiveDeviceId();
        this.setState({
            height,
        });
    };

    private handleUpdateWidth = (width: number): void => {
        this.setResponsiveDeviceId();
        this.setState({
            width,
        });
    };

    private handleUpdateDirection = (): void => {
        const updatedDirection: Direction =
            this.state.direction === Direction.ltr ? Direction.rtl : Direction.ltr;
        this.setState({
            direction: updatedDirection,
        });

        fastMessageSystem.postMessage({
            type: MessageSystemType.data,
            action: MessageSystemDataTypeAction.update,
            dictionaryId: designSystemLinkedDataId,
            dataLocation: "direction",
            data: updatedDirection,
        });
    };

    private handleUpdateTheme = (): void => {
        const updatedTheme: StandardLuminance =
            this.state.theme === StandardLuminance.LightMode
                ? StandardLuminance.DarkMode
                : StandardLuminance.LightMode;

        this.setState({
            theme: updatedTheme,
        });

        fastMessageSystem.postMessage({
            type: MessageSystemType.data,
            action: MessageSystemDataTypeAction.update,
            dictionaryId: designSystemLinkedDataId,
            dataLocation: "baseLayerLuminance",
            data: updatedTheme,
        });
    };

    /**
     * Event handler for all color input changes
     */
    private handleAccentColorPickerChange = (
        e: React.FormEvent<HTMLInputElement>
    ): void => {
        const value: string = e.currentTarget.value;

        this.setState({
            accentColor: value,
        });

        const parsed: ColorRGBA64 | null = parseColor(value);
        const colorPalette = parsed !== null ? createColorPalette(parsed) : null;

        fastMessageSystem.postMessage({
            type: MessageSystemType.data,
            action: MessageSystemDataTypeAction.update,
            dictionaryId: designSystemLinkedDataId,
            dataLocation: "accentColor",
            data: value,
        });

        fastMessageSystem.postMessage({
            type: MessageSystemType.data,
            action: MessageSystemDataTypeAction.update,
            dictionaryId: designSystemLinkedDataId,
            dataLocation: "accentPalette",
            data: colorPalette,
        });
    };
}

export default Creator;
