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

    render() {
        this.wrapper.before(this.createInput());
    }
}