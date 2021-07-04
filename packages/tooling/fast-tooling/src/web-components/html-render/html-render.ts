import { customElement, FASTElement, observable } from "@microsoft/fast-element";
import { isHTMLElement } from "@microsoft/fast-web-utilities";
import {
    htmlMapper,
    htmlResolver,
    mapDataDictionary,
    ResolverConfig,
} from "../../data-utilities/mapping";
import {
    WebComponentDefinition,
    WebComponentDefinitionTag,
} from "../../data-utilities/web-component";
import {
    DataDictionary,
    MessageSystem,
    MessageSystemNavigationTypeAction,
    MessageSystemType,
    SchemaDictionary,
} from "../../message-system";
import { ActivityType, HTMLRenderLayer } from "../html-render-layer/html-render-layer";
import { HTMLRenderStyles } from "./html-render.styles";
import { HTMLRenderTemplate } from "./html-render.template";

@customElement({
    name: "fast-tooling-html-render",
    template: HTMLRenderTemplate,
    styles: HTMLRenderStyles,
})
export class HTMLRender extends FASTElement {
    private dataDictionary: DataDictionary<unknown>;

    private schemaDictionary: SchemaDictionary;

    private navigationConfigId: string = "fast-tooling::html-renderer";

    private dataDictionaryAttr: string = "data-datadictionaryid";

    private tabCounter: number = 1;

    private currentElement: HTMLElement;

    private renderLayers: HTMLRenderLayer[] = [];

    @observable
    public markup: HTMLElement;

    @observable
    public markupDefinitions: WebComponentDefinition[] = null;

    @observable
    public layers: HTMLSlotElement;
    private layersChanged(oldValue, newValue): void {
        if (this.$fastController.isConnected) {
            this.renderLayers = [];
            if (this.children.length > 0) {
                Array.from(this.children).forEach((value: HTMLRenderLayer) => {
                    if (this.isHtmlRenderLayer(value)) {
                        value.messageSystem = this.messageSystem;
                        this.renderLayers.push(value);
                    }
                });
            }
        }
    }

    @observable
    public messageSystem: MessageSystem;
    private messageSystemChanged(): void {
        if (this.messageSystem !== undefined) {
            this.tabCounter = 1;
            this.messageSystem.add({ onMessage: this.handleMessageSystem });
            this.renderLayers.forEach((value: HTMLRenderLayer) => {
                value.messageSystem = this.messageSystem;
            });
        }
    }

    // Messaging

    private handleMessageSystem = (e: MessageEvent): void => {
        if (e.data) {
            if (
                e.data.type === MessageSystemType.initialize ||
                e.data.type === MessageSystemType.data
            ) {
                this.dataDictionary = e.data.dataDictionary;
                this.schemaDictionary = e.data.schemaDictionary;
                this.renderMarkup();
            }
            if (
                e.data.type === MessageSystemType.navigation &&
                e.data.activeNavigationConfigId !== this.navigationConfigId
            ) {
                if (e.data.action === MessageSystemNavigationTypeAction.update) {
                    const dataId: string = e.data.activeDictionaryId;
                    const el: HTMLElement = this.shadowRoot.querySelector(
                        "[" + this.dataDictionaryAttr + "=" + dataId + "]"
                    );
                    if (el) {
                        this.currentElement = el;
                        this.updateLayers(ActivityType.click, dataId, el);
                    }
                }
            }
        }
    };

    private updateLayers(
        activityType: ActivityType,
        dictionaryId: string,
        elementRef: HTMLElement
    ) {
        if (this.renderLayers) {
            this.renderLayers.forEach(value => {
                value.elementActivity(activityType, dictionaryId, elementRef);
            });
        }
    }

    /// Mouse Handlers

    public hoverHandler(e: MouseEvent): boolean {
        const el: HTMLElement = e.composedPath()[0] as HTMLElement;
        const dataId = el.getAttribute(this.dataDictionaryAttr);
        if (
            dataId !== null &&
            !(
                this.currentElement &&
                dataId === this.currentElement.getAttribute(this.dataDictionaryAttr)
            )
        ) {
            this.updateLayers(ActivityType.hover, dataId, el);
        }
        return false;
    }

    public blurHandler(e: MouseEvent): boolean {
        this.updateLayers(ActivityType.blur, "", null);
        return false;
    }

    private selectElement(el: HTMLElement, dataId: string) {
        this.messageSystem.postMessage({
            type: MessageSystemType.navigation,
            action: MessageSystemNavigationTypeAction.update,
            activeDictionaryId: dataId,
            activeNavigationConfigId: this.navigationConfigId,
        });
        this.currentElement = el;
        this.updateLayers(ActivityType.click, dataId, el);
    }

    private clearElement() {
        this.messageSystem.postMessage({
            type: MessageSystemType.navigation,
            action: MessageSystemNavigationTypeAction.update,
            activeDictionaryId: "",
            activeNavigationConfigId: this.navigationConfigId,
        });
        this.currentElement = null;
        this.updateLayers(ActivityType.clear, "", null);
    }

    public clickHandler(e: MouseEvent): boolean {
        const el: HTMLElement = e.composedPath()[0] as HTMLElement;
        const dataId = el.getAttribute(this.dataDictionaryAttr);
        if (dataId !== null) {
            this.selectElement(el, dataId);
            e.stopPropagation();
            return false;
        }
    }

    public keyUpHandler(e: KeyboardEvent): boolean {
        if (e.key === "Tab") {
            const currTab: number = this.currentElement
                ? Number(this.currentElement.getAttribute("taborder"))
                : e.shiftKey
                ? this.tabCounter
                : 0;
            const nextTab: number = e.shiftKey ? currTab - 1 : currTab + 1;

            if (nextTab > 0 && nextTab < this.tabCounter) {
                const tabElements: Array<Element> = Array.from(
                    (e.composedPath()[0] as HTMLElement).getElementsByTagName("*")
                );
                tabElements.every((el: HTMLElement) => {
                    if (Number(el.getAttribute("taborder")) === nextTab) {
                        const dataId = el.getAttribute(this.dataDictionaryAttr);
                        this.selectElement(el, dataId);
                        return false;
                    }
                    return true;
                });
                e.preventDefault();
                e.stopPropagation();
                return false;
            } else {
                this.clearElement();
                (e.composedPath()[0] as HTMLElement).blur();
            }
        }
        return true;
    }

    public keyDownHandler(e: KeyboardEvent): boolean {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    public containerClickHandler(e: MouseEvent): boolean {
        this.clearElement();
        e.stopPropagation();
        return false;
    }

    /// Render

    private renderHtmlResolver = (config: ResolverConfig<any>): HTMLElement | Text => {
        htmlResolver(config);
        if (
            (config.dataDictionary[0][config.dictionaryId].data as HTMLElement)
                .setAttribute
        ) {
            (config.dataDictionary[0][config.dictionaryId]
                .data as HTMLElement).setAttribute(
                this.dataDictionaryAttr,
                config.dictionaryId
            );
            (config.dataDictionary[0][config.dictionaryId]
                .data as HTMLElement).setAttribute(
                "taborder",
                (this.tabCounter++).toString()
            );
        }
        return config.dataDictionary[0][config.dictionaryId].data;
    };

    public renderMarkup(): void {
        if (this.markupDefinitions !== null) {
            this.markup = mapDataDictionary({
                dataDictionary: this.dataDictionary,
                schemaDictionary: this.schemaDictionary,
                mapper: htmlMapper({
                    version: 1,
                    tags: Object.entries({
                        ...this.markupDefinitions,
                    }).reduce(
                        (
                            previousValue: WebComponentDefinitionTag[],
                            currentValue: [string, WebComponentDefinition]
                        ) => {
                            if (Array.isArray(currentValue[1].tags)) {
                                return previousValue.concat(currentValue[1].tags);
                            }

                            return previousValue;
                        },
                        []
                    ),
                }),
                resolver: this.renderHtmlResolver,
            });
        }
    }

    private isHtmlRenderLayer(el: Element): el is HTMLElement {
        return (
            isHTMLElement(el) && (el.getAttribute("role") as string) === "htmlrenderlayer"
        );
    }
}
