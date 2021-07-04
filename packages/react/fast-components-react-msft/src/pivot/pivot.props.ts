import React from "react";
import { Subtract } from "utility-types";
import {
    TabsHandledProps as BaseTabsHandledProps,
    TabsManagedClasses as BaseTabsManagedClasses,
    TabsUnhandledProps as BaseTabsUnhandledProps,
    TabsItem,
} from "@microsoft/fast-components-react-base";
import {
    ManagedClasses,
    PivotClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-msft";

export type PivotManagedClasses = ManagedClasses<PivotClassNameContract>;
export interface PivotHandledProps
    extends PivotManagedClasses,
        Subtract<BaseTabsHandledProps, BaseTabsManagedClasses> {
    /**
     * Items that will make up the pivot and pivot content
     */
    items: TabsItem[];
}

export type PivotUnhandledProps = BaseTabsUnhandledProps;
export type PivotProps = PivotHandledProps & PivotUnhandledProps;
