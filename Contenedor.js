const fs = require("fs")

class Contenedor {

    constructor(url){
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
        
        if(arrProd.length == 0){
            id = 1
        } else{
            id = arrProd[arrProd.length-1].id + 1
        }

        
        let newProd = {...producto, id: id}

        arrProd.push(newProd)

        fs.writeFileSync(this.url, JSON.stringify(arrProd, null, 2))

        console.log("id: " + id);
    }

    getByID(idProd) {
        let data = JSON.parse(fs.readFileSync('./productos.txt', 'utf-8'))
        let product = data.filter(prod => prod.id == idProd)
        console.log("Producto filtrado: " + JSON.stringify(product, null, 2));
    }

    getAll() {
        let data = fs.readFileSync(this.url, 'utf-8')
        return data
    }

    deleteByID(idProd) {
        let data = JSON.parse(fs.readFileSync(this.url, 'utf-8'))
        let prodDeleted = data.filter(prod => prod.id !== idProd)
        console.log(prodDeleted);
        fs.writeFileSync(this.url, JSON.stringify(prodDeleted, null, 2))
    }

    deleteAll() {
        fs.writeFileSync(this.url, "")
        console.log("Todos los productos han sido eliminados.");
    }

}

const productos = new Contenedor ("./productos.txt")

const producto = {
    title:"algo1",
    price:125,
    thumbnail:"algomas1"
}

const producto2 = {
    title:"algo2",
    price:258,
    thumbnail:"algomas2"
}

const producto3 = {
    title:"algo3",
    price:358,
    thumbnail:"algomas3"
}

//PRODUCTOS GUARDADOS EN ARCHIVO E INFORME DE ID

console.log("ID DE LOS PRODUCTOS-----------------------------------------------------");
productos.save(producto);
productos.save(producto2);
productos.save(producto3);

//TODOS LOS PRODUCTOS

console.log("INFORME DE TODOS LOS PRODUCTOS EN EL ARCHIVO---------------------------------------------");
console.log(productos.getAll());


//PRODUCTO FILTRADO

console.log("PRODUCTO BUSCADO POR ID = 3--------------------------------------------------------");
productos.getByID(3)

//PRODUCTO ELIMINADO

console.log("PRODUCTO ELIMINADO POR ID = 2------------------------------------------------------");
productos.deleteByID(2)

//ARCHIVO ELIMINADO

console.log("ARCHIVO ELIMINADO-------------------------------------------------------");
productos.deleteAll()





