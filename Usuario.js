//---------------------------------------------------CLASE--------------------------------------------------

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`);
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    countMascotas(){
        console.log(this.mascotas.length);
    } 
    
    addBook(nombre, autor){
        this.libros.push({ nombreLibro: nombre, autorLibro: autor });
    }
    
    getBookNames(){
       let booksNames = this.libros.map((libro) =>{
            return libro.nombreLibro
       })

       console.log(booksNames);
    }
    
}

//------------------------------------------------------------USUARIO-------------------------------------------

let usuario = new Usuario;

usuario.nombre = "Pepe"
usuario.apellido = "Pelotas"
usuario.libros = [
    { nombreLibro: "Harry Potter y la Orden del Fenix", autorLibro: "J. K. Rowling" },
    { nombreLibro: "El señor de los anillos: La comunidad del anillo", autorLibro: "J. R. R. Tolkien" },
    { nombreLibro: "Archivo de las Tormentas 1: El camino de los Reyes", autorLibro: "Brandon Sanderson" }]
usuario.mascotas = ["Yuki", "Peke", "Zeus"]


//----------------------------------------------------------NOMBREYAPELLIDO-------------------------------------

//METODO GETFULLNAME

usuario.getFullName();

//----------------------------------------------------------------MASCOTAS--------------------------------------

console.log(usuario.mascotas);

//CANTIDAD DE MASCOTAS

usuario.countMascotas();

//METODO ADDMASCOTA

usuario.addMascota("Thor");

console.log(usuario.mascotas);

//METODO COUNTMASCOTA

usuario.countMascotas();

//----------------------------------------------------------------LIBROS----------------------------------------

console.log(usuario.libros);

//ADDBOOK

usuario.addBook("La llamada de Cthulhu","H. P. Lovecraft");

console.log(usuario.libros);

//GETBOOKNAMES

usuario.getBookNames();






