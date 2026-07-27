// ===== VARIABLES =====
let banco = [];
let indice = 0;
let puntaje = 0;
let tiempo = 900; // 15 minutos

// ===== MEZCLAR ARRAY =====
function mezclar(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// ===== INICIAR =====
window.onload = () => {

    banco = mezclar(preguntas);

    document.getElementById("btnComenzar").onclick = iniciar;

};

// ===== INICIAR EXAMEN =====
function iniciar(){

    document.getElementById("bienvenida").style.display="none";

    document.getElementById("evaluacion").style.display="block";

    iniciarCronometro();

    mostrarPregunta();

}

// ===== CRONÓMETRO =====
function iniciarCronometro(){

setInterval(()=>{

tiempo--;

let min=Math.floor(tiempo/60);

let seg=tiempo%60;

document.getElementById("cronometro").innerHTML=

`${min}:${seg.toString().padStart(2,"0")}`;

if(tiempo<=0){

finalizar();

}

},1000);

}

// ===== MOSTRAR PREGUNTA =====
function mostrarPregunta(){

let p=banco[indice];

document.getElementById("numero").innerHTML=

`Pregunta ${indice+1} de ${banco.length}`;

document.getElementById("pregunta").innerHTML=p.pregunta;

let zona=document.getElementById("respuestas");

zona.innerHTML="";

// OPCIONES

if(p.tipo=="opcion" || p.tipo=="caso"){

let opciones=mezclar(p.opciones);

opciones.forEach(op=>{

let b=document.createElement("button");

b.className="opcion";

b.innerHTML=op;

b.onclick=()=>responder(op);

zona.appendChild(b);

});

}

// VERDADERO/FALSO

else if(p.tipo=="verdadero"){

["Verdadero","Falso"].forEach(txt=>{

let b=document.createElement("button");

b.className="opcion";

b.innerHTML=txt;

b.onclick=()=>{

let valor=(txt=="Verdadero");

responder(valor);

};

zona.appendChild(b);

});

}

// RELLENAR

else{

let input=document.createElement("input");

input.placeholder="Escribe tu respuesta";

input.id="respuestaTexto";

zona.appendChild(input);

let b=document.createElement("button");

b.innerHTML="Responder";

b.onclick=()=>{

responder(document.getElementById("respuestaTexto").value);

};

zona.appendChild(b);

}

// Barra progreso

document.getElementById("barra").style.width=

`${((indice)/banco.length)*100}%`;

}

// ===== RESPONDER =====
function responder(valor){

let correcta=banco[indice].correcta || banco[indice].respuesta;

if(typeof(valor)=="string"){

if(valor.toLowerCase().trim()==correcta.toLowerCase().trim()){

puntaje++;

}

}else{

if(valor===correcta){

puntaje++;

}

}

indice++;

if(indice>=banco.length){

finalizar();

}else{

mostrarPregunta();

}

}

// ===== FINAL =====
function finalizar(){

let porcentaje=Math.round((puntaje/banco.length)*100);

document.getElementById("evaluacion").style.display="none";

document.getElementById("resultado").style.display="block";

document.getElementById("nota").innerHTML=

`${porcentaje}%`;

let mensaje="";

if(porcentaje>=90){

mensaje="🏆 ¡Excelente! Eres un experto en la Cultura Organizacional.";

}else if(porcentaje>=70){

mensaje="🎉 Muy buen trabajo. Continúa fortaleciendo tus conocimientos.";

}else{

mensaje="📚 Necesitas reforzar algunos temas y volver a intentarlo.";

}

document.getElementById("mensaje").innerHTML=mensaje;

if(typeof confetti==="function"){

confetti({

particleCount:250,

spread:180

});

}

}
