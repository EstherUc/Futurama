import { isInCrew, toggleCrewMember } from "../services/CrewStorageService.js";


function createCharacterCard(character) {

    ///// contenedor media (imagen) /////
    const media = document.createElement("div");
    media.classList.add("character-card__media");

    const img = document.createElement("img");
    img.classList.add("character-card__image");

    //Si la API no proporciona imagen (null) ponemos imagen 
    img.setAttribute("src",character.image || "./assets/img/sin_foto.png");

    img.setAttribute("width","60");
    img.setAttribute("height","60");
    img.setAttribute("alt",character.name);

    media.append(img);

    ///// contenedor información personaje /////
    const info = document.createElement("div");
    info.classList.add("character-card__info");

    //nombre
    const name = document.createElement("h2");
    name.classList.add("character-card__name");
    name.textContent = character.name;

    //párrafo detalles: especie y genero
    const details = document.createElement("p");
    details.classList.add("character-card__details");

    //especie
    const species = document.createElement("span");
    species.classList.add("character-card__species");
    species.textContent = character.species;

    //separador (el punto entre especie y género)
    const separator = document.createElement("span");
    separator.setAttribute("aria-hidden","true");
    separator.textContent = " - ";

    //género
    const gender = document.createElement("span");
    gender.classList.add("character-card__gender");
    gender.textContent = character.gender;

    //estado
    const status = document.createElement("span");
    status.classList.add("character-card__status");
    status.textContent = character.status;

    //comprobar si vienen datos de especie y género o UNKNOW para mostrar o no
    if(character.species !== "UNKNOWN"){
        details.append(species); //añadimos especie si se conoce
    }

    if(character.species !== "UNKNOWN" && character.gender !== "UNKNOWN"){
        details.append(separator); //añadimos el separador si se conoce especie y género
    }

    if(character.gender !== "UNKNOWN"){
        details.append(gender); //añadimos género si se conoce
    }

    if (character.status !== "UNKNOWN") {
        //Si ya existe especie o género añadimos separador
        if (details.childElementCount > 0) {
            const separatorStatus = document.createElement("span");
            separatorStatus.setAttribute("aria-hidden", "true");
            separatorStatus.textContent = " - ";

            details.append(separatorStatus);
        }

        details.append(status);
    }

    //añadir siempre el nombre
    info.append(name);

    //añadir los detalles solo si existe algún dato conocido
    if(character.species !== "UNKNOWN" || character.gender !== "UNKNOWN"){
        info.append(details);
    }

    ///// botón TODOS /////
    const btn = document.createElement("button");
    btn.classList.add("character-card__favorite");
    btn.setAttribute("type","button");
    btn.setAttribute("aria-pressed","false");

    //corazón favoritos
    const imgBtn = document.createElement("img");
    imgBtn.classList.add("character-card__heart");
    //imgBtn.setAttribute("src","./assets/icons/Corazon_vacio.png");
    imgBtn.setAttribute("width","35");
    imgBtn.setAttribute("height","35");
    imgBtn.setAttribute("alt","Corazón favorito vacío");

    //actualizar dibujo del corazón
    function updateHeart() {

        //comprobar si el personaje está en la tirpulación
        const isFavorite = isInCrew(character);
        
        if (isFavorite) {

            //corazón rosa si está en la tripulación
            imgBtn.setAttribute("src", "./assets/icons/Corazon_relleno_rosa.svg");
            btn.setAttribute("aria-pressed", "true");
            
        } else {
            //corazón vacío si no está
            imgBtn.setAttribute("src","./assets/icons/Corazon_vacio.png");
            btn.setAttribute("aria-pressed", false);
        }
    }

    //cuando se pulse el corazón
    btn.addEventListener("click", () => {

        //añadir o quitar del localStorage
        const result = toggleCrewMember(character);

        //si hay 6
        if (result === "full") {
            alert('Nave al completo!!! Ya tienes 6 tripulantes. Libera una plaza para añadir otro personaje a tu tripulación.')
        } else {
            //actualizar el corazón según el nuevo estado
            updateHeart();
        }
    });

    //al crear tarjeta mirar si ya es favorito
    updateHeart();


    btn.append(imgBtn);

    ///// article - contenedor principal que envuelve toda la tarjeta /////
    const article = document.createElement("article");
    article.classList.add("character-card");

    //meter todo al contenedor principal (hijos de article)
    article.append(media,info,btn);

    return article;
    
}


export default createCharacterCard;