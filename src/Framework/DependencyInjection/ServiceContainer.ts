import Service from "../../Domain/Service";
import ServiceContainerInterface, { ServiceType } from './ServiceContainerInterface';
import PokemonRepository from "../../Data/PokemonRepository";
import { PokemonClient } from "pokenode-ts";
import GetPokemonsUseCase from "../../Domain/UseCase/GetPokemonsUseCase";

export default class ServiceContainer implements ServiceContainerInterface {
  private services: Service[] = []

  constructor() {
    const pokemonRepository = new PokemonRepository(localStorage, new PokemonClient())
    const getPokemonsUseCase = new GetPokemonsUseCase(pokemonRepository)

    this.services = [
      pokemonRepository,
      getPokemonsUseCase
    ];
  }

  getService(name: ServiceType): any {
    const service = this.services.filter((service: Service) => service.getName() === name)

    if (service.length !== 1) {
      throw new Error(`Unexpected numbers of services found for name ${name}: ${service.length}`)
    }

    return service[0];
  }
}
