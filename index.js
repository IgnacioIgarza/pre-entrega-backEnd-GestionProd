import colors from 'colors';
const argumentos = process.argv.slice(2);
const [comando1, ...comandos] = argumentos;

async function consultarProdEspecif(coman2) {
    try {
        const result = await fetch('https://fakestoreapi.com/products')
        .then((response) => {
            if(!response.ok){
                throw new Error('No se encuentra ese Id.')
            }
            return response.json()
        } )
        .then((data) => data.forEach(producto => {
            if(coman2 == producto.id){
                console.log(`Se tomará el producto con ID ${producto.id}:`.bgBlue,`\n${producto.title}
Categoría: ${producto.category}`,` Precio $${producto.price}.`.green)
            }
        }))
    } catch (error) {
        console.error(error)
    } finally {
        console.log('* Tarea GET terminada.\n'.grey)
    }
}

async function crearProdEspecif(prod,precio,categ) {
    const config ={
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            title: prod.toUpperCase(),
            category: categ,
            price: precio,
            userId: 1
        })
    }

    try {
        const result = await fetch('https://fakestoreapi.com/products',config)
        .then((response) => response.json())
        .then(console.log("Se sumará el producto a la lista.".bgGreen))
        //.then(data=>console.log(data))
        .then((data)=>{
            for (let clave in data) {
                console.log(`${clave}:`.green,`${data[clave]}`);
            }
        })
    } catch (error) {
        console.error(error)
    } finally {
        console.log('* Tarea POST terminada.\n'.grey)
    }
}

function consultarTodosLosProd(){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            //.then(json=>console.log(json.slice(0,3)))
            .then(console.log(`GET lista completa de productos:\n`.bgBlue))
            .then(json=>json.forEach(producto => {
                console.log(`ID: ${producto.id}-`.blue,`${producto.title}
    Categoría: ${producto.category}`,` Precio $${producto.price}.`.green)
            }))
            .catch((err) => console.error('Error:',err))
            .finally(()=>console.log(" *Esta es la lista completa de productos.\n".grey))
}

async function eliminarProdEspecif(identif) {
    const config ={
        method:"DELETE"
    }
    try {
        const result = await fetch(`https://fakestoreapi.com/products/${identif}`,config)
        .then((response) => response.json())
        .then(console.log(`Se eliminará el producto con Id ${identif} a la lista.`.bgRed))
        //.then(data=>console.log(data))
        .then((data)=>{
            for (let clave in data) {
                console.log(`${clave}:`.red,`${data[clave]}`);
            }
        })
    } catch (error) {
        console.error(error)
    } finally {
        console.log('* Tarea DELETE terminada.\n'.grey)
    }
}

function menu(){
    console.log(
"MENU:\n".bgMagenta,
`- Coloque ${`npm start GET`.magenta} para ver la lista completa de productos.\n - ${`npm start GET y el número del producto`.magenta} para obtenerlo.\n - ${`npm start POST el producto, el precio y la categoría`.magenta} para crearlo.\n - ${`npm start DELETE y el número del producto`.magenta} para eliminarlo.\n`);
}

switch (comando1.toUpperCase()) {
    case "MENU":
        menu()
        break;
    case "GET":
        //console.log("Get: realiza petición asíncrona \ny devuelve la lista completa de productos.".bgGreen);
        if(comandos[0]==undefined){
            consultarTodosLosProd()
            break;
        }else if(comandos[0]){
            consultarProdEspecif(comandos[0])
            break;
        }
    case "POST":
        crearProdEspecif(comandos[0],comandos[1],comandos[2])
        //console.log("Post: realiza una petición post \npara agregar un nuevo producto.".bgGreen);
        break;
    case "DELETE":
        //console.log("Delete: elimina el producto.".bgGreen);
        eliminarProdEspecif(comandos[0])
        break;
    default:
        console.log(`Escribió ${comando1}.`,"Comando no válido.".red);
        menu()
        break;
}
