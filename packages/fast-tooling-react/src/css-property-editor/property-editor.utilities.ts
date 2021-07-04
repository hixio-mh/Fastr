import { CSSProperties, CSSPropertiesConfig } from "./property-editor.props";
import { spinalCase } from "@microsoft/fast-web-utilities";

const monospaceFontWidthMultiplier: number = 6.6;

export function getCSSPropertyConfig(data: CSSProperties): CSSPropertiesConfig {
    const dataConfig: CSSPropertiesConfig = {};

    if (!data) {
        return dataConfig;
    }

    Object.keys(data).map(
        (dataKey: string): void => {
            dataConfig[dataKey] = {
                value: data[dataKey],
                keyWidth: monospaceFontWidthMultiplier * spinalCase(dataKey).length,
                valueWidth: monospaceFontWidthMultiplier * data[dataKey].length,
            };
        }
    );

    return dataConfig;
}
