

const fs = require("fs")


class Contenedor {

    constructor(url) {
        this.url = url
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8')
            return data 
        } catch (error) {
            return []
        }

    }

    async save(producto) {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let id = 0
            let arrProd = []

            if (data.length == 0) {
                id = 1
                console.log(id + "----------> id");
            } else {
                
                arrProd = JSON.parse(data)
                id = arrProd[arrProd.length - 1].id + 1
                console.log(id + "----------> id");
            }

            let newProd = { ...producto, id: id }

            arrProd.push(newProd)

            try {
                await fs.promises.writeFile(this.url, JSON.stringify(arrProd, null, 2))
                console.log("-------escribi el archivo---------");
                return id
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }



    }

    async getByID(idProd) {
        let data = await this.getAll()
        let arr = JSON.parse(data)
        let product = arr.filter(prod => prod.id == idProd)
        console.log("Producto filtrado: " + JSON.stringify(product, null, 2));
    }

    async deleteByID(idProd) {
        let data = await this.getAll()
        let arr = JSON.parse(data)
        let prodDeleted = arr.filter(prod => prod.id !== idProd)
        console.log(prodDeleted);
        try {
            await fs.promises.writeFile(this.url, JSON.stringify(prodDeleted, null, 2))
        } catch (error) {
            console.log(error);
        }

    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.url, "")
        } catch (error) {
            console.log(error);
        }

        console.log("Todos los productos han sido eliminados.");
    }

}






