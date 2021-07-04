import React from "react";
import { FoundationProps } from "@microsoft/fast-components-foundation-react";
import { MetatextClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, {
    ManagedJSSProps,
    withCSSCustomProperties,
} from "@microsoft/fast-jss-manager-react";
import {
    DesignSystem,
    metatextDependencies,
} from "@microsoft/fast-components-styles-msft";
import MetatextStyles from "@microsoft/fast-components-styles-msft/css/metatext.css";
import { Subtract } from "utility-types";
import { MergeManagedClasses } from "../css-modules";
import metatextSchema from "./metatext.schema";
import metatextSchema2 from "./metatext.schema.2";
import MSFTMetatext, {
    MetatextManagedClasses,
    MetatextTag,
    MetatextUnhandledProps,
    MetatextHandledProps as MSFTMetatextHandledProps,
    MetatextProps as MSFTMetatextProps,
} from "./metatext";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Metatext = manageJss()(
    withCSSCustomProperties(...metatextDependencies)(
        MergeManagedClasses(MSFTMetatext, MetatextStyles)
    )
);
type Metatext = InstanceType<typeof Metatext>;

type MetatextHandledProps = Subtract<MSFTMetatextHandledProps, MetatextManagedClasses>;
type MetatextProps = ManagedJSSProps<
    MSFTMetatextProps,
    MetatextClassNameContract,
    DesignSystem
>;

export {
    Metatext,
    MetatextTag,
    MetatextProps,
    MetatextHandledProps,
    metatextSchema,
    metatextSchema2,
    MetatextUnhandledProps,
    MetatextClassNameContract,
};
