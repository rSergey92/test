const EVENT = {
    SORT_CELL: 'sorting'
}
export default class TableHeader {
    constructor(table) {
        this.table = table;
        this.classSort = {
            defaultClass: 'fa-sort',
            asc: 'fa-sort-asc',
            desc: 'fa-sort-desc',
        }
        this.render();
    }

    createTableHeader() {
        const thead = document.createElement('thead');
        const trow = document.createElement('tr');
        const textHeader = ['id', 'firstName', 'lastName', 'email', 'phone'];

        const comparator = (index, order) => {
            console.log(index, order);
            return function sort(a, b) {
                return a - b;
            }
        }

        for(let i = 0; i < textHeader.length; i++) {
            let th = document.createElement('th');
            let icon = document.createElement('i');
            icon.classList.add('fa', 'fa-sort', 'ml-3');

            th.setAttribute('data-field', textHeader[i]);
            th.innerHTML = textHeader[i];
            th.appendChild(icon);

            this.addStyle(th);
            th.addEventListener('click', () => {
                this.changeClass(icon);
                window.EventBus.on(EVENT.SORT_CELL, {
                    field: th.getAttribute('data-field'),
                });
                window.TableBody.startSort();
            });
            // Решение 
            // https://inter-net.pro/javascript/sort-table
            //https://www.insales.ru/collection/doc-funktsional-js/product/funktsional-js-shina-sobytiy

            th.addEventListener('click', ({ target }) => {
            const order = (target.dataset.order = -(target.dataset.order || -1));
            const index = [...target.parentNode.cells].indexOf(target);

            for(const tBody of target.closest('table').tBodies) {
                tBody.append(...[...tBody.rows].sort(comparator(index, order)));
                console.log(tBody);
            }
        });


            trow.appendChild(th);
        }

        thead.appendChild(trow);

        return thead;
    }

    changeClass(icon) {
        const {
            defaultClass,
            asc,
            desc,
        } = this.classSort;

        if (icon.classList.contains(defaultClass)) {
            icon.classList.remove(defaultClass);
            icon.classList.add(desc);
        } else if (icon.classList.contains(desc)) {
            icon.classList.remove(desc);
            icon.classList.add(asc);
        } else {
            icon.classList.remove(asc);
            icon.classList.add(defaultClass);   
        }
    }

    addStyle(th) {
        th.style.cursor = 'pointer';
    }

    render() {
        this.table.appendChild(this.createTableHeader());
    }
}