import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url) // no primeiro parâmetro dessa classe URL é o local para salvar o arquivo, enquanto o import.meta.url
//                                                             mostra o caminho relativo ao arquivo que está executando, neste caso o "database.js" e quando utilizados juntos
//                                                             o primeiro parâmetro de local fica dinâmico e você pode navegar assim como no "cd" do cmd do Windows.

export class Database {
    // { "users": [], "products": [], ...}
    #database = {} // `#` serve para deixar a propriedade privada, apenas acessível pelos métodos da classe Database.

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist() //Essa parte do código força a criação do db.json mesmo ele estando vazio.
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? [] // Cria um array vazio, para não retornar um valor vazio para o banco de dados.

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data] // Nessa parte do código ele cria a tabela caso não exista uma com a nomenclatura table recebida.
        }

        this.#persist();

        return data;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data }
            this.#persist()
        }
    }
}