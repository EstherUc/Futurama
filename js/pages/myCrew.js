import "../components/NavMenu.js";
import { getCrewFromLocalStorage, removeCrewMember,MAX_CREW } from "../services/CrewStorageService.js";

//DOM

//contenedor de los 6 huecos
const crewContainer = document.getElementById("crew-container");

//elementos - Formando tripulación
const crewCount = document.getElementById("crew-container");
const crewTitle = document.getElementById("crew-status-title");
const crewMessage =  document.getElementById("crew-message");
const crewProgress = document.getElementById("crew-progress");

//Crear Tarjeta tripulante
function createCrewCard(character) {
    
    //contenedor principal 
    const card = document.createElement("article");
    card.classList.add("crew__slot", "crew__slot--filled");

    //imagen personaje
    const img = document.createElement("img");
    img.classList.add("crew__image");

    //imagen sin_foto.png si no tiene foto
    const fallbackImage = "./assets/img/sin_foto.png";

    img.setAttribute("src",character.image || fallbackImage);
    img.setAttribute("width","25");
    img.setAttribute("height","25");
    img.setAttribute("alt", character.name);

    //nombre
    const name = document.createElement("h3");
    name.classList("crew__name");
    name.textContent = character.name;

    card.append(img,name);

    //mostrar especie si tiene
    if(character.species && character.species !== "UNKNOWN"){

        const species = documento.createElement("p");
        species.classList.add("crew__species");
        species.textContent = character.species;

        card.append(species);
    }

    //botón eliminar al tripulante
    const removeButton = document.createElement("button");
    removeButton.classList.add("crew__remove");
    removeButton.setAttribute("type","button");
    removeButton.textContent = "x";

    //cuando pulsen a la X
    removeButton.addEventListener("click", () => {

        //eliminar personaje del localStorage
        removeCrewMember(character);

        //volver a pintar los huevos y el panel
        renderCrew();
    });

    card.append(removeButton);

    return card;

}


//crear hueco vacío
function createEmptySlot() {

    //link a explore
    const link = document.createElement("a");
    link.classList.add("crew__slot", "crew__slot--empty");
    link.setAttribute("href","./explore.html");

    //simbolo +
    const plus = document.createElement("span");
    plus.classList.add("crew__plus");
    plus.setAttribute("aria-hidden","true");
    plus.textContent = "+";

    //texto: Añadir tripulante
    const text = document.createElement("span");
    text.textContent = "Añadir tripulante";

    link.append(plus,text);

    return link;
    
}


//actualizar panel formando tripulación
function updateCrewStatus(crew) {
    
    //actualizar nº de tripulantes
    crewCount.textContent = crew.length;

    if (crew.length === 0) {
        
        crewTitle.textContent = "FORMANDO TRIPULACIÓN";
        crewMessage.textContent = "Tu aventura está a punto de comenzar! Recluta a tus primeros tripulantes.";

    }else if (crew.length === MAX_CREW){

        crewTitle.textContent = "TRIPULACIÓN COMPLETA";
        crewMessage.textContent = "Motores encendidos! Tu equipo está listo para conquistar la galaxia.";

    }else if(crew.length === MAX_CREW - 1){

        crewTitle.textContent = "TRIPULACIÓN CASI LISTA";
        crewMessage.textContent = "Solo queda una plaza. ¿Quién será tu último fichaje?";

    }else{

        crewTitle.textContent = "FORMANDO TRIPULACIÓN";
        crewMessage.textContent = "Tu equipo está creciendo! Sigue reclutando tripulantes para tus misiones.";
    }

    //seleccionar bolitas
    const dots = crewProgress.querySelectorAll(".crew-status__dot");

    //rellenar bolitas
    dots.forEach((dot,index) => {

        if (index < crew.length) {
            
            dot.classList.add("crew-status__dot--filled");

        }else{

            dot.classList.remove("crew-status__dot--filled");
        }

    });

}



