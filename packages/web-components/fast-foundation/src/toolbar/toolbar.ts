import { attr, DOM, elements, FASTElement, observable } from "@microsoft/fast-element";
import {
    Direction,
    keyCodeArrowDown,
    keyCodeArrowLeft,
    keyCodeArrowRight,
    keyCodeArrowUp,
    keyCodeEnd,
    keyCodeHome,
    Orientation,
} from "@microsoft/fast-web-utilities";
import { getDirection } from "../utilities/direction";
import { inRange } from "lodash-es";
import tabbable from "tabbable";

/**
 * An Toolbar Custom HTML Element.
 *
 * @public
 */
export class Toolbar extends FASTElement {
    /**
     * Toolbar orientation
     *
     * @defaultValue - "horizontal"
     * @public
     * HTML Attribute: orientation
     */
    @attr
    public orientation: Orientation = Orientation.horizontal;

    /**
     * @internal
     */
    @observable
    public items: HTMLSlotElement;
    private itemsChanged(oldValue, newValue): void {
        if (this.$fastController.isConnected) {
            this.toolbarItems = this.domChildren();
            this.resetItems(oldValue);
            this.setItems();
        }
    }

    /**
     * The current set of toolbar items
     */
    private toolbarItems: Element[];

    /**
     * Track the initial tab index settings of children
     */
    private initialItemTabIndexes: Map<Element, any> = new Map<Element, any>();

    /**
     * The index of the focusable element in the items array
     * defaults to -1
     */
    private focusIndex: number = -1;

    /**
     * The index of the focusable element in the items array
     * defaults to -1
     */
    private direction: Direction = Direction.ltr;

    public connectedCallback(): void {
        super.connectedCallback();
        this.direction = getDirection(this);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.toolbarItems = [];
    }

    /**
     * Focuses on the appropriate toolbar item
     *
     * @public
     */
    public focus(): void {
        if (this.initialItemTabIndexes.entries.length === 0) {
            return;
        }

        if (this.focusIndex === -1) {
            this.setFocus(0, 1);
            return;
        }
        this.setFocus(this.focusIndex, 1);
    }

    /**
     * @internal
     */
    public handleKeyDown(e: KeyboardEvent): void | boolean {
        if (e.defaultPrevented) {
            return;
        }
        switch (e.keyCode) {
            case keyCodeArrowDown:
                if (this.orientation === Orientation.vertical) {
                    e.preventDefault();
                    this.setFocus(this.focusIndex + 1, 1);
                }
                return;
            case keyCodeArrowUp:
                if (this.orientation === Orientation.vertical) {
                    e.preventDefault();
                    this.setFocus(this.focusIndex - 1, -1);
                }
                return;
            case keyCodeArrowRight:
                if (this.orientation === Orientation.horizontal) {
                    e.preventDefault();
                    this.direction === Direction.ltr
                        ? this.setFocus(this.focusIndex + 1, 1)
                        : this.setFocus(this.focusIndex - 1, -1);
                }
                return;
            case keyCodeArrowLeft:
                if (this.orientation === Orientation.horizontal) {
                    e.preventDefault();
                    this.direction === Direction.ltr
                        ? this.setFocus(this.focusIndex - 1, -1)
                        : this.setFocus(this.focusIndex + 1, +1);
                }
                return;
            case keyCodeEnd:
                // set focus on last item
                this.setFocus(this.domChildren().length - 1, -1);
                return;
            case keyCodeHome:
                // set focus on first item
                this.setFocus(0, 1);
                return;

            default:
                // if we are not handling the event, do not prevent default
                return true;
        }
    }

    /**
     * get an array of valid DOM children
     */
    private domChildren(): Element[] {
        return Array.from(this.children);
    }

    private handleItemFocus = (e: FocusEvent): void => {
        if (e.defaultPrevented) {
            return;
        }
        e.preventDefault();
        const target = e.currentTarget as Element;
        const focusIndex: number = this.toolbarItems.indexOf(target);

        // update tab index on elements
        if (this.focusIndex !== -1 && this.focusIndex !== focusIndex) {
            (this.toolbarItems[this.focusIndex] as HTMLElement).tabIndex = -1;
            (target as HTMLElement).tabIndex = 0;
            // update the focus index
            this.focusIndex = focusIndex;
        }
    };

    private setFocus(focusIndex: number, adjustment: number): void {
        while (inRange(focusIndex, this.toolbarItems.length)) {
            const child: Element = this.toolbarItems[focusIndex];

            if (this.initialItemTabIndexes.has(child)) {
                (this.toolbarItems[this.focusIndex] as HTMLElement).tabIndex = -1;
                (child as HTMLElement).tabIndex = 0;
                // update the focus index
                this.focusIndex = focusIndex;
                // focus the element
                (child as HTMLElement).focus();
                break;
            }

            focusIndex += adjustment;
        }
    }

    private setItems = (): void => {
        const tabbableElements: HTMLElement[] = tabbable(this as HTMLElement);
        for (
            let itemIndex: number = 0;
            itemIndex < this.toolbarItems.length;
            itemIndex++
        ) {
            const element = this.toolbarItems[itemIndex] as HTMLElement;

            if (tabbableElements.includes(element)) {
                if (this.focusIndex === -1) {
                    this.focusIndex = itemIndex;
                }
                this.initialItemTabIndexes.set(
                    element,
                    (element as HTMLElement).tabIndex
                );
                element.setAttribute(
                    "tabindex",
                    itemIndex === this.focusIndex ? "0" : "-1"
                );
                element.addEventListener("focus", this.handleItemFocus);
            }
        }
    };

    private resetItems = (oldValue: any): void => {
        oldValue.forEach(element => {
            if (this.initialItemTabIndexes.has(element)) {
                (element as HTMLElement).tabIndex = this.initialItemTabIndexes.get(
                    element
                );
            }
        });
        this.initialItemTabIndexes.clear();
        this.focusIndex = -1;
    };
}
