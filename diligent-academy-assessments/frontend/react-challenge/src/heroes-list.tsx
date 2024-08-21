import { useState, useEffect } from "react";
import { callApi } from "./call-api";
import './main.css';

const useFetch = (route: string) => {
  const [heroes, setHeroes] = useState([] as any);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  useEffect(() => {
    callApi(route)
      .then(heroData => {
        setHeroes(heroData);
        setLoading(false);
      })
      .catch(error => {
        setIsFailed(true);
      })
  }, [route]);

  return { heroes, setHeroes, loading, isFailed };
}

function HeroesList() {
  const { heroes, setHeroes, loading, isFailed } = useFetch("heroes");

  const handleClick = async (id: number) => {
    setHeroes(heroes.map((hero: any) => {
      if (hero.id === id) {
        return { ...hero, available: !hero.available };
      };

      return hero;
    }));
  };

  return (
    <>
      <h2>Heroes</h2>
      {isFailed && (<h2>Failed to fetch heroes</h2>)}
      {loading ? (<h3>Loading</h3>) :
        <div className="heroesContainer">
          <ul className="heroesList">
            {heroes.map((hero: any) => (
              <li className="heroItem" key={hero.id} onClick={() => handleClick(hero.id)}
                style={hero.available ? { color: 'green' } : { color: 'red' }}>
                {hero.id}. {hero.name} {hero.available && (<p>"Available"</p>)}</li>
            ))}
          </ul>
        </div>
      }
    </>
  );
}

export default HeroesList;
