const fs = require("fs")
const express = require('express');
const { Router } = require('express');

//-------------------------------------------------------------------------------------------------------------------------------------------------------

class Contenedor {

    constructor(url) {
        this.url = url
    }

    save(producto) {
        let data = this.getAll()
        let id = 0
        let arrProd
        if (data == "") {
            arrProd = []
        } else {
            arrProd = JSON.parse(data)
        }

        if (arrProd.length == 0) {
            id = 1
        } else {
            id = arrProd[arrProd.length - 1].id + 1
        }

        let newProd = { ...producto, id: id }

        arrProd.push(newProd)

        fs.writeFileSync(this.url, JSON.stringify(arrProd, null, 2))

        return newProd
    }

    getByID(idProd) {
        let data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
        let found = data.some(prod => prod.id == idProd)
        if (found) {
            let product = data.filter(prod => prod.id == idProd)
            return product
        } else {
            return ('Error query param no encontrado')
        }
    }

    getAll() {
        let data = fs.readFileSync(this.url, 'utf-8')
        return data
    }

    deleteByID(idProd) {

        let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        let found = data.some(prod => prod.id == idProd)
        if (found) {
            let product = data.filter(prod => prod.id == idProd)
            let prodDeleted = data.filter(prod => prod.id !== idProd)
            fs.writeFileSync(this.url, JSON.stringify(prodDeleted, null, 2))
            return ({ deletedProduct: product })
        } else {
            return ('Error query param no encontrado')
        }
    }

    deleteAll() {
        fs.writeFileSync(this.url, "")
        console.log("Todos los productos han sido eliminados.");
    }

    modifyById(id, modifyProd) {
        let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        let found = data.some(prod => prod.id == id)
        if (found) {
            let oldProd = data[id - 1]
            data[id - 1] = { ...modifyProd, id: id }
            fs.writeFileSync(this.url, JSON.stringify(data, null, 2))
            return ({ oldProd: oldProd, newProd: modifyProd })
        } else {
            return ("Error query param no encontrado")
        }
    }

}


//------------------------------------------------------------------------------------------------------------------------------------------------------

const app = express();

const routerProductos = new Router(); // APLICACION DE ROUTER

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('/public'))



//-----------------------------------------------------------GET - POST - PUT - DELETE------------------------------------------------------------------

const contenedor = new Contenedor('./productos.txt');

routerProductos.get('/', (req, res) => {
    res.send(contenedor.getAll());
})

routerProductos.post('/', (req, res) => {
    const producto = req.body
    res.json(contenedor.save(producto))
})

routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    res.json(contenedor.getByID(parseInt(id)))
})

routerProductos.put('/:id', (req, res) => {
    const { id } = req.params
    const modifyProd = req.body
    res.json(contenedor.modifyById(parseInt(id), modifyProd))
})

routerProductos.delete('/:id', (req, res) => {
    const { id } = req.params
    res.json(contenedor.deleteByID(parseInt(id)))
})



app.use('/api/productos', routerProductos);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Conectando al servidor');
})