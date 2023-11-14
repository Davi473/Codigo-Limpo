class ListaCLients {

    constructor(dados) {
        this.dados =  dados
        this.init();
        
    }

    async init() {
        this.list = await this.dados.get("/valoresDosClientes")
        this.lista();
    }

    excluir(value) {
        this.dados.post("/excluir", {valor: value})
        document.getElementById("clientes" + value).remove()
    }

    select(statsClient) {
        this.listStats = []
        this.listStats.push(statsClient)
        const stats = [
            "Novo", "Ligar Mais Tarde", "Não ligar Mais"
        ]
        for (const value of stats) {
            if (value === statsClient) {} else {this.listStats.push(value)}
        }
    }

    async buttonAdicionar() {
        const button = document.getElementById("buttonAdicionar")
        button.addEventListener("click", () => {
            const nome = document.getElementById("Name");
            const email = document.getElementById("Email");
            const telefone = document.getElementById("Telephone");
            const stats = document.getElementById("stats");
            this.dados.post("/adicionar", 
                { cliente: nome.value, 
                email: email.value, 
                telefone: telefone.value, 
                stats: stats.value }
            )
            nome.value = "";
            email.value = "";
            telefone.value = "";
            for (var i = 0; i < this.list.length; i++) {
                document.getElementById("clientes" + i).remove()
            }
            this.init()
        })
    }

    async lista() {
        this.buttonAdicionar()
        const valores = document.getElementById("referencia")
        let value = 0
        for (const client of this.list) {
            console.log(client)
            this.select(client.stats)
            valores.insertAdjacentHTML('beforeend',`
                <tr id="clientes${value}">
                    <td>${client.client}</td>
                    <td>${client.email}</td>
                    <td>${client.telephone}</td>
                    <td>
                        <select id="${value}-select">
                            <option>${this.listStats[0]}</option>
                            <option>${this.listStats[1]}</option>
                            <option>${this.listStats[2]}</option>
                        </select>
                    </td>
                    <td>
                        <input type="submit" id="${value}"></input>
                    </td>
                </tr>
            `);
            const buttonExcluir = document.getElementById(value)
            buttonExcluir.addEventListener("click", () => {
                this.excluir(buttonExcluir.id);
            });   
            
            const select = document.getElementById(value + "-select" )
            select.addEventListener("click", () => {
                const index = select.id
                this.dados.post("/trocarStats", {valor: index[0], stat: select.value})
            });
            
            value += 1
        }
    }
}