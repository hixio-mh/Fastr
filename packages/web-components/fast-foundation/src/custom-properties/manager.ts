import { DOM, ElementStyles, FASTElement } from "@microsoft/fast-element";
import { CSSCustomPropertyDefinition } from "./behavior";

const hostSelector = ":host{}";

/**
 * Defines the interface of an HTMLElement that can be used
 * with a {@link CustomPropertyManager}.
 *
 * @public
 */
export interface CustomPropertyManagerClient extends FASTElement {
    /**
     * All registered CSSCustomPropertyDefinitions.
     */
    cssCustomPropertyDefinitions: Map<string, CSSCustomPropertyDefinition>;

    /**
     * Evaluates a custom property definition
     * @param definition - The definition to evaluate
     */
    evaluate(definition: CSSCustomPropertyDefinition): string;
}

/**
 * Describes the interface for custom property management object used by the {@link CustomPropertyManagerClient}
 * to manage CSS custom properties.
 *
 * The managers role is to attach a stylesheet to the CustomPropertyManagerClient instance
 * and to write CSS custom properties to that stylesheet instance when required by the
 * CustomPropertyManagerTarget.
 *
 * @public
 */
export interface CustomPropertyManager {
    /**
     * The CustomPropertyManagerTarget responsible for evaluating CSSCustomPropertyDefinitions
     */
    readonly owner: CustomPropertyManagerClient | null;

    /**
     * Register and write a CSSCustomPropertyDefinition
     * @param definition - The definition to register
     */
    register(definition: CSSCustomPropertyDefinition): void;

    /**
     * Unregister a CSSCustomPropertyDefinition by name. If there are no other
     * registrations, the CSS custom property will be removed.
     * @param name - The name of the custom property definition to unregister
     */
    unregister(name: string): void;

    /**
     * Write a CSSCustomPropertyDefinition without registering it
     * @param definition - The definition to write
     */
    set(definition: CSSCustomPropertyDefinition): void;

    /**
     * Removes a CSSCustomPropertyDefinition
     * @param name - The name of the property
     */
    remove(name: string): void;

    /**
     * Sets all CSSCustomPropertyDefinitions that have been registered
     */
    setAll(): void;

    /**
     * Subscribe a CustomPropertyManagerTarget instances to the manager.
     * @param provider - The CustomPropertyManagerTarget to subscribe
     */
    subscribe?(provider: CustomPropertyManagerClient): void;

    /**
     * Unsubscribe a CustomPropertyManagerTarget instance from the manager.
     * @param provider - The CustomPropertyManagerTarget to unsubscribe.
     */
    unsubscribe?(provider: CustomPropertyManagerClient): void;

    /**
     * Return whether the CustomPropertyManagerTarget instances is subscribed.
     */
    isSubscribed?(provider: CustomPropertyManagerClient): boolean;
}

abstract class CustomPropertyManagerBase implements CustomPropertyManager {
    /**
     * The CSSStyleDeclaration to which all CSS custom properties are written
     */
    protected abstract customPropertyTarget: CSSStyleDeclaration;

    /**
     * {@inheritdoc CustomPropertyManager.owner}
     */
    public get owner(): CustomPropertyManagerClient | null {
        return this._owner;
    }

    /**
     * The private settable owner
     */
    protected _owner: CustomPropertyManagerClient | null = null;

    /**
     * Tracks state of rAF to only invoke property writes once per animation frame
     */
    private ticking: boolean = false;

    /**
     * Stores all CSSCustomPropertyDefinitions registered with the provider.
     */
    private cssCustomPropertyDefinitions: Map<
        string,
        CSSCustomPropertyDefinition & { count: number }
    > = new Map();

    /**
     * {@inheritdoc CustomPropertyManager.register}
     */
    public register(def: CSSCustomPropertyDefinition): void {
        const cached = this.cssCustomPropertyDefinitions.get(def.name);

        if (cached) {
            cached.count += 1;
        } else {
            this.cssCustomPropertyDefinitions.set(def.name, {
                ...def,
                count: 1,
            });
            this.set(def);
        }
    }

    /**
     * {@inheritdoc CustomPropertyManager.unregister}
     */
    public unregister(name: string): void {
        const cached = this.cssCustomPropertyDefinitions.get(name);

        if (cached) {
            cached.count -= 1;

            if (cached.count === 0) {
                this.cssCustomPropertyDefinitions.delete(name);
                this.remove(name);
            }
        }
    }

    /**
     * {@inheritdoc CustomPropertyManager.set}
     */
    public set = (definition: CSSCustomPropertyDefinition) => {
        if (this.owner) {
            this.customPropertyTarget.setProperty(
                `--${definition.name}`,
                this.owner.evaluate(definition)
            );
        }
    };

    /**
     * Removes a CSS custom property from the provider.
     * @param name - the name of the property to remove
     */
    public remove = (name: string): void => {
        this.customPropertyTarget.removeProperty(`--${name}`);
    };

    /**
     * {@inheritdoc CustomPropertyManager.set}
     */
    public setAll() {
        if (this.ticking) {
            return;
        }

        this.ticking = true;
        DOM.queueUpdate(() => {
            this.ticking = false;
            this.cssCustomPropertyDefinitions.forEach(def => {
                this.set(def);
            });
        });
    }
}

/**
 * An implementation of {@link CustomPropertyManager} that uses the constructable CSSStyleSheet object.
 * This implementation supports multiple CustomPropertyManagerTarget subscriptions.
 *
 * @public
 */
export class ConstructableStylesCustomPropertyManager extends CustomPropertyManagerBase {
    protected readonly sheet: CSSStyleSheet;
    protected styles: ElementStyles;
    protected customPropertyTarget: CSSStyleDeclaration;
    private subscribers = new Set();

    constructor(sheet: CSSStyleSheet) {
        super();

        this.sheet = sheet;

        this.styles = ElementStyles.create([sheet]);

        this.customPropertyTarget = (sheet.cssRules[
            sheet.insertRule(hostSelector)
        ] as CSSStyleRule).style;
    }

    /**
     * {@inheritdoc CustomPropertyManager.subscribe}
     */
    public subscribe(client: CustomPropertyManagerClient): void {
        this.subscribers.add(client);

        if (this.subscribers.size === 1) {
            this._owner = client;
        }

        client.cssCustomPropertyDefinitions.forEach(def => {
            this.register(def);
        });

        client.$fastController.addStyles(this.styles);
    }

    /**
     * {@inheritdoc CustomPropertyManager.unsubscribe}
     */
    public unsubscribe(client: CustomPropertyManagerClient): void {
        this.subscribers.delete(client);
        client.cssCustomPropertyDefinitions.forEach(def => this.unregister(def.name));

        if (this.owner === client) {
            this._owner = this.subscribers.size
                ? this.subscribers.values().next().value
                : null;
        }

        if (!this.sheet.ownerNode && this.styles) {
            client.$fastController.removeStyles(this.styles);
        }
    }

    /**
     * {@inheritdoc CustomPropertyManager.isSubscribed}
     */
    public isSubscribed(client: CustomPropertyManagerClient): boolean {
        return this.subscribers.has(client);
    }
}

/**
 * An implementation of {@link CustomPropertyManager} that uses the HTMLStyleElement. This implementation
 * does not support multiple CustomPropertyManagerTarget subscriptions.
 *
 * @public
 */
export class StyleElementCustomPropertyManager extends CustomPropertyManagerBase {
    public readonly sheet: CSSStyleSheet;
    protected customPropertyTarget: CSSStyleDeclaration;
    public readonly styles: HTMLStyleElement;

    constructor(style: HTMLStyleElement, client: CustomPropertyManagerClient) {
        super();

        // For HTMLStyleElements we need to attach the element
        // to the DOM prior to accessing the HTMLStyleElement.sheet
        // because the property evaluates null if disconnected
        client.$fastController.addStyles(style);
        this.sheet = style.sheet!;
        this.styles = style;

        this.customPropertyTarget = (this.sheet.rules[
            this.sheet.insertRule(hostSelector)
        ] as CSSStyleRule).style;

        this._owner = client;

        client.cssCustomPropertyDefinitions.forEach(def => {
            this.register(def);
        });
    }
}
