import PokemonRepository, { PokemonApiMin, PokemonClient } from "../../src/Data/PokemonRepository";
import { NamedAPIResourceList } from "pokenode-ts";
import Pokemon from "../../src/Domain/Model/Pokemon";
import PokemonDetail from "../../src/Domain/Model/PokemonDetail";
import BaseStat from "../../src/Domain/Model/BaseStat";
import Exception from "../../src/Domain/Model/Exception";

it('should get by generation without cache', async () => {
  expect(await (new PokemonRepository(
    new class implements Storage {
      [name : string] : any;

      readonly length : number = 0;

      clear() : void {
      }

      getItem(key : string) : string | null {
        expect(key).toBe('pokemon-1st')

        return null;
      }

      key(index : number) : string | null {
        return null;
      }

      removeItem(key : string) : void {}

      setItem(key : string, value : string) : void {
        expect(key).toBe('pokemon-1st')
        expect(value).toBe('[{"id":1,"name":"bulbasaur"}]')
      }

    },
    new class implements PokemonClient {
      getPokemonById(id : number) : Promise<PokemonApiMin> {
        throw new Error('Not implemented')
      }

      listPokemons(offset : number, limit : number) : Promise<NamedAPIResourceList> {
        expect(offset).toBe(0)
        expect(limit).toBe(151)

        return Promise.resolve({
          count: 1,
          next: null,
          previous: null,
          results: [{name: 'bulbasaur', url: 'http://my-url.domain/path/1'}]
        });
      }

    }
  ).getByGeneration('1st'))).toStrictEqual([new Pokemon(1, 'bulbasaur')])
})

it('should get by generation with cache', async () => {
  expect(await (new PokemonRepository(
    new class implements Storage {
      [name : string] : any;

      readonly length : number = 1;

      clear() : void {}

      getItem(key : string) : string | null {
        expect(key).toBe('pokemon-1st')

        return '[{"id": 1, "name": "bulbasaur"}]';
      }

      key(index : number) : string | null {
        return null;
      }

      removeItem(key : string) : void {}

      setItem(key : string, value : string) : void {}

    },
    new class implements PokemonClient {
      getPokemonById(id : number) : Promise<PokemonApiMin> {
        throw new Error('Not implemented')
      }

      listPokemons(offset : number, limit : number) : Promise<NamedAPIResourceList> {
        throw new Error('Not implemented')
      }

    }
  ).getByGeneration('1st'))).toEqual([new Pokemon(1, 'bulbasaur')])
})

it('should get by id', async () => {
  expect(await (new PokemonRepository(
    new class implements Storage {
      [name : string] : any;

      readonly length : number = 0;

      clear() : void {}

      getItem(key : string) : string | null {
        return null
      }

      key(index : number) : string | null {
        return null;
      }

      removeItem(key : string) : void {}

      setItem(key : string, value : string) : void {}

    },
    new class implements PokemonClient {
      getPokemonById(id : number) : Promise<PokemonApiMin> {
        expect(id).toBe(1)

        return Promise.resolve({
          id: 1,
          name: 'bulbasaur',
          types: [{type: {name: 'plant'}}],
          sprites: {back_default: 'back_default', back_shiny: 'back_shiny'},
          stats: [{stat: {name: 'hola'}, base_stat: 10}]
        })
      }

      listPokemons(offset : number, limit : number) : Promise<NamedAPIResourceList> {
        throw new Error('Not implemented')
      }

    }
  ).getById(1))).toEqual(new PokemonDetail(
    1,
    'bulbasaur',
    'https://img.pokemondb.net/artwork/vector/bulbasaur.png',
    ['plant'],
    ['back_default', 'back_shiny'],
    [new BaseStat('hola', 10)]
  ))
})

it('should reject when by generation with error', async () => {
  const expectedError = {
    error: 0,
    message: 'Error from Pokemon Client'
  }

  try {
    await (new PokemonRepository(
      new class implements Storage {
        [name : string] : any;

        readonly length : number = 0;

        clear() : void {}

        getItem(key : string) : string | null {
          return null
        }

        key(index : number) : string | null {
          return null;
        }

        removeItem(key : string) : void {}

        setItem(key : string, value : string) : void {}

      },
      new class implements PokemonClient {
        getPokemonById(id : number) : Promise<PokemonApiMin> {
          throw new Error('Not implemented')
        }

        listPokemons(offset : number, limit : number) : Promise<NamedAPIResourceList> {
          return Promise.reject(expectedError)
        }

      }
    ).getByGeneration('1st'))
  } catch (error: any) {
    expect(error).toBeInstanceOf(Exception)
    expect(error.message).toEqual('Error API Pokemon List')
    expect(error.context).toBeTruthy()
    expect(error.context).toEqual(expectedError)

    return
  }

  throw new Error('Expected Exception was not thrown')
})

it('should reject when by id with error', async () => {
  const expectedError = {
    error: 0,
    message: 'Error from Pokemon Client'
  }

  try {
    await (new PokemonRepository(
      new class implements Storage {
        [name : string] : any;

        readonly length : number = 0;

        clear() : void {}

        getItem(key : string) : string | null {
          return null
        }

        key(index : number) : string | null {
          return null;
        }

        removeItem(key : string) : void {}

        setItem(key : string, value : string) : void {}

      },
      new class implements PokemonClient {
        getPokemonById(id : number) : Promise<PokemonApiMin> {
          return Promise.reject(expectedError)
        }

        listPokemons(offset : number, limit : number) : Promise<NamedAPIResourceList> {
          throw new Error('Not implemented')
        }

      }
    ).getById(1))
  } catch (error: any) {
    expect(error).toBeInstanceOf(Exception)
    expect(error.message).toEqual('Error API Pokemon Detail')
    expect(error.context).toBeTruthy()
    expect(error.context).toEqual(expectedError)

    return
  }

  throw new Error('Expected Exception was not thrown')
})
