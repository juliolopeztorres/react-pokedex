import ServiceContainer from "../../../src/Framework/DependencyInjection/ServiceContainer"

test('Can load services', () => {
    expect(new ServiceContainer().getService('PokemonRepository')).not.toBeNull()
})

test('Load non-existing services throws errors', () => {
    expect(() => new ServiceContainer().getService('RandomService')).toThrowError(
        'Could not find service by name RandomService. Possibilities are: LocalStorage, PokemonRepository, GetPokemonsUseCase'
    )
})
