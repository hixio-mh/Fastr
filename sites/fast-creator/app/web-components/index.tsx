/** @jsx h */ /* Note: Set the JSX pragma to the wrapped version of createElement */

import React from "react";
import {
    FASTButton,
    FASTSelect,
    FASTSlider,
    FASTSliderLabel,
    FASTTab,
    FASTTabPanel,
    FASTTabs,
} from "@microsoft/fast-components";
import { FASTColorPicker } from "@microsoft/fast-tooling/dist/esm/web-components";
import { componentCategories, downChevron, upChevron } from "@microsoft/site-utilities";
import { MessageSystem } from "@microsoft/fast-tooling";
import {
    ControlConfig,
    ModularForm,
    StandardControlPlugin,
} from "@microsoft/fast-tooling-react";

import h from "@microsoft/site-utilities/dist/web-components/pragma";
import CSSControl from "@microsoft/fast-tooling-react/dist/form/custom-controls/control.css";
import { CSSPropertiesDictionary } from "@microsoft/fast-tooling/dist/esm/data-utilities/mapping.mdn-data";
import { ControlContext } from "@microsoft/fast-tooling-react/dist/form/templates/types";
import { XOR } from "@microsoft/fast-tooling/dist/dts/data-utilities/type.utilities";
import { FormId } from "../creator.props";
import { properties as CSSProperties } from "../css-data";
import { defaultDevices, Device } from "./devices";

/**
 * Ensure tree-shaking doesn't remove these components from the bundle
 */
FASTButton;
FASTColorPicker;
FASTSlider;
FASTSliderLabel;
FASTTab;
FASTTabs;
FASTTabPanel;

export function renderDevToolToggle(selected: boolean, onToggleCallback: () => void) {
    return (
        <fast-button
            events={{
                click: (e: React.ChangeEvent) => {
                    onToggleCallback();
                },
            }}
            class={"dev-tools-trigger"}
        >
            {selected ? downChevron() : upChevron()}
        </fast-button>
    );
}

function renderDeviceOptions(): React.ReactNode {
    return defaultDevices.map((deviceOption: Device) => {
        return (
            <fast-option
                key={deviceOption.id}
                value={deviceOption.id}
                style={{ height: "auto" }}
            >
                {deviceOption.displayName}
            </fast-option>
        );
    });
}

export function renderDeviceSelect(
    selectedDeviceId: string,
    onChangeCallback: (deviceId: string) => void,
    disable: boolean
): React.ReactNode {
    return (
        <fast-select
            selectedIndex={selectedDeviceId}
            events={{
                change: (e: React.ChangeEvent): void => {
                    onChangeCallback((e.target as FASTSelect).value);
                },
            }}
            disabled={disable ? true : null}
        >
            {renderDeviceOptions()}
        </fast-select>
    );
}

function getColorPickerControl(
    id: string,
    updateHandler: (updatedData: { [key: string]: unknown }) => void
): StandardControlPlugin {
    return new StandardControlPlugin({
        id,
        context: ControlContext.fill,
        control: (config: ControlConfig): React.ReactNode => {
            return (
                <color-picker
                    value={config.value || config.default}
                    events={{
                        change: (e: React.ChangeEvent<HTMLInputElement>): void => {
                            updateHandler({
                                [config.dataLocation]: e.target.value,
                            });
                        },
                    }}
                ></color-picker>
            );
        },
    });
}

export function getColorPickerControls(
    updateHandler: (updatedData: { [key: string]: unknown }) => void
): StandardControlPlugin[] {
    return [
        getColorPickerControl("background-color", updateHandler),
        getColorPickerControl("accent-base-color", updateHandler),
    ];
}

function getSliderLabels(positions: number[]): React.ReactNode {
    const positionLength = positions.length - 1;

    return positions.map((position: number, index: number) => {
        const displayNumber: XOR<void, number> =
            positions.length > 10 && index !== 0 && index !== positionLength
                ? undefined
                : position;
        return (
            <fast-slider-label key={position} position={position}>
                {displayNumber}
            </fast-slider-label>
        );
    });
}

function getSliderControl(
    id: string,
    updateHandler: (updatedData: { [key: string]: unknown }) => void,
    min: number,
    max: number,
    step: number = 1,
    defaultValue?: number
): StandardControlPlugin {
    return new StandardControlPlugin({
        id,
        context: ControlContext.fill,
        control: (config: ControlConfig): React.ReactNode => {
            const positions: number[] = new Array((max - min) / step + 1)
                .fill(0)
                .map((number: number, index: number): number => {
                    return min + step * index;
                });

            return (
                <fast-slider
                    value={config.value || defaultValue}
                    min={min}
                    max={max}
                    step={step}
                    events={{
                        change: (e: React.ChangeEvent<HTMLInputElement>): void => {
                            updateHandler({
                                [config.dataLocation]: parseFloat(e.target.value),
                            });
                        },
                    }}
                >
                    {getSliderLabels(positions)}
                </fast-slider>
            );
        },
    });
}

export function getSliderControls(
    updateHandler: (updatedData: { [key: string]: unknown }) => void
): StandardControlPlugin[] {
    return [
        getSliderControl("base-layer-luminance", updateHandler, 0, 1, 0.1, 1),
        getSliderControl("density", updateHandler, -2, 2),
        getSliderControl("base-height-multiplier", updateHandler, 5, 15),
        getSliderControl("base-horizontal-spacing-multiplier", updateHandler, 0, 6),
        getSliderControl("corner-radius", updateHandler, 0, 22, 1, 3),
        getSliderControl("outline-width", updateHandler, 0, 12, 1, 1),
        getSliderControl("focus-outline-width", updateHandler, 0, 12, 1, 2),
        getSliderControl("disabled-opacity", updateHandler, 0, 1, 0.1, 0.3),
    ];
}

function getCSSControls(): StandardControlPlugin {
    return new StandardControlPlugin({
        id: "style",
        context: ControlContext.fill,
        control: (config: ControlConfig): React.ReactNode => {
            return (
                <CSSControl
                    css={(CSSProperties as unknown) as CSSPropertiesDictionary}
                    {...config}
                />
            );
        },
    });
}

export function renderFormTabs(
    activeId: any,
    fastMessageSystem: MessageSystem,
    fastDesignMessageSystem: MessageSystem,
    linkedDataControl: StandardControlPlugin,
    handleFormVisibility: (formId: any) => void,
    handleDesignSystemChange: (updatedData: { [key: string]: unknown }) => void
): React.ReactNode {
    const formStyleOverride: string = `
        fast-tab-panel > div { width: 100%; }
    `;

    return (
        <fast-tabs
            activeId={activeId}
            events={{
                change: (e: React.ChangeEvent<HTMLElement>) => {
                    if ((e as any).detail) {
                        handleFormVisibility((e as any).detail.id);
                    }
                },
            }}
        >
            <fast-tab id={FormId.component}>Components</fast-tab>
            <fast-tab id={FormId.designSystem}>Design System</fast-tab>
            <fast-tab-panel id={FormId.component + "Panel"}>
                <style>{formStyleOverride}</style>
                <ModularForm
                    key={FormId.component}
                    messageSystem={fastMessageSystem}
                    controls={[linkedDataControl, getCSSControls()]}
                    categories={componentCategories}
                />
            </fast-tab-panel>
            <fast-tab-panel id={FormId.designSystem + "Panel"}>
                <style>{formStyleOverride}</style>
                <ModularForm
                    key={FormId.designSystem}
                    messageSystem={fastDesignMessageSystem}
                    controls={[
                        linkedDataControl,
                        ...getSliderControls(handleDesignSystemChange),
                        ...getColorPickerControls(handleDesignSystemChange),
                        getCSSControls(),
                    ]}
                    categories={componentCategories}
                />
            </fast-tab-panel>
        </fast-tabs>
    );
}
