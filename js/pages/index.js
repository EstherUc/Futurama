import ApiFuturamaService from "../services/ApiFuturamaService.js";
import "../components/NavMenu.js";
import Character from "../models/Character.js";

const api = new ApiFuturamaService();

async function init() {
  try {
    const data = await api.getCharacters();

    console.log(data);
    console.log(data.items);
    console.log(data.total);
    console.log(data.pages);
    
    

    const character = await api.getCharacterById(1);
    


    console.log(character);
    
  } catch (error) {
    //console.error(error);
    console.error(error.name);
    console.error(error.message);
    console.error(error.status);
  }
}

init();