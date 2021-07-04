import React from "react";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { Subtract } from "utility-types";
import {
    Canvas as BaseCanvas,
    CanvasHandledProps as BaseCanvasHandledProps,
    CanvasProps as BaseCanvasProps,
    CanvasClassNamesContract,
    CanvasManagedClasses,
    canvasStyleSheet,
    CanvasUnhandledProps,
} from "./canvas";

const Canvas = manageJss(canvasStyleSheet)(BaseCanvas);
type Canvas = typeof Canvas;

type CanvasHandledProps = Subtract<BaseCanvasHandledProps, CanvasManagedClasses>;
type CanvasProps = ManagedJSSProps<BaseCanvasProps, CanvasClassNamesContract, undefined>;

export {
    Canvas,
    CanvasProps,
    CanvasHandledProps,
    CanvasUnhandledProps,
    CanvasClassNamesContract,
};
