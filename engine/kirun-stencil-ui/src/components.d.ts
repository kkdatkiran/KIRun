/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface KirunEditor {
        "gridSize": string;
        "theme": string;
    }
    interface KirunEditorRightBar {
    }
}
declare global {
    interface HTMLKirunEditorElement extends Components.KirunEditor, HTMLStencilElement {
    }
    var HTMLKirunEditorElement: {
        prototype: HTMLKirunEditorElement;
        new (): HTMLKirunEditorElement;
    };
    interface HTMLKirunEditorRightBarElement extends Components.KirunEditorRightBar, HTMLStencilElement {
    }
    var HTMLKirunEditorRightBarElement: {
        prototype: HTMLKirunEditorRightBarElement;
        new (): HTMLKirunEditorRightBarElement;
    };
    interface HTMLElementTagNameMap {
        "kirun-editor": HTMLKirunEditorElement;
        "kirun-editor-right-bar": HTMLKirunEditorRightBarElement;
    }
}
declare namespace LocalJSX {
    interface KirunEditor {
        "gridSize"?: string;
        "theme"?: string;
    }
    interface KirunEditorRightBar {
    }
    interface IntrinsicElements {
        "kirun-editor": KirunEditor;
        "kirun-editor-right-bar": KirunEditorRightBar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "kirun-editor": LocalJSX.KirunEditor & JSXBase.HTMLAttributes<HTMLKirunEditorElement>;
            "kirun-editor-right-bar": LocalJSX.KirunEditorRightBar & JSXBase.HTMLAttributes<HTMLKirunEditorRightBarElement>;
        }
    }
}
