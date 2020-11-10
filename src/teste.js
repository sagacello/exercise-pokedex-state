import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import "./App.css";

class Pokedex extends React.Component {
    constructor() {
      super();
      this.state = {pokemonIndex: 0, filtraTipo: 'all'}
    }
    filtrarPorTipo(filtraTipo) {
        this.setState({pokemonIndex:0, filtraTipo})
    }
    pokemomSeguinte(indexPokemon) {
        this.setState(state => ({
            pokemonIndex: (state.pokemonIndex + 1) % indexPokemon
        }));
    }
    filtrandoPokemons() {
        const {pokemons} = this.props
        const {filtraTipo} = this.state
        if (filtraTipo === 'all') return true;
        return filtraTipo === pokemons.type
    }

    listaTipos() {
        const {pokemons} = this.props
        return [... new Set(pokemons.reduce((acc, {type}) => 
            [...acc , type], []))]
    }
    render() {
        const pokemonsFiltrados = this.filtrandoPokemons();
        const tipos = this.listaTipos();
        const cadaPokemon = pokemonsFiltrados[this.state.pokemonIndex]
        return (
          <div>
                <Pokemon pokemon={pokemon} />
            <div>
                <Button onClick={() => this.filtrarPorTipo('all')} >
                    ALL
                </Button>
            </div>
          </div>
        )
    }

}



export default Pokedex;