export default class TableHeader {
    constructor(table) {
        this.table = table;
        this.classSort = {
            asc: 'fa-sort-asc',
            desc: 'fa-sort-desc',
        }
        this.render();
    }

    createTableHeader() {
        const thead = document.createElement('thead');
        const trow = document.createElement('tr');
        const textHeader = ['id', 'firstName', 'lastName', 'email', 'phone'];

        for(let i = 0; i < textHeader.length; i++) {
            let th = document.createElement('th');
            let icon = document.createElement('i');
            icon.classList.add('fa', 'fa-sort-desc', 'ml-3');

            th.setAttribute('data-field', textHeader[i]);
            th.innerHTML = textHeader[i];
            th.appendChild(icon);

            this.addStyle(th);
            th.addEventListener('click', () => {
                this.changeClass(icon);
            });

            trow.appendChild(th);
        }

        thead.appendChild(trow);

        return thead;
    }

    changeClass(icon) {
        const {
            asc,
            desc,
        } = this.classSort;

        if (icon.classList.contains(desc)) {
            icon.classList.remove(desc);
            icon.classList.add(asc);
        } else {
            icon.classList.remove(asc);
            icon.classList.add(desc);
        }
    }

    addStyle(th) {
        th.style.cursor = 'pointer';
    }

    render() {
        this.table.appendChild(this.createTableHeader());
    }
}