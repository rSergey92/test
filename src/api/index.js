class Api {
    constructor() {
        this.domain = '';
    }

    async makeRequest({ path }) {
        const response = await fetch(path);
        if (response.status === 200) return response.json();
    }

    getSmallData() {
        return this.makeRequest({
            path: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
        })
    }
    getBigData() {
        return this.makeRequest({
            path: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
        })
    }
}

export default new Api();
