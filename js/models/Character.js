class Character {
  constructor(idCharacter,name,gender,species,image,status) {
    this.idCharacter = idCharacter;
    this.name = name;
    this.gender = gender;
    this.species = species;
    this.image = image;
    this.status = status;
  }

  static fromJson({id,name,gender,species,image,status})
{
  const character = new Character(id,name,gender,species,image,status);

  return character;
}

}

export default Character;

