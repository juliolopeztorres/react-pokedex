
export type ServiceType = 'GetPokemonsUseCase' | 'PokemonRepository' | string

export default interface ServiceContainerInterface {
  getService(name: ServiceType): any;
}
