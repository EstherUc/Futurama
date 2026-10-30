import { cantGetUrlError } from "../components/Errors.js";
class ApiFuturamaService {

  constructor() {
    this.baseUrl = "https://futuramaapi.com/api";
  }

  async getCharacters() {

    const response = await fetch(
      `${this.baseUrl}/characters?page=1&size=12`
    );

    if (!response.ok) {
      throw new cantGetUrlError;
    }

    const data = await response.json();

    return data;
  }
} 

export default ApiFuturamaService;

