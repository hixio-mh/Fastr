import * as React from "react";
import { Breadcrumb, BreadcrumbHandledProps } from "./index";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import schema from "@microsoft/fast-components-react-base/dist/breadcrumb/breadcrumb.schema.json";
import Documentation from "./.tmp/documentation";
import ReactHTMLElementSchema from "../../app/components/react-html-element.schema.json";

const label: any = {
    label: "breadcrumb",
};

function renderSeparator(): (className?: string) => React.ReactNode {
    return (className?: string): React.ReactNode => <div className={className}>\</div>;
}

export default {
    name: "Breadcrumb",
    component: Breadcrumb,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        ...label,
        separator: renderSeparator(),
        children: [
            {
                id: "hypertext",
                props: {
                    href: "https://www.microsoft.com/en-us/",
                    children: "breadcrumb item 1",
                },
            },
            {
                id: "hypertext",
                props: {
                    href: "https://www.microsoft.com/en-us/",
                    children: "breadcrumb item 2",
                },
            },
            {
                id: "hypertext",
                props: {
                    children: "breadcrumb item 3",
                },
            },
        ],
    },
    data: [
        {
            ...label,
            separator: renderSeparator(),
            children: [
                {
                    id: "hypertext",
                    props: {
                        href: "https://www.microsoft.com/en-us/",
                        children: "breadcrumb item 1",
                    },
                },
                {
                    id: "hypertext",
                    props: {
                        href: "https://www.microsoft.com/en-us/",
                        children: "breadcrumb item 2",
                    },
                },
                {
                    id: "hypertext",
                    props: {
                        children: "breadcrumb item 3",
                    },
                },
            ],
        },
        {
            ...label,
            separator: renderSeparator(),
            children: [
                {
                    id: ReactHTMLElementSchema.id,
                    props: {
                        tag: "a",
                        children: "breadcrumb item 1",
                    },
                },
                {
                    id: ReactHTMLElementSchema.id,
                    props: {
                        tag: "a",
                        children: "breadcrumb item 2",
                    },
                },
                {
                    id: ReactHTMLElementSchema.id,
                    props: {
                        tag: "a",
                        children: "breadcrumb item 3",
                    },
                },
            ],
        },
        {
            ...label,
            children: [
                {
                    id: ReactHTMLElementSchema.id,
                    props: {
                        children: "breadcrumb item 1",
                    },
                },
                {
                    id: ReactHTMLElementSchema.id,
                    props: {
                        children: "breadcrumb item 2",
                    },
                },
                {
                    id: ReactHTMLElementSchema.id,
                    props: {
                        children: "breadcrumb item 3",
                    },
                },
            ],
        },
    ],
} as ComponentFactoryExample<BreadcrumbHandledProps>;
