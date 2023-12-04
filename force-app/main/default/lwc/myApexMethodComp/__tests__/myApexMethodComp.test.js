import { createElement } from 'lwc';
import MyApexMethodComp from 'c/myApexMethodComp';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
const APEX_ACCOUNTLIST_ERROR = require('./data/accountsError.json')
const APEX_ACCOUNTLIST_SUCCESS = require('./data/accountsList.json')
import 'setimmediate';
//jest.mock(moduleName, factory, options)
jest.mock('@salesforce/apex/AccountController.getAccountList',
    () => ({
        default: jest.fn()
    }), { virtual: true }
)

describe('c-my-apex-method-comp', () => {
    beforeEach(() => {
        const element = createElement("c-my-apex-method-comp", {
            is: MyApexMethodComp
        })
        document.body.appendChild(element)

    })

    it('renders accounts returned from imperative apex', () => {
        getAccountList.mockResolvedValue(APEX_ACCOUNTLIST_SUCCESS)
        const element = document.querySelector('c-my-apex-method-comp')
        const buttonElement = element.shadowRoot.querySelector('lightning-button')
        buttonElement.click()
        return new Promise(setImmediate).then(() => {

            const detailEls = element.shadowRoot.querySelectorAll('p.accountName')
            expect(detailEls.length).toBe(APEX_ACCOUNTLIST_SUCCESS.length)
            expect(detailEls[0].textContent).toBe(APEX_ACCOUNTLIST_SUCCESS[0].Name)
            expect(detailEls[1].textContent).toBe(APEX_ACCOUNTLIST_SUCCESS[1].Name)
        })
    })

    it('reders the error when apex return an error', () => {
        getAccountList.mockRejectedValue(APEX_ACCOUNTLIST_ERROR)
        const element = document.querySelector('c-my-apex-method-comp')
        const buttonElement = element.shadowRoot.querySelector('lightning-button')
        buttonElement.click()
        return new Promise(setImmediate).then(() => {
            const errorElem = element.shadowRoot.querySelector('.error')
            expect(errorElem).not.toBeNull()
        })
    })
})