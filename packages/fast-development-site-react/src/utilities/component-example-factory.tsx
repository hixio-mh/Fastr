import React from "react";
import { ComponentViewSlot, SiteCategoryItem } from "../";
import { DesignSystemProvider } from "@microsoft/fast-jss-manager-react";

export default function componentExampleFactory<T>(
    examples: any,
    componentExample: string,
    designSystem?: T
): JSX.Element[] {
    return examples[componentExample].data.map(
        (componentExampleData: any, index: number) => {
            return (
                <SiteCategoryItem
                    key={index}
                    slot={ComponentViewSlot.example}
                    data={componentExampleData}
                    designSystem={designSystem ? designSystem : void 0}
                />
            );
        }
    );
}
