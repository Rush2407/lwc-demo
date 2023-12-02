import { createElement } from 'lwc';
import ParentComponent from 'c/parentComponent';

describe("c-parent-component test suite", () => {
    test("display first greeting", () => {
        const element = createElement("c-parenet-component", {
            is: ParentComponent
        })
        document.body.appendChild(element)
        const firstDiv = element.shadowRoot.querySelector("div.first")
        expect(firstDiv.textContent).toBe("Hello, World!")
    })
    test("display second greeting", () => {
        const element = createElement("c-parenet-component", {
            is: ParentComponent
        })
        document.body.appendChild(element)
        const secondDiv = element.shadowRoot.querySelector("div.second")
        expect(secondDiv.textContent).toBe("My, World!")
    })
})