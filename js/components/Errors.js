class cantGetUrlError extends Error{

    constructor(){
        super("Error al obtener los personajes");
        this.name="cantGetUrlError";
    }
}





export{
    cantGetUrlError
}