class ApiError extends Error{

    constructor(message,status){
        super(message);

        this.name= "ApiError";
        this.status = status;
    }
}

class CharacterNotFoundError extends ApiError{
    constructor(idCharacter) {
        super(`El personaje con ID ${idCharacter} no se ha encontrado`, 404);
        this.name = "CharacterNotFoundError";
    }
}



export {
    ApiError,
    CharacterNotFoundError
};