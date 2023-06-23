import ServiceContainer from "../../../src/Framework/DependencyInjection/ServiceContainer"

test('Can load services', () => {
    expect(new ServiceContainer().getService('PokemonRepository')).not.toBeNull()
})

test('Load non-existing services throws errors', () => {
    expect(() => new ServiceContainer().getService('RandomService')).toThrowError(
        'Unexpected numbers of services found for name RandomService: 0'
    )
})
