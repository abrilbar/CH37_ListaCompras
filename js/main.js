let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody")[0]; // Corregido 'tem' a '[0]'
// Limpia toda la lista de compras incluyendo los campos

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let precio = 0;
let isValid = true; // Cambiado 'true' a minúscula
let contador = 0;
let costoTotal = 0;
let totalEnProductos=0;

let datos = new Array();

    btnClear.addEventListener("click", function(event) {
        event.preventDefault();
        txtNombre.value = "";
        txtNumber.value = "";
        alertValidacionesTexto.innerHTML = "";
        alertValidaciones.style.display = "none";
        txtNombre.style.border = "";
        txtNumber.style.border = ""; // Se corrigió el nombre de la variable de 'txtNmber' a 'txtNumber'
        contador = 0;
        costoTotal = 0;
        totalEnProductos = 0;
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)} `;
        localStorage.stItem("contadorProductos", contadorProductos);
        localStorage.stItem("totalEnProductos", totalEnProductos);
        localStorage.stItem("costoTotal", costoTotal);
        datos = new Array ();
        cuerpoTabla.innerHTML = "";
        txtNombre.focus();
});//btnClear


function validarCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    }//ifnlength
    if (isNaN(txtNumber.value)){
        return false;
    }//isNaN

    if(Number(txtNumber.value)<=0){
        return false;
    }//if

    return true;  
}//validarCantidad

function getPrecio(){
    return parseInt((Math.random() * 90) * 100) / 100; // Corregido 'parserInt' a 'parseInt'
}//getPrecio

btnAgregar.addEventListener("click", function(event) {
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";

    txtNombre.value = txtNombre.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if (txtNombre.value.length < 3) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", `
            El <strong>Nombre</strong> no es correcto <br/>
        `);
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red thin";
    } // if length < 3

    if (!validarCantidad()) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", `
            La <strong>Cantidad</strong> no es correcta.<br/>
        `);
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red thin";
        isValid = false;
   }//if !validarCantidad()
    if (isValid) {
        contador++;
        precio = getPrecio();
        row =  `<tr>
                <td>${contador}</td>
                <td>${txtNombre.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
            </tr>
            `;
            let elemento = `{"id" : ${contador}, 
                            "nombre" : "${txtNombre.value}",
                            "cantidad" : ${txtNumber.value},
                            "precio" : ${precio} 
        }`;
        datos.push(JSON.parse(elemento));
        console.log(datos);
        localStorage.setItem("datos", JSON.stringify(datos));
        //agregar los renglones a la tabla
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText = contador;
        totalEnProductos+= parseFloat(txtNumber.value);
        productosTotal.innerText= totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `${costoTotal.toFixed (2)}`;

        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

    }//if isValid


});//btnAgregar

window.addEventListener("load", function(event) {
    event.preventDefault();
    if (this.localStorage.getItem("contadorProductos") !== null) {
        contador = localStorage.getItem("contadorProductos");
        totalEnProductos = localStorage.getItem("totalEnProductos");
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    } //if != null 

    if (this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
            </tr>`;  
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });//foreach
    }//datos !null 

});//window load
