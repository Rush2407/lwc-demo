import { createElement } from 'lwc';
import MyWireComponent from 'c/myWireComponent';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest'
import getContactList from '@salesforce/apex/ContactController.getContactList';


const mockGetcontactList = require('./data/getContactList.json')
const mockGetContactListNoRecords = require('./data/getContactListNoRecord.json')

const getCotactListAdapter = registerApexTestWireAdapter(getContactList)

describe('c-my-wire-component', () => {

    beforeEach(() => {
        const element = createElement('c-my-wire-component', {
            is: MyWireComponent
        });
        document.body.appendChild(element);
    });
    afterEach(() => {
        jest.clearAllMocks()
    });

    it('renders correct records', () => {
        const element = document.querySelector('c-my-wire-component')
        getCotactListAdapter.emit(mockGetcontactList)
        return Promise.resolve().then(() => {
            const pElem = element.shadowRoot.querySelectorAll('p');
            expect(pElem.length).toBe(mockGetcontactList.length);
            expect(pElem[0].textContent).toBe(mockGetcontactList[0].Name)
        })
    });

    it('renders no item when no records are available', () => {
        const element = document.querySelector('c-my-wire-component');
        getCotactListAdapter.emit(mockGetContactListNoRecords);
        return Promise.resolve().then(() => {
            const pElem = element.shadowRoot.querySelectorAll('p');
            expect(pElem.length).toBe(mockGetContactListNoRecords.length);
        })
    });

    it('getContactList @wire error', () => {
        const element = document.querySelector('c-my-wire-component');
        getCotactListAdapter.error()
        return Promise.resolve().then(() => {
            const errorElem = element.shadowRoot.querySelector('.error');
            expect(errorElem.textContent).not.toBeNull();
        })
    });

});