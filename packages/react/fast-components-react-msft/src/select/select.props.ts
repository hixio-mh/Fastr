import React from "react";
import { Subtract } from "utility-types";
import {
    SelectHandledProps as BaseSelectHandledProps,
    SelectManagedClasses as BaseSelectManagedClasses,
    SelectUnhandledProps as BaseSelectUnhandledProps,
} from "@microsoft/fast-components-react-base";
import {
    ManagedClasses,
    SelectClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-msft";

export type SelectManagedClasses = ManagedClasses<SelectClassNameContract>;
export interface SelectHandledProps
    extends SelectManagedClasses,
        Subtract<BaseSelectHandledProps, BaseSelectManagedClasses> {}

export type SelectUnhandledProps = BaseSelectUnhandledProps;
export type SelectProps = SelectHandledProps & SelectUnhandledProps;
