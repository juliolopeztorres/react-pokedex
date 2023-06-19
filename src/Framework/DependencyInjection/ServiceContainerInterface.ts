
export type ServiceType = 'GetPokemonsUseCase' | 'PokemonRepository'

export default interface ServiceContainerInterface {
  getService(name: ServiceType): any;
}
