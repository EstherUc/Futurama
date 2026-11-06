const MAX_CREW = 6;

//obtener los tripulantes guardados
function getCrewFromLocalStorage() {
    
    const crewString = localStorage.getItem("planetExpressCrew") || "[]";

    const crew = JSON.parse(crewString);

    return crew;

}

//guardar los tripulantes
function saveCrewToLocalStorage(crew) {

    const crewString = JSON.stringify(crew);
    localStorage.setItem("planetExpressCrew",crewString);
}

//comprobar si un personaje ya está en la tripulación
function isInCrew(character) {

    const crew = getCrewFromLocalStorage();

    const oldMember = crew.find(member => member.idCharacter === character.idCharacter);

    if(oldMember){
        return true;
    }else{
        return false;
    }
    
}

//añadir o quitar personaje al pulsar el corazoncito
function toggleCrewMember(character) {

    const crew = getCrewFromLocalStorage();

    //buscar si ya está en Mi tripulación
    const oldMemberIndex = crew.findIndex(member => member.idCharacter === character.idCharacter);

    //si ya está lo quitamos
    if (oldMemberIndex !== -1) {

        crew.splice(oldMemberIndex,1);
        saveCrewToLocalStorage(crew);

        return "removed";

    } else {
        //si no está comprobamos que quede hueco
        if (crew.length >= MAX_CREW) {
            return "full";
        }

        //añadir personaje
        crew.push(character);

        saveCrewToLocalStorage(crew);

        return "added";
    }
}


//eliminar tripulante 
function removeCrewMember(character) {
    
    const crew = getCrewFromLocalStorage();

    const oldMemberIndex = crew.findIndex(member => member.idCharacter === character.idCharacter);

    if (oldMemberIndex !== -1) {
        crew.splice(oldMemberIndex,1);
        saveCrewToLocalStorage(crew);
    }

}

//vaciar toda la tripulación
function clearCrew() {
    localStorage.setItem("planetExpressCrew", "[]");
}

export{
    getCrewFromLocalStorage,
    saveCrewToLocalStorage,
    isInCrew,
    toggleCrewMember,
    removeCrewMember,
    MAX_CREW,
    clearCrew
}