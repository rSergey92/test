export default class Pagination {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.render();
    }

    createPagination() {
        const paginationBlock = document.createElement('nav');
        paginationBlock.appendChild(this.getListPage());

        return paginationBlock;
    }

    getListPage() {
        const list = this.createList('ul');
        const item = this.createItem('li');
        item.appendChild(this.createLink('a', '2'));
        list.appendChild(item);

        return list;
    }

    createList(ul) {
        const list = document.createElement(ul);
        list.classList.add('pagination');
        return list;
    }

    createItem(li) {
        const item =  document.createElement(li);
        item.classList.add('page-item');
        return item;
    }

    createLink(a, value) {
        const link = document.createElement(a);
        link.innerHTML = value;
        link.classList.add('page-link');
        return link;
    }

    render() {
        this.wrapper.appendChild(this.createPagination());
    }
}
