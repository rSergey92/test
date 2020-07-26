const makeReauest = function(path, options = {}) {
     fetch(`path`, options)
}

export default class Api {
    constructor() {
        this.domain = '';
    }

    getSmallData() {
        return makeRequest({
            url: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
        })
    }
    getBigData() {
        return makeRequest({
            url: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}',
        })
    }
}