class Web {

    constructor(site) {
        this.site = site
    }

    async get(url) {
        return await this.requisicao("get", url)
    }

    async post(url, valor) {
       await this.resiquicao("post", url, valor)
    }


    async requisicao(tipo, url, valor) {
        console.log(this.site + url)
		let response = await fetch(this.site + url, {
			method: tipo, //get, post, delete
			headers: { "content-type": "application/json" },
			body: JSON.stringify(valor),
		});
		return response.json();
	}
}