class ListaCLients {

    constructor(dados) {
        this.dados =  dados
        this.init();
        
    }
    
    async init() {
        this.list = await this.dados.get("/valoresDosClientes")
        this.lista();
    }
    

    exibirPopup(value) {
        var meuPopup = window.open('', 'MeuPopup', 'width=400,height=300');
        meuPopup.document.write(
        `<html>
            <head>
                <title>Meu Popup</title>
            </head>
            <body>
                <h1>${value}</h1>
            </body>
        </html>`);
    }

    getID(value) {
        return document.getElementById(value)
    }

    async excluir(value) {
        const excluir = await this.dados.post("/excluir", {valor: value})
        console.log(excluir) // valor do retorno
        this.exibirPopup(excluir.value)
        this.getID("clientes" + value).remove()
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
        const button = this.getID("buttonAdicionar")
        button.addEventListener("click", () => {
            const nome = this.getID("Name"); 
            const email = this.getID("Email");
            const telefone = this.getID("Telephone");
            const stats = this.getID("stats");
            if (nome != "") {
                const lientesNovos = this.dados.post("/adicionar", { client: nome.value, email: email.value, telephone: telefone.value, stats: stats.value });
            }
            nome.value = "";
            email.value = "";
            telefone.value = "";
            if (this.getID("clientes" + 0)) {
                for (var i = 0; i < this.list.length; i++) {
                    this.getID("clientes" + i).remove()
                }
            }
            this.init()
        })
    }

    async lista() {
        await this.buttonAdicionar()
        const valores = this.getID("referencia")
        let value = 0
        console.log(this.list)
        for (const client of this.list) {
            this.select(client.stats)
            console.log(client.client)
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
                        <input type="submit" id="${value}" value="Excluir"></input>
                    </td>
                </tr>
            `);
            const buttonExcluir = this.getID(value)
            buttonExcluir.onclick = () => {
                this.excluir(buttonExcluir.id);
            };   
            
            const select = this.getID(value + "-select" )
            select.addEventListener("click", () => {
                const index = select.id
                this.dados.post("/trocarStats", {valor: index[0], stat: select.value})
            });
            
            value += 1
        }
    }
}