const fs = require("fs")


class Contenedor {

    constructor(url) {
        this.url = url
    }

//----------------------------------------USE FUNCIONES SINCRONICAS PORQUE ME RESULTO MAS SENCILLO------------------------

    getAll() {
        let data = fs.readFileSync(this.url, 'utf-8')
        return data
    }

    getByID(idProd) {
        let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        let product = data.filter(prod => prod.id == idProd)
        return product
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

//-----------------------------------------INICIO SERVIDOR-----------------------------------------

const express = require('express')

const app = express()

const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log('Conectando al servidor');
})

//-----------------------------------------GET PRODUCTOS------------------------------------------

app.get('/productos', (req, res) =>{
    const cont1 = new Contenedor('productos.txt')
    const prodList = cont1.getAll()
    res.send(JSON.stringify(prodList))
})

//----------------------------------------GET PRODUCTO RANDOM-------------------------------------

app.get('/productoRandom', (req, res) =>{
    const num = Math.floor(Math.random()*3 + 1);
    const cont2 = new Contenedor('productos.txt')
    const prod = cont2.getByID(num)
    res.send('Producto random ' + JSON.stringify(prod))
})