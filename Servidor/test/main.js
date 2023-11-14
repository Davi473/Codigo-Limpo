class Web {

    constructor(site) {
        this.site = site
    }

    async get(url) {
        return await this.requisicao("get", url)
    }

    async post(url, valor) {
       return await this.requisicao("post", url, valor)
    }


    async requisicao(tipo, url, valor) {
		let response = await fetch(this.site + url, {
			method: tipo, //get, post, delete
			headers: { "content-type": "application/json" },
			body: JSON.stringify(valor),
		});
        if (tipo === "get") {
            return response.json();
        }
	}
}