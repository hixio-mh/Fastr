import React from "react";
import { FoundationProps } from "@microsoft/fast-components-foundation-react";
import {
    Image as BaseImage,
    ImageHandledProps as BaseImageHandledProps,
    ImageProps as BaseImageProps,
    ImageClassNameContract,
    ImageManagedClasses,
    ImageSlot,
    ImageUnhandledProps,
} from "@microsoft/fast-components-react-base";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { DesignSystem } from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import ImageStyles from "@microsoft/fast-components-styles-msft/css/image.css";
import { MergeManagedClasses } from "../css-modules";
import imageSchema from "./image.schema";
/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
const Image = manageJss()(MergeManagedClasses(BaseImage, ImageStyles));
type Image = InstanceType<typeof Image>;

type ImageHandledProps = Subtract<BaseImageHandledProps, ImageManagedClasses>;
type ImageProps = ManagedJSSProps<BaseImageProps, ImageClassNameContract, DesignSystem>;

export {
    ImageClassNameContract,
    ImageHandledProps,
    ImageUnhandledProps,
    Image,
    ImageProps,
    imageSchema,
    ImageSlot,
};
