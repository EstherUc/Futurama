import ApiFuturamaService from "../services/ApiFuturamaService.js";
import createCharacterCard from "../components/CharacterCard.js";
import "../components/NavMenu.js";

const api = new ApiFuturamaService();

//para guardar los personajes que vienen de la API
let characters = [];

//contenedor donde se mostrarán las tarjetas 
const charactersContainer = document.getElementById("characters-container");

//formulario, buscador y desplegables
const filtersForm = document.getElementById("character-filters");
const searchInput = document.getElementById("character-search");
const speciesSelect = document.getElementById("filter-species");
const statusSelect = document.getElementById("filter-status");
const genderSelect = document.getElementById("filter-gender");


//cargar personajes de la api
async function loadCard() {
    try {
        //obtener los personajes de la API
        const result = await api.getCharacters();

        //console.log(result);

        //extraer el array de personajes
        characters = result.items;

        //console.log(characters);
        
        //rellenar las opciones de los filtros
        setSelectOptions(speciesSelect, "species");
        setSelectOptions(statusSelect, "status");
        setSelectOptions(genderSelect, "gender");

        //mostrar al inicio todos los personajes
        renderCharacters(characters);
        
    } catch (error) {
        console.error("Error al cargar los personajes:", error);

    }
}

//rellenar los desplegables con los datos de la API
function setSelectOptions(selector, property) {

    const values = new Set();

    //obtener los valores sin repetir
    characters.forEach(character => {
        const value = character[property];

        if (value && value !== "UNKNOWN") {
            values.add(value);
        }
    });

    //crear las opciones
    values.forEach(value => {

        const option = document.createElement("option");
        option.setAttribute("value",value);
        option.textContent = value;

        selector.append(option);
    });
}


//mostrar las tarjetas
function renderCharacters(characters) {

    //quitamos las tarjetas que se muestran (por si las hay de los filtros)
    charactersContainer.replaceChildren();

    //si no hay resultados, mostramos un mensaje
    if(characters.length === 0){

        const message = document.createElement("p");
        message.classList.add("characters__empty");
        message.textContent = "No se han encontrado personajes.";

        charactersContainer.append(message);
    }else{

        //recorremos los personajes filtrados
        characters.forEach(character => {

            //creamos tarjeta
            const card = createCharacterCard(character);

            //añadimos la tarjeta creada al contenedor
            charactersContainer.append(card);
        });
        
    }
    
}

//eventos del formulario
function setSearchForm() {
    
    //para que el Enter no envíe el formulario y recargue la pag
    filtersForm.addEventListener("submit", event => {

        event.preventDefault();
        applyFilters();
    });

    //Buscador - filtrar mientras escriben
    searchInput.addEventListener("input", () => applyFilters());

    //Especie - filtrar cuando se cambie la opción
    speciesSelect.addEventListener("change", () => applyFilters());

    //Estado
    statusSelect.addEventListener("change", () => applyFilters());

    //Genero
    genderSelect.addEventListener("change", () => applyFilters());

    //botón Todos - restablece el formulario (mostrando todos de nuevo)
    filtersForm.addEventListener("reset", event => filterCharacters());

}


//leer datos del formulario
function applyFilters() {

    const formData = new FormData(filtersForm);

    const search = formData.get("search").toLowerCase().trim();
    const species = formData.get("species");
    const status = formData.get("status");
    const gender = formData.get("gender");

    filterCharacters(search, species, status, gender);
}

//filtrar los personajes
function filterCharacters(search="",species="",status="",gender="") {
    
    //buscar pasando todo a minúsculas y quitando espacios
    const clearSearch = search.trim().toLocaleLowerCase();

    //un nuevo array con los personajes que cumplen todas las condiciones seleccionadas
    const filteredCharacters = characters.filter(character => {

        //FILTRO POR NOMBRE
        if(clearSearch) {

            const characterName = character.name.toLowerCase();

            if (!characterName.includes(clearSearch)) {
                return false;
            }
        }

        //FILTRO POR ESPECIE
        if(species !== "") {

            if (character.species !== species) {
                return false;
            }
        }

        //FILTRO POR ESTADO
        if(status !== "") {

            if (character.status !== status) {
                return false;
            }
        }

        //FILTRO POR GÉNERO
        if(gender !== "") {

            if(character.gender !== gender) {
                return false;
            }
        }

        //Si pasa todas las comprobaciones el personaje permanece en el array filtrado
        return true;
    });

    //se muestra solo los personajes que coinciden
    renderCharacters(filteredCharacters);


}


//formulario - eventos
setSearchForm();

//cargar las tarjetas con los personajes
loadCard();







