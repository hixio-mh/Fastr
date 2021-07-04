import React from "react";
import { Card } from "./index";
import { CardHandledProps, CardProps, CardTag, CardUnhandledProps } from "./index";
import schema from "./card.schema.json";
import ImageSchema from "../image/image.schema.json";
import HeadingSchema from "../heading/heading.schema.json";
import { HeadingSize, HeadingTag } from "../heading";
import Documentation from "./.tmp/documentation";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import { ManagedClasses } from "@microsoft/fast-jss-manager-react";

export default {
    name: "Card",
    component: Card,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        children: [
            {
                id: ImageSchema.id,
                props: {
                    src: "https://placehold.it/300x300/414141",
                    alt: "placeholder image",
                },
            },
        ],
    },
    data: [
        {
            tag: CardTag.section,
        },
        {
            tag: CardTag.article,
            children: [
                {
                    id: HeadingSchema.id,
                    props: {
                        tag: HeadingTag.h3,
                        level: HeadingSize._4,
                        children: "Example children",
                    },
                },
                {
                    id: ImageSchema.id,
                    props: {
                        src: "https://placehold.it/300x300/414141",
                        alt: "placeholder image",
                    },
                },
            ],
        },
    ],
} as ComponentFactoryExample<CardProps>;
