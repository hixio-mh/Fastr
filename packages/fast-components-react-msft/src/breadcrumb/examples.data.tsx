import React from "react";
import { Breadcrumb, BreadcrumbHandledProps, breadcrumbSchema } from "./index";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import { hypertextSchema } from "../index";
import Documentation from "./.tmp/documentation";
import ReactHTMLElementSchema from "../../app/components/react-html-element.schema";

const label: any = {
    label: "breadcrumb",
};

function renderSeparator(): (className?: string) => React.ReactNode {
    return (className?: string): React.ReactNode => <div className={className}>/</div>;
}

export default {
    name: "Breadcrumb",
    component: Breadcrumb,
    schema: breadcrumbSchema as any,
    documentation: <Documentation />,
    detailData: {
        ...label,
        separator: {
            id: ReactHTMLElementSchema.id,
            props: {
                children: "/",
            },
        },
        children: [
            {
                id: hypertextSchema.id,
                props: {
                    href: "https://www.microsoft.com/en-us/",
                    children: "breadcrumb item 1",
                },
            },
            {
                id: hypertextSchema.id,
                props: {
                    href: "https://www.microsoft.com/en-us/",
                    children: "breadcrumb item 2",
                },
            },
            {
                id: hypertextSchema.id,
                props: {
                    children: "breadcrumb item 3",
                },
            },
        ],
    },
    data: [
        {
            ...label,
            separator: {
                id: ReactHTMLElementSchema.id,
                props: {
                    children: "/",
                },
            },
            children: [
                {
                    id: hypertextSchema.id,
                    props: {
                        href: "https://www.microsoft.com/en-us/",
                        children: "breadcrumb item 1",
                    },
                },
                {
                    id: hypertextSchema.id,
                    props: {
                        href: "https://www.microsoft.com/en-us/",
                        children: "breadcrumb item 2",
                    },
                },
                {
                    id: hypertextSchema.id,
                    props: {
                        children: "breadcrumb item 3",
                    },
                },
            ],
        },
        {
            ...label,
            separator: {
                id: ReactHTMLElementSchema.id,
                props: {
                    children: "/",
                },
            },
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
