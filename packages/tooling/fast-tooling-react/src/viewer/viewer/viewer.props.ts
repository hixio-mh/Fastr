import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { MessageSystem } from "@microsoft/fast-tooling";
import { ViewerClassNameContract } from "./viewer.class-name-contract";

export enum ResizeHandleLocation {
    left,
    right,
    bottom,
    bottomLeft,
    bottomRight,
}

export type ViewerManagedClasses = ManagedClasses<ViewerClassNameContract>;
export type ViewerUnhandledProps = React.AllHTMLAttributes<HTMLElement>;
export interface ViewerHandledProps extends ViewerManagedClasses {
    /**
     * The src route for the viewer iframe
     */
    iframeSrc: string;

    /**
     * The responsive, resizable functionality for the viewer
     */
    responsive?: boolean;

    /**
     * The height of the viewer
     */
    height?: number;

    /**
     * The width of the viewer
     */
    width?: number;

    /**
     * A callback for when height should update
     */
    onUpdateHeight?: (height: number) => void;

    /**
     * A callback for when width should update
     */
    onUpdateWidth?: (width: number) => void;

    /**
     * The message system
     * used for sending and receiving data to the message system
     */
    messageSystem: MessageSystem;
}

export type ViewerProps = ViewerUnhandledProps & ViewerHandledProps;
