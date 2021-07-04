import { DOM } from "../dom";
import { CaptureType, SyntheticViewTemplate } from "../template";
import { SyntheticView } from "../view";
import { Expression } from "../interfaces";
import { ObservableExpression } from "../observation/observable";
import { Behavior } from "./behavior";
import { Directive } from "./directive";

export class WhenBehavior implements Behavior {
    private view: SyntheticView | null = null;
    private cachedView?: SyntheticView;
    private source: unknown;
    private observableExpression: ObservableExpression;

    constructor(
        private location: Node,
        expression: Expression,
        private template: SyntheticViewTemplate
    ) {
        this.observableExpression = new ObservableExpression(expression, this);
    }

    bind(source: unknown): void {
        this.source = source;
        this.updateTarget(this.observableExpression.evaluate(source, null as any));
    }

    unbind(): void {
        if (this.view !== null) {
            this.view.unbind();
        }

        this.observableExpression.dispose();
        this.source = null;
    }

    handleExpressionChange(): void {
        this.updateTarget(this.observableExpression.evaluate(this.source, null as any));
    }

    updateTarget(show: boolean): void {
        if (show && this.view == null) {
            this.view = this.cachedView || (this.cachedView = this.template.create());
            this.view.bind(this.source);
            this.view.insertBefore(this.location);
        } else if (!show && this.view !== null) {
            // do not dispose, since we may want to use the view again
            this.view.remove();
            this.view.unbind();
            this.view = null;
        }
    }
}

export class WhenDirective extends Directive {
    createPlaceholder: (index: number) => string = DOM.createBlockPlaceholder;

    constructor(public expression: Expression, public template: SyntheticViewTemplate) {
        super();
    }

    public createBehavior(target: any): WhenBehavior {
        return new WhenBehavior(target, this.expression, this.template);
    }
}

export function when<T = any, K = any>(
    expression: Expression<T, K>,
    template: SyntheticViewTemplate
): CaptureType<T> {
    return new WhenDirective(expression, template);
}
