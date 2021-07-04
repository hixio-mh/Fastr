import { PaletteType, swatchByMode } from "./palette";
import { DesignSystem } from "../../design-system";
import { SwatchResolver } from "./common";

export enum NeutralPaletteLightModeLayers {
    L1 = 0,
    L1Alt = 2,
    L2 = 4,
    L3 = 6,
    L4 = 8,
}

export enum NeutralPaletteDarkModeLayers {
    L1 = 49,
    L1Alt = 49,
    L2 = 51,
    L3 = 53,
    L4 = 55,
}

export const neutralLayerL1: SwatchResolver = swatchByMode(PaletteType.neutral)(
    NeutralPaletteLightModeLayers.L1,
    NeutralPaletteDarkModeLayers.L1
);

export const neutralLayerL1Alt: SwatchResolver = swatchByMode(PaletteType.neutral)(
    NeutralPaletteLightModeLayers.L1Alt,
    NeutralPaletteDarkModeLayers.L1Alt
);

export const neutralLayerL2: SwatchResolver = swatchByMode(PaletteType.neutral)(
    NeutralPaletteLightModeLayers.L2,
    NeutralPaletteDarkModeLayers.L2
);

export const neutralLayerL3: SwatchResolver = swatchByMode(PaletteType.neutral)(
    NeutralPaletteLightModeLayers.L3,
    NeutralPaletteDarkModeLayers.L3
);

export const neutralLayerL4: SwatchResolver = swatchByMode(PaletteType.neutral)(
    NeutralPaletteLightModeLayers.L4,
    NeutralPaletteDarkModeLayers.L4
);
