import { createElement } from 'lwc';
import MyParentComp from 'c/myParentComp';
const USER_RESULT = 'Rushi';

describe('c-my-parent-comp', () => {
    beforeEach(() => {
        const element = createElement('c-my-parent-comp', {
            is: MyParentComp
        });
        document.body.appendChild(element);
    })

    /*Above scenario is like below
    <body>
        <lightning-card title="Nested component demo" icon-name="custom:custom57">
            <div class="slds-var-m-around_medium">
                <c-my-child-comp class="slds-show slds-is-relative" user-detail={userData}></c-my-child-comp>
            </div>
        </lightning-card>
    </body>
    */

    it('render child component', () => {
        const element = document.querySelector('c-my-parent-comp')
        const childCompElem = element.shadowRoot.querySelectorAll("c-my-child-comp")
        expect(childCompElem.length).toBe(1)
    });

    it('set user data property', () => {
        const element = document.querySelector('c-my-parent-comp')
        const childCompElem = element.shadowRoot.querySelector("c-my-child-comp")
        expect(childCompElem.userDetail.Name).toBe(USER_RESULT)
    })
});