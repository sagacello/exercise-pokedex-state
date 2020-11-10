import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';
import "./App.css";


// o this so é econtrado dentro da class, ele faz referencia a todo o componete e tudo que ele tem 
// ele é um objetão que se refere aquele componente javascript
// entao TUDO QUE FOR FEITO DENTRO DAS CLASSES TEM QUE USAR O THIS , igual o self no python
class Pokedex extends React.Component {
  constructor() { // constructor é uma funçao ligada ao react que ja tem a forma dela 
    // a gente sobrescreve essa função com uma logica nossa
    super(); // super é a sintaxe que permite a gente escrever abaixo dele a logica desejada
    this.state = {pokemonIndex: 0, filteredType: 'all'};
    // this state represente o estado inicial 
    // nesse caso o estado inicial vai ser um objeto com duas informações
  }

  filterPokemons(filteredType) { // funcao de atualizaçao 1
    this.setState({filteredType, pokemonIndex: 0}); // this set.state é uma funçao assincrona
    // que deve sempre ser passada com dois argumentos , (anterior , e as props do componente )
    // assim eu garanto que as atualizações do estado acontecerão uma depois da outra!
    // essa função começa com (all , 0 )
    // funcao criada para selecionar na filtragem
  }

  nextPokemon(numberOfPokemons) { // funcao de atualizaçao 2
    this.setState(state => ({
      pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons,
      // recebe sempre um numero como parametro e atualiza o pokemonIndex que é o estado inicial +1 
      // e dividi isso pelo proprio numero de argumetno 
      // funcao criada para atualizaçao do estado inicial
    }));
  }

  fetchFilteredPokemons() {
    const {pokemons} = this.props; // vai receber as props de pokemom
    const {filteredType} = this.state; // vai receber o estado inicial 
    // faz uma destruction no estado inicial e pega o filteredType

    return pokemons.filter(pokemon => {
      if (filteredType === 'all') return true; // se o estado inicial for all
      return pokemon.type === filteredType;// se nao retorna o pokemon que tiver o mesmo tipo
    });
  }

  fetchPokemonTypes() {
    const {pokemons} = this.props;
    // recebo o array de objetos com odas informaçoes e retiro os tipos em uma nova lista
    return [...new Set(pokemons.reduce((types, {type}) => [...types, type], []))]
    // O objeto Set permite que você armazene valores únicos de qualquer tipo
    // so pode ter um tipo de valor , a sintaxe é new Set()
    // nese caso os valores serao os tipos de pokemons como string ! que nao podem se repetir
  }

  render() {
    const filteredPokemons = this.fetchFilteredPokemons(); // recebe todas informaçoes dos pokemons ou do pokemon
    const pokemonTypes = this.fetchPokemonTypes();// recebe uma lista com todos os tipos
    const pokemon = filteredPokemons[this.state.pokemonIndex];// recebe o pokemon especifico
    // cada pokemon vai ser o pokemon atualizado de acordom com objeto inicial
    //this.state = { pokemonIndex }

    return (
      <div className="pokedex">
        <Pokemon pokemon={pokemon} />
        <div className="pokedex-buttons-panel">
            
          <Button
          // Primeiro botao
            onClick={() => this.filterPokemons('all')}
            className="filter-button">
            All
          </Button>

          {pokemonTypes.map(type => (
              // chamo o array com todos os tipos
              // map para criar um botao para cada tipo filtrado
            <Button
              key={type}
              onClick={() => this.filterPokemons(type)}
              className="filter-button">
              {type}
            </Button>
          ))}
        </div>

        <Button
        // botão abaixo
          className="pokedex-button"
          onClick={() => this.nextPokemon(filteredPokemons.length)}
          // cada vez que eu aperto eu recebo um pokemon especifico
          disabled={filteredPokemons.length <= 1}>
          Próximo pokémon
        </Button>
      </div>
    );
  }
}

export default Pokedex;