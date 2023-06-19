import BaseStat from "./BaseStat";

export default class PokemonDetail {

  constructor(
    public id : number,
    public name : string,
    public image : string,
    public types : string[],
    public backSprites : string[],
    public baseStats : BaseStat[]
  ) {}
}
