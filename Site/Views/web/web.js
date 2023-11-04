class Web {

    constructor(site) {
        this.site = site
    }

    async get(url) {
        this.resiquicao("get", url)
    }


    async resiquicao(tipo, url, valor) {
        let response = await fetch (this.site + url, {
            method: tipo, /* get, post, delete */
            headers: { "content-type": "application/json"},
            body: JSON.stringify(valor),
        });
        return response.json();
    }
}