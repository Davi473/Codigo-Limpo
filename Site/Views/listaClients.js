class ListaCLients {

    constructor(dados) {
        this.init(dados);
        
    }

    async init(dados) {
        this.list = await dados.get("/valoresDosClientes")
        this.lista();
    }

    lista() {
        const valores = document.getElementById("referencia")
        const button = document.createElement("input")
        for (const client of this.list) {
            valores.insertAdjacentHTML('beforeend',`
                <tr>
                    <td>${client.client}</td>
                    <td>${client.email}</td>
                    <td>${client.telephone}</td>
                    <td>Select</td>
                    <td><input type="submit"></input></td>
                </tr>
            `);
        }
    }
}