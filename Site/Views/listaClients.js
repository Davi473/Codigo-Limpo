class ListaCLients {

    constructor(dados) {
        this.init(dados)
    }

    async init(dados) {
        this.list = await dados.get("/valoresDosClientes")
        console.log(this.list)
    }

    lista() {
        const valores = document.getElementById("referencia")
        for (const client of this.list) {
            valores.appendChild(`
                <tr>
                    <td>${client.client}</td>
                    <td>${clinet.gmail}</td>
                    <td>${client.telephone}</td>
                </tr>
            `)
        }
    }
}