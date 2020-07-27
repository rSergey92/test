
import api from './api/index.js'
import Table from './components/table.js';
import EventBus from './utils';

const getContent = async function() {
    try {
        const res = await api.getSmallData();

        const table = new Table('#test-table', {
            dataTable: res,
            minPageSize: 10,
        });

    } catch(err) {
        console.log(err);
    }
}

window.EventBus = EventBus;

getContent();
