/* tslint:disable:jsx-no-lambda */
/* tslint:disable:no-empty */
import { Canvas, Container, Row } from "@microsoft/fast-layouts-react";
import {
    DesignSystem,
    neutralLayerCard,
    neutralLayerCardContainer,
    neutralLayerFloating,
    neutralLayerL1,
    neutralLayerL1Alt,
    neutralLayerL2,
    neutralLayerL3,
    neutralLayerL4,
    palette,
    PaletteType,
} from "@microsoft/fast-components-styles-msft";
import { DesignSystemProvider } from "@microsoft/fast-jss-manager-react";
import { ColorsDesignSystem } from "./design-system";
import { Gradient } from "./gradient";
import ColorBlocks from "./color-blocks";
import { ControlPane } from "./control-pane";
import React from "react";
import { AppState } from "./state";
import { connect } from "react-redux";
import {
    Background,
    DarkModeBackgrounds,
    LightModeBackgrounds,
} from "@microsoft/fast-components-react-msft";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
    ColorRecipe,
    Swatch,
} from "@microsoft/fast-components-styles-msft/dist/utilities/color/common";

interface AppProps {
    designSystem: ColorsDesignSystem;
    neutralBaseColor: Swatch;
    accentBaseColor: Swatch;
    showOnlyRecommendedBackgrounds: boolean;
}

class App extends React.Component<AppProps, {}> {
    private colorBlockScrollerRef: React.RefObject<FixedSizeList> = React.createRef<
        FixedSizeList
    >();

    private containerStyleOverrides: any = {
        container: {
            width: "100%",
            height: "100%",
        },
    };

    private backgroundRecipes: Array<[ColorRecipe<string>, string]> = [
        [neutralLayerFloating, "neutralLayerFloating"],
        [neutralLayerCard, "neutralLayerCard"],
        [neutralLayerCardContainer, "neutralLayerCardContainer"],
        [neutralLayerL1, "neutralLayerL1"],
        [neutralLayerL2, "neutralLayerL2"],
        [neutralLayerL3, "neutralLlayerL3"],
        [neutralLayerL4, "neutralLayerL4"],
    ];

    public render(): React.ReactNode {
        return (
            <DesignSystemProvider designSystem={this.props.designSystem}>
                <Container>
                    <Row fill={true}>
                        <Canvas>
                            <Container jssStyleSheet={this.containerStyleOverrides}>
                                <Row height={20} minHeight={20}>
                                    <Gradient
                                        colors={palette(PaletteType.neutral)(
                                            this.props.designSystem
                                        )}
                                        markedColor={this.props.neutralBaseColor}
                                        createAnchors={true}
                                        scrollToItem={this.handleGradientScroll}
                                    />
                                </Row>
                                <Row height={20} minHeight={20}>
                                    <Gradient
                                        colors={palette(PaletteType.accent)(
                                            this.props.designSystem
                                        )}
                                        markedColor={this.props.accentBaseColor}
                                        createAnchors={false}
                                    />
                                </Row>
                                <Row fill={true}>
                                    <AutoSizer
                                        onResize={
                                            /* this lambda is intentional - it forces the pure component to re-render */ (): void => {}
                                        }
                                    >
                                        {this.renderColorBlockList}
                                    </AutoSizer>
                                </Row>
                            </Container>
                        </Canvas>
                        <Background value={DarkModeBackgrounds.L4}>
                            <ControlPane />
                        </Background>
                    </Row>
                </Container>
            </DesignSystemProvider>
        );
    }

    private handleGradientScroll = (index: number, align: string): void => {
        if (this.colorBlockScrollerRef.current !== null) {
            this.colorBlockScrollerRef.current.scrollToItem(index, align);
        }
    };

    private renderColorBlockList = (props: any): JSX.Element => {
        const backgrounds: Array<{ color: string; title?: string }> = this.backgrounds();

        return (
            <FixedSizeList
                width={props.width}
                height={props.height}
                itemSize={400}
                layout={"horizontal"}
                itemCount={backgrounds.length}
                itemKey={(index: number): string => backgrounds[index].color}
                ref={this.colorBlockScrollerRef}
                itemData={backgrounds}
            >
                {this.renderColorBlock}
            </FixedSizeList>
        );
    };

    private renderColorBlock = (props: any): JSX.Element => {
        const color: string = props.data[props.index].color;
        const index: number = this.props.designSystem.neutralPalette.indexOf(color);

        return (
            <div style={props.style} key={color}>
                <Background value={color} style={{ minHeight: "100%" }}>
                    <ColorBlocks
                        index={index}
                        backgroundColor={color}
                        title={props.data[props.index].title}
                    />
                </Background>
            </div>
        );
    };

    private backgrounds(): Array<{ color: string; title?: string }> {
        const neutralPalette: string[] = this.props.designSystem.neutralPalette;
        const neutralLayers: Array<{
            color: string;
            title: string;
        }> = this.lightModeLayers.concat(this.darkModeLayers);

        return this.props.showOnlyRecommendedBackgrounds
            ? neutralLayers
            : neutralPalette.map((color: string): { color: string; title?: string } => {
                  const neutralLayerIndex: number = neutralLayers.findIndex(
                      (config: { color: string; title: string }): boolean =>
                          config.color === color
                  );

                  return {
                      color,
                      title:
                          neutralLayerIndex !== -1
                              ? neutralLayers[neutralLayerIndex].title
                              : undefined,
                  };
              });
    }

    private resolveRecipes = (color: string): Array<{ color: string; title: string }> => {
        return this.backgroundRecipes
            .map((conf: [ColorRecipe<string>, string]): {
                color: string;
                title: string;
            } => ({
                color: conf[0]((): string => color)(this.props.designSystem),
                title: conf[1],
            }))
            .reduce(
                (
                    accum: Array<{ color: string; title: string }>,
                    value: { color: string; title: string }
                ): Array<{ color: string; title: string }> => {
                    const colorIndex: number = accum.findIndex(
                        (config: { color: string; title: string }): boolean =>
                            config.color === value.color
                    );

                    return colorIndex === -1
                        ? accum.concat(value)
                        : accum.map(
                              (
                                  config: { color: string; title: string },
                                  index: number
                              ): { color: string; title: string } =>
                                  index === colorIndex
                                      ? {
                                            color: value.color,
                                            title: value.title.concat(", ", config.title),
                                        }
                                      : config
                          );
                },
                []
            );
    };

    private get lightModeLayers(): Array<{ color: string; title: string }> {
        return this.resolveRecipes(this.props.designSystem.neutralPalette[0]);
    }

    private get darkModeLayers(): Array<{ color: string; title: string }> {
        const neutralPalette: string[] = this.props.designSystem.neutralPalette;
        return this.resolveRecipes(neutralPalette[neutralPalette.length - 1]);
    }
}

function mapStateToProps(state: AppState): Partial<AppProps> {
    return {
        designSystem: state.designSystem,
        neutralBaseColor: state.neutralBaseColor,
        accentBaseColor: state.accentBaseColor,
        showOnlyRecommendedBackgrounds: state.showOnlyRecommendedBackgrounds,
    };
}

export default connect(mapStateToProps)(App);
