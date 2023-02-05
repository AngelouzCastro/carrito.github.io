//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


//Listeners
cargarEventListeners();
CargarCarrito();
function cargarEventListeners(){
    // Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click',comprarCurso);

    //cuando se elimina un curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);
}



//Funciones
// Funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del carrito
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}


//muestra el curso seleccionado en el carrito
function insertarCarrito(infoCurso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${infoCurso.imagen}" width=120>
        </td>
        <td>${infoCurso.titulo}</td>
        <td>${infoCurso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a>
         </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(infoCurso);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();
    
    let curso,
        cursoID;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }
    EliminarCursoLS(cursoID);
}

//Elimina los cursos del carrito en el DOM
function vaciarCarrito(){
   //forma lenta
   // listaCursos.innerHTML = '';
    
   //forma rapida (recomendada)
   while(listaCursos.firstChild){
       listaCursos.removeChild(listaCursos.firstChild);
   } 

   vaciarLocalStorage();
}

//Almacena cursos en el carrito a local storage

function guardarCursoLocalStorage(curso){
    let cursos;   

    //toma el valor de un arreglo con datos de LS o vacio
    cursos = ObtenerCursosLocalStorage();
    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos',JSON.stringify(cursos));
}


function ObtenerCursosLocalStorage(){
    let cursosLS;

    //Comprobamos si hay algo en local storage 
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}


//carga elementos de LocalStorage al carrito

function CargarCarrito(){
    let cursos;
    cursos = ObtenerCursosLocalStorage();
    
    cursos.forEach(function (curso){
        const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=120>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
         </td>
    `;
    listaCursos.appendChild(row);
    });
}


//Elimina elementos por id  de LocalStorage

function EliminarCursoLS(id) {
    let cursosLS;
    cursosLS = ObtenerCursosLocalStorage();
    
    cursosLS.forEach(function(cursillo, index) {
        if(cursillo.id === id){
            
            cursosLS.splice(index,1);
        }
    });

    localStorage.setItem('cursos',JSON.stringify(cursosLS));
}


//Elimina elementos del carrito de LocalStorage

function vaciarLocalStorage(){
    localStorage.clear();
}