import ApiFuturamaService from "../services/ApiFuturamaService.js";
import createCharacterCard from "../components/CharacterCard.js";
import "../components/NavMenu.js";


const api = new ApiFuturamaService();

async function loadCard() {
    try {
        //obtener los personajes de la API
        const result = await api.getCharacters();

        console.log(result);
        

        //extraer el array de personajes
        const characters = result.items;

        console.log(characters);
        

        //coger contenedor HTML
        const charactersContainer = document.getElementById("characters-container");

        //recorrer los personajes
        characters.forEach(character => {

            //crear la tarjeta del personaje
            const card = createCharacterCard(character);

            //añadir la tarjeta al HTML
            charactersContainer.append(card);
        });

    } catch (error) {
        console.error("Error al cargar los personajes:", error);
    }
}

loadCard();








