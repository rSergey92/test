const EVENT = {
    FILTER_FIELD: 'filter',
}

export default class Filter {
    constructor(wrapper) {
        this.wrapper = wrapper;
    }

    createInput() {
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Search';
        this.input.classList.add('form-control');
                
        return this.input;
    }
    eventHandlerInput() {
        if (this.input) {
            this.input.addEventListener('input', this.changeValue);
        }
    }

    changeValue({ target }) {
        window.EventBus.on(EVENT.FILTER_FIELD, {
            target
        });
    }

    render() {
        this.wrapper.before(this.createInput());

        this.eventHandlerInput()
    }
}