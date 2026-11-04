import ApiFuturamaService from "../services/ApiFuturamaService.js";
import createCharacterCard from "../components/CharacterCard.js";
import "../components/NavMenu.js";

const api = new ApiFuturamaService();

//para guardar los personajes que vienen de la API
let characters = [];

//para personajes que cumplen los filtros
let filteredCharacters = [];

//paginación
const limit = 14; //personajes por página
let page = 1; //para empezar en la primera pag

///// DOM /////
//contenedor donde se mostrarán las tarjetas 
const charactersContainer = document.getElementById("characters-container");

//formulario, buscador y desplegables
const filtersForm = document.getElementById("character-filters");
const searchInput = document.getElementById("character-search");
const speciesSelect = document.getElementById("filter-species");
const statusSelect = document.getElementById("filter-status");
const genderSelect = document.getElementById("filter-gender");

//paginación
const pagination = document.getElementById("pagination");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");

//para seleccionar los botones de las páginas
const pageButtons = document.querySelectorAll("#pagination [data-page]");


//cargar personajes de la api
async function loadCard() {
    try {
        //obtener los personajes de la API
        const result = await api.getCharacters();

        //console.log(result); //HACK

        //extraer el array de personajes
        characters = result.items;

        //console.log(characters); //HACK
        
        //para que al inicio no haya filtros aplicados
        filteredCharacters = characters
        
        //rellenar las opciones de los filtros
        setSelectOptions(speciesSelect, "species");
        setSelectOptions(statusSelect, "status");
        setSelectOptions(genderSelect, "gender");

        //mostrar al inicio todos los personajes HACK
        //renderCharacters(characters); //HACK

        //mostrar la primera página
        loadPage();
        
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

//mostrar los personajes de la página actual
function loadPage() {
    //calcular posición inicial
    const offset = getOffsetFromPage(page,limit);

    //seleccionar solo los personajes de esta pág
    const pageCharacters = filteredCharacters.slice(offset,offset + limit);

    //mostrar esas tarjetas
    renderCharacters(pageCharacters);

    //actualizar los botones de paginación
    updatePagination();
}

//calcular desde que posición empieza la pag
function getOffsetFromPage(page,limit){
    return (page - 1) * limit;
}

//actualizar aspecto y estado de los botones
function updatePagination(){

    //nº de páginas según los personajes filtrados
    const totalPages = getPageQuantity(filteredCharacters.length,limit);

    pagination.hidden = totalPages <= 1;

    //desactivar la flecha derech/izq en la pag 1 o última
    prevButton.disabled = page ===1;
    nextButton.disabled = page >= totalPages;

    //botones númericos
    pageButtons.forEach(button => {

        //leer nº del data-page
        const buttonPage = Number(button.dataset.page);

        //ocultar botones de pag que no existan
        button.hidden = buttonPage > totalPages;

        if (buttonPage === page && totalPages > 0) {
            
            //añadir la class del botón activo
            button.classList.add("paginaton__button--active");

        }else{
            button.classList.remove("paginaton__button--active"); //quitar class activa a los demás button
        }
    
    });

}

//calcular cuantas páginas necesitamos
function getPageQuantity(totalCountCharacters,limit){

    const totalPages = Math.ceil(totalCountCharacters/limit);

    return totalPages;
}

//eventos botones de paginación
function createPageListeners() {
    
    //flecha izq - pag anterior
    prevButton.addEventListener("click", () => {
        changePage(page -1);
    });

    //flecha derch - pag siguiente
    nextButton.addEventListener("click", () => {
        changePage(page + 1);
    });

    //Botones números
    pageButtons.forEach(button => {
        button.addEventListener("click", () => {
            //nº botón pulsado
            const selectedPage = Number(button.dataset.page);

            //ir a esa pag directo
            changePage(selectedPage);
        });
    });

}


//cambiar pag
function changePage(newPage){

    const totalPages = getPageQuantity(filteredCharacters.length,limit);

    //si existe la pag se cambia
    if (newPage >= 1 && newPage <= totalPages) {
        page = newPage;

        loadPage(); //mostrar personajes de la nueva pag
        
    }
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
    filtersForm.addEventListener("reset", () => filterCharacters());

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
    filteredCharacters = characters.filter(character => {

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

    //cada vez que se aplican filtros hay q volver a la pag 1
    page = 1;

    //mostrar la primera pag d ls resultados filtrados
    loadPage();


}



//formulario - eventos
setSearchForm();

//paginación - eventos
createPageListeners();

//ocultar paginación mientras no hay datos
updatePagination();

//cargar las tarjetas con los personajes
loadCard();







