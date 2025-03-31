import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon";
    const [pokemon, setPokemon] = useState([]);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPokemon = async() =>{
        try{
            const res = await axios.get(API);
            const data = await res.data;

            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const curData = await fetch(curPokemon.url);
                const pokData = await curData.json();
                return pokData;
            })

            const detailedResponse = await Promise.all(detailedPokemonData);
            console.log(detailedResponse);
            setPokemon(detailedResponse);
            setNext(data?.next);
            setPrevious(data?.previous);
        }
        catch(error){
            console.log(error);
        }
    }

    const fetchNextPokemon = async() =>{
      setLoading(true);
      try{
        const res = await axios.get(next);
        const data = await res.data;

        const pokemonNextDetails = data?.results.map(async(item) => {
          const details = await axios.get(item.url);
          return details;
        })

        const detailResponse = await Promise.all(pokemonNextDetails);
        setPokemon(detailResponse);
        setNext(data?.next);
        setPrevious(data?.previous);
      }
      catch(error){
        console.log(error);
      }
      setLoading(false);
    }

    const fetchPreviousPokemon = async() =>{
      setLoading(true);
      try{
        const res = await axios.get(previous);
        const data = await res.data;

        const pokemonNextDetails = data?.results.map(async(item) => {
          const details = await axios.get(item.url);
          return details;
        })

        const detailResponse = await Promise.all(pokemonNextDetails);
        setPokemon(detailResponse);
        setNext(data?.next);
        setPrevious(data?.previous);
      }
      catch(error){
        console.log(error);
      }
      setLoading(false);
    }

    useEffect(() => {
      fetchPokemon();
    },[]);

    useEffect(() => {
      setNext(next);
      setPrevious(previous);
    },[next, previous])

    return (
      <>
        <div className="card-container">
          {
            pokemon?.map((item) => (
              <div className="card border-dark mb-3" key={item.data ? `${item.data.id}-${item.data.name}` : `${item.id}-${item.name}`}>
                <Link to={item.data ? `/pokemon-description/${item.data.id}` : `/pokemon-description/${item.id}`} className="card-body text-dark" >
                  { item.data ? <img src={item.data.sprites.other.home.front_default} alt="image..." className="pok-img" /> : <img src={item.sprites.other.home.front_default} alt="image..." className="pok-img" /> }
                </Link>
                <div className="card-header">{item.data ? item.data.name.toUpperCase() : item.name.toUpperCase()}</div>
              </div>
            ))
          }
        </div>
        <div className="buttons">
          { previous ? <button type="button" className="btn bg-danger btn-prev" onClick={fetchPreviousPokemon} disabled={loading}>{loading ? "loading..." : "Previous"}</button> : "" }
          { next ? <button type="button" className="btn bg-primary btn-next" onClick={fetchNextPokemon} disabled={loading}>{loading ? "Loading.." : "Next"}</button> : "" }
        </div>
      </>
    );
};

export default Pokemon;