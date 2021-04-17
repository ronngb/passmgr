import { acctData } from './data/acct.js';

export const store = {
    state: {
        acctData,
    },
    sanitizeUrl(url) {
        const regex = /(http(s?)):\/\/|ww(w|3)./gi
        return url.replace(regex, '')
    },
    getDate() {
        const format = { month: 'long', day: '2-digit', year: 'numeric' }
        return new Date().toLocaleString('en-us', format)
    },
    storeAcct(newAcct) {
        const acctArr = [['url', newAcct.inputWebsite], ['domain', this.sanitizeUrl(newAcct.inputWebsite)], ['username', newAcct.inputUsername], ['password', newAcct.inputPassword]]

        const datesArr = [['created', this.getDate()], ['last_modified', this.getDate()], ['last_used', this.getDate()]]

        this.state.acctData.push(Object.assign(Object.fromEntries(acctArr), Object.fromEntries(datesArr)));

        return this.state.acctData.length - 1

    },
    sortAcct(sort) {
        //GIT: created sortAcct()        
        this.state.acctData.sort((a, b) => {
            switch (sort) {
                case 'Name (A-Z)':
                    return (a.domain > b.domain) ? 1 : -1;
                    break;
                case 'Name (Z-A)':
                    return (a.domain < b.domain) ? 1 : -1;
                    break;
            }
        })
    },
}