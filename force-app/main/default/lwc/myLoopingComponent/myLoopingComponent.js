import { LightningElement, track } from 'lwc';

export default class MyLoopingComponent extends LightningElement {
    @track userList = [{
            Id: '1',
            Name: 'Rushi'
        },
        {
            Id: '2',
            Name: 'Rahul'
        },
        {
            Id: '3',
            Name: 'Anand'
        }
    ];
}