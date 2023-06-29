import ServiceContainerInterface, { ServiceType } from './ServiceContainerInterface';
import PokemonRepository from "../../Data/PokemonRepository";
import { PokemonClient } from "pokenode-ts";
import GetPokemonsUseCase from "../../Domain/UseCase/GetPokemonsUseCase";

export default class ServiceContainer implements ServiceContainerInterface {
  private readonly services: {[key in ServiceType]: unknown} = {}

  constructor() {
    const pokemonRepository = new PokemonRepository(localStorage, new PokemonClient())
    const getPokemonsUseCase = new GetPokemonsUseCase(pokemonRepository)

    this.services = {
      'LocalStorage': localStorage,
      'PokemonRepository': pokemonRepository,
      'GetPokemonsUseCase': getPokemonsUseCase,
    };
  }

  getService(name: ServiceType): any {
    if (!Object.keys(this.services).includes(name)) {
      throw new Error(
        `Could not find service by name ${name}. Possibilities are: ${Object.keys(this.services).join(', ')}`
      )
    }

    return this.services[name];
  }
}
