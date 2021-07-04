import ButtonSchema from "./components/button/button.schema.json";
import * as React from "react";
import { glyphBuildingblocks } from "@microsoft/fast-glyphs-msft";
import Site, {
    FormChildOption,
    SiteCategory,
    SiteCategoryDocumentation,
    SiteCategoryIcon,
    SiteCategoryItem,
    SiteMenu,
    SiteMenuItem,
    SiteTitle,
    SiteTitleBrand,
    Theme,
} from "../src";
import designSystemDefaults, { Direction } from "./design-system";
import Button from "./components/button/button";
import * as ReactDOM from "react-dom";
import Paragraph from "./components/paragraph/paragraph";
import ParagraphSchema from "./components/paragraph/paragraph.schema.json";
import { SiteCategoryProps, Status } from "../src/components/site/category";
import ParagraphDocs from "./components/paragraph/.tmp/documentation";
import ButtonDocs from "./components/button/.tmp/documentation";
import { Framework } from "../src/components/site/dev-tools";

export interface AppState {
    direction: Direction;
    theme: string;
}

const themes: Theme[] = [
    { id: "Foo", displayName: "Foo", background: "#000" },
    { id: "Bar", displayName: "Bar", background: "#FFF" },
    { id: "Rumple", displayName: "Rumple", background: "#333" },
];

export default class App extends React.Component<{}, AppState> {
    private formChildOptions: FormChildOption[] = [
        {
            name: ParagraphSchema.title,
            component: Paragraph,
            schema: ParagraphSchema,
        },
        {
            name: ButtonSchema.title,
            component: Button,
            schema: ButtonSchema,
        },
    ];

    private frameworks: Framework[];

    constructor(props: {}) {
        super(props);

        this.frameworks = [Framework.react, Framework.angular];

        this.state = {
            direction: Direction.ltr,
            theme: "Foo",
        };
    }

    public render(): JSX.Element {
        return (
            <Site
                formChildOptions={this.formChildOptions}
                frameworks={this.frameworks}
                onUpdateDirection={this.handleUpdateDirection}
                themes={themes}
                onUpdateTheme={this.handleUpdateTheme}
                showComponentStatus={true}
                showTransparencyToggle={true}
            >
                {this.renderSiteTitle()}
                {this.renderSiteMenu()}
                {this.renderBuildingBlocks()}
                {this.renderComponents1()}
                {this.renderComponents2()}
            </Site>
        );
    }

    private renderSiteTitle(): JSX.Element {
        return (
            <SiteTitle slot="title">
                <SiteTitleBrand>FAST</SiteTitleBrand> Documentation site
            </SiteTitle>
        );
    }

    private renderComponents2Nested(): JSX.Element {
        const componentObj: any[] = [
            { text: "fee" },
            { text: "fi" },
            { text: "fo" },
            { text: "fum" },
        ];
        const categoryObj: SiteCategoryProps = {
            slot: "category",
            name: "Paragraph Nested",
            schema: ParagraphSchema,
            component: Paragraph,
        };

        return (
            <SiteCategory slot={"category"} name={"Components 2 nested"}>
                {this.renderCategory(componentObj, categoryObj)}
            </SiteCategory>
        );
    }

    private renderComponents2(): JSX.Element {
        const componentObj: any[] = [
            { text: "itsy" },
            { text: "bitsy" },
            { text: "spider" },
        ];
        const categoryObj: SiteCategoryProps = {
            slot: "category",
            name: "Paragraph",
            schema: ParagraphSchema,
            component: Paragraph,
            status: Status.alpha,
        };

        return (
            <SiteCategory slot={"category"} name={"Components 2"}>
                {this.renderCategory(componentObj, categoryObj)}
                {this.renderComponents2Nested()}
            </SiteCategory>
        );
    }

    private renderComponents1(): JSX.Element {
        const categoryBase: Partial<SiteCategoryProps> = {
            slot: "category",
            schema: ButtonSchema,
            component: Button,
            status: Status.released,
        };
        const componentObj1: any[] = [
            { children: "foo" },
            { children: "bar" },
            { children: "bat" },
        ];
        const categoryObj1: Partial<SiteCategoryProps> = {
            ...categoryBase,
            name: "Button",
        };
        const componentObj2: any[] = [{ children: "lorem" }, { children: "ipsum" }];
        const categoryObj2: Partial<SiteCategoryProps> = {
            ...categoryBase,
            name: "Other Button",
        };

        return (
            <SiteCategory slot={"category"} name={"Components"}>
                {this.renderCategory(componentObj1, categoryObj1 as SiteCategoryProps)}
                {this.renderCategory(componentObj2, categoryObj2 as SiteCategoryProps)}
            </SiteCategory>
        );
    }

    private renderCategory(
        componentObj: any[],
        categoryObj: SiteCategoryProps
    ): JSX.Element {
        return (
            <SiteCategory {...categoryObj}>
                {this.renderComponentsFactory(componentObj)}
                {this.renderDocumentation(categoryObj)}
            </SiteCategory>
        );
    }

    private renderDocumentation(categoryObj: SiteCategoryProps): JSX.Element {
        switch (categoryObj.name) {
            case "Paragraph Nested":
            case "Paragraph":
                return (
                    <SiteCategoryDocumentation slot={"canvas-detail-view-documentation"}>
                        <ParagraphDocs />
                    </SiteCategoryDocumentation>
                );
            case "Other Button":
            case "Button":
                return (
                    <SiteCategoryDocumentation slot={"canvas-detail-view-documentation"}>
                        <ButtonDocs />
                    </SiteCategoryDocumentation>
                );
            default:
                return null;
        }
    }

    private renderComponentsFactory(componentData: any[]): JSX.Element[] {
        return componentData.map((componentDataItem: any, index: number) => {
            return (
                <SiteCategoryItem
                    slot={
                        index === 0 ? "canvas-detail-view-example" : "canvas-example-view"
                    }
                    key={index}
                    data={componentDataItem}
                    designSystem={{ ltr: this.state.direction }}
                />
            );
        });
    }

    private renderBuildingBlocks(): JSX.Element {
        return (
            <SiteCategory slot={"category"} name={"Building blocks"}>
                <SiteCategoryIcon slot="category-icon">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: glyphBuildingblocks,
                        }}
                    />
                </SiteCategoryIcon>
            </SiteCategory>
        );
    }

    private renderSiteMenu(): JSX.Element {
        return (
            <SiteMenu slot={"header"}>
                <SiteMenuItem>Hello</SiteMenuItem>
                <SiteMenuItem>World</SiteMenuItem>
            </SiteMenu>
        );
    }

    private handleUpdateDirection = (direction: Direction): void => {
        this.setState({
            direction,
        });
    };

    private handleUpdateTheme = (theme: string): void => {
        this.setState({
            theme,
        });
    };
}
