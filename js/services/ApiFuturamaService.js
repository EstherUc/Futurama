import { ApiError, CharacterNotFoundError } from "../errors/Errors.js";

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

    return result;
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

    return result;
    
  }

}


export default ApiFuturamaService;



