import React from "react";
import {
    ManagedClasses,
    RadioClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";

export interface RadioHandledProps extends RadioManagedClasses {
    /**
     * Unique Id
     */
    inputId: string;

    /**
     * The checked state
     */
    checked?: boolean;

    /**
     * The disabled state
     */
    disabled?: boolean;

    /**
     * The name of the input
     */
    name?: string;

    /**
     * The onChange event
     */
    onChange?: RadioOnChange;

    /**
     * The radio content
     */
    children?: React.ReactNode;

    /**
     * The value of the radio
     */
    value?: string;
}

export interface RadioUnhandledProps extends React.HTMLAttributes<HTMLDivElement> {}
export type RadioOnChange = (event?: React.ChangeEvent<HTMLElement>) => void;
export interface RadioManagedClasses extends ManagedClasses<RadioClassNameContract> {}
export type RadioProps = RadioHandledProps & RadioUnhandledProps;
