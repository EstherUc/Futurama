import { ApiError, CharacterNotFoundError } from "../errors/Errors.js";
import Character from "../models/Character.js";

const API_URL = "https://futuramaapi.com/api";
class ApiFuturamaService {

  //obtener todos los personajes
  async getCharacters(){
    const url = `${API_URL}/characters`;

    const response = await fetch(url);

    if(!response.ok){
      throw new ApiError("No se han podido obtener los personajes",response.status);
    } 

    const result = await response.json(); 
    const characters = result.items.map(item => Character.fromJson(item));

    //devuelve un objeto result nuevo, que copia las propiedades de result pero sustituyendo items por el array characters
    //esto lo hago para tener los datos de la paginación, a parte de todos los personajes (items: characters)
    return {...result, items: characters};
  }


 //obtener un personaje específico (Por id)
async getCharacterById(idCharacter){
    const url = `${API_URL}/characters/${idCharacter}`;

    const response = await fetch (url);

    if (response.status === 404) {
      throw new CharacterNotFoundError(idCharacter);
      
    }

    if(!response.ok){
      throw new ApiError("Error al obtener el personaje", response.status);
    }

    const result = await response.json();

    return Character.fromJson(result);
    
  }

}


export default ApiFuturamaService;



