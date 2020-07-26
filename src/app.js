
import api from './api/index.js'
import Table from './components/table.js';
import EventBus from './utils';

async function getContent() {
    let result = undefined;
    try {
       const res = await api.getSmallData();
       console.log(res);
       if (res) {
           result = res;
       }
    } catch(err) {
        console.log(err);
    }
    return result;
}

window.EventBus = EventBus;
document.addEventListener('DOMContentLoaded', function() {
    const table = new Table('#test-table', {
    //    dataTable: getContent(),
       minPageSize: 10,
    })
})