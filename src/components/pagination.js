export default class Pagination {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.buttonSelector = 'page-item';
    }

    createPagination(countOfItem) {
        const paginationBlock = document.createElement('nav');
        const list = this.createList('ul');
        for (let i = 1; i <= countOfItem; i++) {
            list.appendChild(this.getListPage(i));
        }

        paginationBlock.appendChild(list);

        return paginationBlock;
    }

    getListPage(numPage) {
        const item = this.createItem('li');
        item.appendChild(this.createLink('a', numPage));

        return item;
    }

    createList(ul) {
        const list = document.createElement(ul);
        list.classList.add('pagination');
        return list;
    }

    createItem(li) {
        const item =  document.createElement(li);
        item.classList.add(this.buttonSelector);
        return item;
    }

    createLink(a, value) {
        const link = document.createElement(a);
        link.innerHTML = value;
        link.classList.add('page-link');
        return link;
    }

    startPage(pageNum, contactsOnePage) {
        return (pageNum - 1) * contactsOnePage;
    }

    endPage(start, contactsOnePage) {
        return start + contactsOnePage;
    }

    render(countOfItem) {
        this.wrapper.appendChild(this.createPagination(countOfItem));
    }
}
