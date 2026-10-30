import ApiFuturamaService from "../services/ApiFuturamaService.js";

const api = new ApiFuturamaService();

async function init() {
  try {
    const datos = await api.getCharacters();

    console.log(datos);
    console.log(datos.items);
  } catch (error) {
    console.error(error);
  }
}

init();