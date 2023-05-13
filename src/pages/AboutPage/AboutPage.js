import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

class AboutPage extends Component {
  state = { generations: [], selectedGenerations: [], pokemons: [] };

  componentDidMount() {
    this.fetchData('generation', 'generations', 8);
    this.fetchData('pokemon', 'pokemons');
  }

  fetchData = async (path, stateKey, limit) => {
    const { data } = await axios.get(`${BASE_URL}/${path}`);
    const result = limit ? data.results.slice(0, limit) : data.results;
    this.setState({ [stateKey]: result });
  };

  handleCheckboxChange = (e) => {
    const generationName = e.target.name;
    const { selectedGenerations } = this.state;
    const updatedSelectedGenerations = e.target.checked
      ? [...selectedGenerations, generationName]
      : selectedGenerations.filter((gen) => gen !== generationName);
    this.setState({ selectedGenerations: updatedSelectedGenerations });
  };

  render() {
    const { generations, selectedGenerations, pokemons } = this.state;

    const filteredPokemons = pokemons.filter((pokemon) =>
      selectedGenerations.includes(pokemon.generation.url.split('/').slice(-2, -1)[0])
    );

    return (
      <div>
        <h1>About Page</h1>
        <div>
          {generations.map((generation) => (
            <label key={generation.name}>
              <input
                type="checkbox"
                name={generation.url.split('/').slice(-2, -1)[0]}
                checked={selectedGenerations.includes(generation.url.split('/').slice(-2, -1)[0])}
                onChange={this.handleCheckboxChange}
              />
              {generation.name}
            </label>
          ))}
        </div>
        <div>
          {filteredPokemons.map((pokemon) => (
            <div key={pokemon.name}>{pokemon.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default AboutPage;
