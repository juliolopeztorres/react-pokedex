
export type ServiceType = 'GetPokemonsUseCase' | 'PokemonRepository' | 'LocalStorage' | string

export default interface ServiceContainerInterface {
  getService(name: ServiceType): any;
}
