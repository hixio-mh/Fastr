import { attr, FastElement, observable } from "@microsoft/fast-element";
import {
    getDisplayedNodes,
    isHTMLElement,
    keyCodeArrowDown,
    keyCodeArrowLeft,
    keyCodeArrowRight,
    keyCodeArrowUp,
    keyCodeEnter,
    keyCodeSpace,
} from "@microsoft/fast-web-utilities";

export class TreeItem extends FastElement {
    @attr
    public expanded: boolean;
    public expandedChanged(): void {
        this.expanded
            ? this.classList.add("expanded")
            : this.classList.remove("expanded");
    }

    @attr
    public selected: boolean;
    public selectedChanged(): void {
        this.selected
            ? this.classList.add("selected")
            : this.classList.remove("selected");
    }

    public expandCollapseButton: HTMLDivElement;

    public treeItem: HTMLElement;

    @observable
    public focusable: boolean = false;

    public afterContent: HTMLSlotElement;
    public afterContentContainer: HTMLSpanElement;
    public handleAfterContentChange(): void {
        this.afterContent.assignedNodes().length > 0
            ? this.afterContentContainer.classList.add("after-content")
            : this.afterContentContainer.classList.remove("after-content");
    }

    public beforeContent: HTMLSlotElement;
    public beforeContentContainer: HTMLSpanElement;
    public handleBeforeContentChange(): void {
        this.beforeContent.assignedNodes().length > 0
            ? this.beforeContentContainer.classList.add("before-content")
            : this.beforeContentContainer.classList.remove("before-content");
    }

    @observable
    public hasItems: boolean;

    public items: HTMLSlotElement;
    public handleItemsChange(): void {
        // we only want to project the slot of there will be items
        this.hasItems = this.querySelectorAll("[slot='item']").length > 0;

        if (this.hasItems) {
            this.nested = true;
        }
    }

    // need to manage if this is a nested tree view item / items How???
    @observable
    private nested: boolean;
    private nestedChanged(): void {
        this.nested ? this.classList.add("nested") : this.classList.remove("nested");
    }

    constructor() {
        super();

        this.handleItemsChange();
    }

    public connectedCallback(): void {
        super.connectedCallback();

        if (this.hasItems) {
            this.nested = true;
        }
    }

    public handleFocus = (e: Event): void => {
        if (e.target === e.currentTarget) {
            this.focusable = true;
        }
    };

    public handleBlur = (e: FocusEvent): void => {
        if (e.target !== e.currentTarget) {
            return;
        }

        this.focusable = false;
    };

    public handleKeyDown = (e: KeyboardEvent): void => {
        if (e.target !== e.currentTarget) {
            return;
        }

        switch (e.keyCode) {
            case keyCodeArrowLeft:
                this.handleArrowLeft();
                break;
            case keyCodeArrowRight:
                this.handleArrowRight();
                break;
            case keyCodeArrowDown:
                // preventDefault to ensure we don't scroll the page
                e.preventDefault();
                this.focusNextNode(1);
                break;
            case keyCodeArrowUp:
                // preventDefault to ensure we don't scroll the page
                e.preventDefault();
                this.focusNextNode(-1);
                break;
            case keyCodeEnter:
                this.handleSelected(e);
                break;
            case keyCodeSpace:
                this.handleSpaceBar();
                break;
        }
    };

    public handleExpandCollapseButtonClick = (): void => {
        this.setExpanded(!this.expanded);
    };

    public handleContainerClick = (e: MouseEvent): void => {
        const expandButton: HTMLElement | null = this.expandCollapseButton;

        if (
            !isHTMLElement(expandButton) ||
            (isHTMLElement(expandButton) && expandButton !== e.target)
        ) {
            this.handleSelected(e);
        }
    };

    private handleArrowLeft(): void {
        console.log("got it!");
        if (this.expanded) {
            this.setExpanded(false);
        } else if (isHTMLElement(this.treeItem.parentElement)) {
            const parentElement: HTMLElement | null = this.treeItem.parentElement;

            if (isHTMLElement(parentElement)) {
                const parentNode: Element | null | undefined = parentElement!.closest(
                    "[role='treeitem']"
                );

                if (isHTMLElement(parentNode)) {
                    (parentNode as HTMLElement).focus();
                }
            }
        }
    }

    private handleArrowRight(): void {
        if (typeof this.expanded !== "boolean") {
            return;
        }

        if (this.expanded) {
            this.setExpanded(true);
        } else {
            this.focusNextNode(1);
        }
    }

    private handleSpaceBar(): void {
        if (typeof this.expanded !== "boolean") {
            return;
        }

        this.setExpanded(!this.expanded);
    }

    private focusNextNode(delta: number): void {
        const visibleNodes: HTMLElement[] | void = this.getVisibleNodes();

        if (!visibleNodes) {
            return;
        }

        const currentIndex: number = visibleNodes.indexOf(this.treeItem);

        if (currentIndex !== -1) {
            const nextElement: HTMLElement = visibleNodes[currentIndex + delta];

            if (isHTMLElement(nextElement)) {
                nextElement.focus();
            }
        }
    }

    private getVisibleNodes(): HTMLElement[] | void {
        return getDisplayedNodes(this.getTreeRoot(), "[role='treeitem']");
    }

    private getTreeRoot(): HTMLElement | null {
        const currentNode: HTMLElement = this.treeItem;

        if (!isHTMLElement(currentNode)) {
            return null;
        }

        return currentNode.closest("[role='tree']") as HTMLElement;
    }

    private handleSelected(e?: Event): void {
        this.$emit("selected-change", e);
    }

    private setExpanded(expanded: boolean): void {
        if (this.hasItems) {
            this.expanded = expanded;

            this.$emit("expanded-change", this);
        }
    }
}
