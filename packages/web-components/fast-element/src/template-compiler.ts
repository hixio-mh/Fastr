import { BehaviorFactory } from "./directives/behavior";
import { DOM, _interpolationEnd, _interpolationStart } from "./dom";
import { BindingDirective } from "./directives/binding";
import { Directive } from "./directives/directive";
import { ExecutionContext, Binding } from "./observation/observable";

type InlineDirective = Directive & {
    targetName?: string;
    binding: Binding;
    targetAtContent();
};

const compilationContext = { locatedDirectives: 0, targetIndex: -1 };

function createAggregateBinding(parts: (string | InlineDirective)[]): BindingDirective {
    if (parts.length === 1) {
        compilationContext.locatedDirectives++;
        return parts[0] as BindingDirective;
    }

    let targetName: string | undefined;
    const partCount = parts.length;
    const finalParts = parts.map((x: string | InlineDirective) => {
        if (typeof x === "string") {
            return (): string => x;
        }

        targetName = x.targetName || targetName;
        compilationContext.locatedDirectives++;
        return x.binding;
    });

    const binding = (scope: unknown, context: ExecutionContext): string => {
        let output = "";

        for (let i = 0; i < partCount; ++i) {
            output += finalParts[i](scope, context);
        }

        return output;
    };

    const directive = new BindingDirective(binding);
    directive.targetName = targetName;
    return directive;
}

const interpolationEndLength = _interpolationEnd.length;

function parseContent(
    value: string,
    directives: ReadonlyArray<Directive>
): (string | InlineDirective)[] | null {
    const valueParts = value.split(_interpolationStart);

    if (valueParts.length === 1) {
        return null;
    }

    const bindingParts: any[] = [];

    for (let i = 0, ii = valueParts.length; i < ii; ++i) {
        const current = valueParts[i];
        const index = current.indexOf(_interpolationEnd);
        let literal;

        if (index === -1) {
            literal = current;
        } else {
            const directiveIndex = parseInt(current.substring(0, index));
            bindingParts.push(directives[directiveIndex]);
            literal = current.substring(index + interpolationEndLength);
        }

        if (literal !== "") {
            bindingParts.push(literal);
        }
    }

    return bindingParts;
}

function compileAttributes(
    node: HTMLElement,
    directives: ReadonlyArray<Directive>,
    factories: BehaviorFactory[],
    includeBasicValues: boolean = false
): void {
    const attributes = node.attributes;

    for (let i = 0, ii = attributes.length; i < ii; ++i) {
        const attr = attributes[i];
        const attrValue = attr.value;
        const parseResult = parseContent(attrValue, directives);
        let result: BindingDirective | null = null;

        if (parseResult === null) {
            if (includeBasicValues) {
                result = new BindingDirective(() => attrValue);
                result.targetName = attr.name;
            }
        } else {
            result = createAggregateBinding(parseResult);
        }

        if (result !== null) {
            node.removeAttributeNode(attr);
            i--;
            ii--;

            result.targetIndex = compilationContext.targetIndex;
            factories.push(result);
        }
    }
}

function captureContentBinding(
    directive: BindingDirective,
    viewBehaviorFactories: BehaviorFactory[]
): void {
    directive.targetAtContent();
    directive.targetIndex = compilationContext.targetIndex;
    viewBehaviorFactories.push(directive);
    compilationContext.locatedDirectives++;
}

function compileContent(
    node: Text,
    directives: ReadonlyArray<Directive>,
    factories: BehaviorFactory[],
    walker: TreeWalker
): void {
    const parseResult = parseContent(node.textContent!, directives);

    if (parseResult !== null) {
        let lastNode = node;
        for (let i = 0, ii = parseResult.length; i < ii; ++i) {
            const currentPart = parseResult[i];
            const currentNode =
                i === 0
                    ? node
                    : lastNode.parentNode!.insertBefore(
                          document.createTextNode(""),
                          lastNode.nextSibling
                      );

            if (typeof currentPart === "string") {
                currentNode.textContent = currentPart;
            } else {
                currentNode.textContent = " ";
                captureContentBinding(currentPart as BindingDirective, factories);
            }

            lastNode = currentNode;
            compilationContext.targetIndex++;

            if (currentNode !== node) {
                walker.nextNode();
            }
        }

        compilationContext.targetIndex--;
    }
}

/**
 * The result of compiling a template and its directives.
 * @beta
 */
export interface CompilationResult {
    /**
     * A cloneable DocumentFragment representing the compiled HTML.
     */
    fragment: DocumentFragment;
    /**
     * The behaviors that should be applied to the template's HTML.
     */
    viewBehaviorFactories: BehaviorFactory[];
    /**
     * The behaviors that should be applied to the host element that
     * the template is rendered into.
     */
    hostBehaviorFactories: BehaviorFactory[];
    /**
     * An index offset to apply to BehaviorFactory target indexes when
     * matching factories to targets.
     */
    targetOffset: number;
}

/**
 * Compiles a template and associated directives into a raw compilation
 * result which include a cloneable DocumentFragment and factories capable
 * of attaching runtime behavior to nodes within the fragment.
 * @param template - The template to compile.
 * @param directives - The directives referenced by the template.
 * @remarks
 * The template that is provided for compilation is altered in-place
 * and cannot be compiled again. If the original template must be preserved,
 * it is recommended that you clone the original and pass the clone to this API.
 * @public
 */
export function compileTemplate(
    template: HTMLTemplateElement,
    directives: ReadonlyArray<Directive>
): CompilationResult {
    const hostBehaviorFactories: BehaviorFactory[] = [];

    compilationContext.locatedDirectives = 0;
    compileAttributes(template, directives, hostBehaviorFactories, true);

    const fragment = template.content;
    const viewBehaviorFactories: BehaviorFactory[] = [];
    const directiveCount = directives.length;
    const walker = DOM.createTemplateWalker(fragment);

    compilationContext.targetIndex = -1;

    while (compilationContext.locatedDirectives < directiveCount) {
        const node = walker.nextNode();

        if (node === null) {
            break;
        }

        compilationContext.targetIndex++;

        switch (node.nodeType) {
            case 1: // element node
                compileAttributes(node as HTMLElement, directives, viewBehaviorFactories);
                break;
            case 3: // text node
                compileContent(node as Text, directives, viewBehaviorFactories, walker);
                break;
            case 8: // comment
                if (DOM.isMarker(node)) {
                    const directive =
                        directives[DOM.extractDirectiveIndexFromMarker(node)];
                    directive.targetIndex = compilationContext.targetIndex;
                    compilationContext.locatedDirectives++;
                    viewBehaviorFactories.push(directive);
                }
        }
    }

    let targetOffset = 0;

    if (DOM.isMarker(fragment.firstChild!)) {
        // If the first node in a fragment is a marker, that means it's an unstable first node,
        // because something like a when, repeat, etc. could add nodes before the marker.
        // To mitigate this, we insert a stable first node. However, if we insert a node,
        // that will alter the result of the TreeWalker. So, we also need to offset the target index.
        fragment.insertBefore(document.createComment(""), fragment.firstChild);
        targetOffset = -1;
    }

    return {
        fragment,
        viewBehaviorFactories,
        hostBehaviorFactories,
        targetOffset,
    };
}
