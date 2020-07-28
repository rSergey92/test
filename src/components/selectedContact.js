/*
* TODO: Необходимо избавиться от дублиорвания
* */
export default class SelectedContact {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.container = document.createElement('div');
    }

    createBlockContacts({ name, value, dataTable }) {
        const heading = document.createElement('h2');
        heading.innerHTML = 'Выбранный контакт';
        heading.classList.add('form-group');

        this.container.innerHTML = '';
        this.container.appendChild(heading);
        for (let key in dataTable) {
            if (dataTable[key][name] == value) {
                const account = SelectedContact.setDataContacts({
                    title: 'Выбран пользователь:',
                    text: dataTable[key]['id'],
                    selector: 'b'
                });
                const desc = SelectedContact.setDataContacts({
                    title: 'Описание:',
                    text: dataTable[key]['description'],
                    selector: 'textarea'
                });
                const address = SelectedContact.setDataContacts({
                    title: 'Адрес проживания:',
                    text: dataTable[key]['adress']['streetAddress'],
                    selector: 'b'
                });
                const city = SelectedContact.setDataContacts({
                    title: 'Город:',
                    text: dataTable[key]['adress']['city'],
                    selector: 'b'
                });
                const state = SelectedContact.setDataContacts({
                    title: 'Провинция/штат:',
                    text: dataTable[key]['adress']['state'],
                    selector: 'b'
                });
                const zip = SelectedContact.setDataContacts({
                    title: 'Индекс:',
                    text: dataTable[key]['adress']['zip'],
                    selector: 'b'
                });
                this.container.appendChild(account);
                this.container.appendChild(desc);
                this.container.appendChild(address);
                this.container.appendChild(city);
                this.container.appendChild(state);
                this.container.appendChild(zip);
            }
        }

        return this.container;
    }

    static setDataContacts(options) {
        const {
            title,
            text,
            selector,
        } = options;

        const groupSelector = document.createElement('div');
        const titleSelector = document.createElement('span');
        const textSelector = document.createElement(selector);
        titleSelector.innerHTML = title;
        textSelector.innerHTML = text;

        groupSelector.appendChild(titleSelector);
        groupSelector.appendChild(textSelector);

        return groupSelector
    }

    render(options) {
        this.wrapper.appendChild(this.createBlockContacts(options));
    }
}