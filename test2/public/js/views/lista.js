class Lista {

    constructor(web) {
        this.dados = web
        this.tabela()
    }

    async tabela() {
        this.clientes = this.dados.get("/valoresDosClientes")
    }
}