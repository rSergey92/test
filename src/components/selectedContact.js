export default class SelectedContact {
    constructor(wrapper) {
        this.wrapper = wrapper;
    }

    createBlockContacts() {
        const wrapper = document.createElement('div');
        const account = SelectedContact.setDataContacts({
            title: 'Выбран пользователь',
            text: '',
            selector: 'b'
        });
        const desc = SelectedContact.setDataContacts({
            title: 'Описание',
            text: '',
            selector: 'textarea'
        });
        const address = SelectedContact.setDataContacts({
            title: 'Адрес проживания:',
            text: '',
            selector: 'b'
        });
        const city = SelectedContact.setDataContacts({
            title: 'Город',
            text: '',
            selector: 'b'
        });
        const state = SelectedContact.setDataContacts({
            title: 'Провинция/штат',
            text: '',
            selector: 'b'
        });
        const code = SelectedContact.setDataContacts({
            title: 'Индекс',
            text: '',
            selector: 'b'
        });
        wrapper.appendChild(account);
        wrapper.appendChild(desc);
        wrapper.appendChild(address);
        wrapper.appendChild(city);
        wrapper.appendChild(state);
        wrapper.appendChild(code);

        return wrapper
    }

    static setDataContacts(options) {
        const groupSelector = document.createElement('div');
        const {
            title,
            text,
            selector,
        } = options;
        const titleSelector = document.createElement('span');
        const textSelector = document.createElement(selector);
        titleSelector.innerHTML = title;
        textSelector.innerHTML = text;

        groupSelector.appendChild(titleSelector);
        groupSelector.appendChild(textSelector);
        return groupSelector
    }

    render() {
        this.wrapper.appendChild(this.createBlockContacts());
    }
}