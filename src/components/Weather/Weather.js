import { memo, useCallback, useContext, useEffect, useState } from "react";
import sendRequest from "../../backend/back";
import FavItem from "../Favourites/FavItem";
import InputForm from "./InputForm";
import ResultWeather from "./ResultWeather";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";
import classes from "./Weather.module.css";
import AuthContext from "../../store/auth-context";

let message = "";

const Weather = () => {
  const authCtx = useContext(AuthContext);

  const [weather, setWeather] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [loadingFav, setLoadingFav] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);

  const url =
    "https://weather-app-6f65c-default-rtdb.firebaseio.com/favourites/";

  const fetchFavourites = useCallback(async () => {
    const response = await fetch(`${url}.json`);

    if (!response.ok) {
      throw new Error("Cannot fetch favourites.");
    }
    const data = await response.json();

    const userData = data[authCtx.localId];
    const FavList = [];

    for (const key in userData) {
      FavList.push({
        id: key,
        place: userData[key],
      });
    }

    if (FavList.length === 0) {
      message = "No Favourites Added";
      setLoadingFav(false);
      return;
    } else {
      setFavourites(FavList);
      setLoadingFav(false);
    }
  }, [authCtx.localId]);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const addFavouriteHandler = async (fav) => {
    // Add Favourites
    let existingItemIndex;
    setLoadingFav(true);
    for (const key in favourites) {
      if (favourites[key].place === fav) {
        existingItemIndex = key;
      }
    }

    if (existingItemIndex >= 0) {
      setLoadingFav(false);
      alert(`${fav} is alredy in favourites. `);
      return;
    }

    const response = await fetch(`${url}${authCtx.localId}.json`, {
      method: "POST",
      body: JSON.stringify(fav),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Cannot add to favourites.");
    }

    await fetchFavourites();
    setLoadingFav(false);
  };

  const removeFavouriteHandler = async (place) => {
    // Remove Favourites
    setLoadingFav(true);
    let indexOfPlace;
    for (const key in favourites) {
      if (favourites[key].place === place) {
        indexOfPlace = favourites[key].id;
      }
    }
    // eslint-disable-next-line
    const response = await fetch(
      `${url}${authCtx.localId}/${indexOfPlace}.json`,
      {
        method: "DELETE",
      }
    );
    await fetchFavourites();
    setLoadingFav(false);
  };

  const getWeatherHandler = async (value) => {
    setLoadingWeather(true); // Get Weather
    const data = await sendRequest(value);
    setWeather(data);
    setLoadingWeather(false);
  };

  return (
    <div className={classes.result}>
      <InputForm place={getWeatherHandler} favourite={addFavouriteHandler} />
      <Card>
        <header className={classes.heading}>Favourites</header>
        {loadingFav && (
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}
        {!loadingFav && favourites.length === 0 && <p>{message}</p>}
        {!loadingFav && favourites.length > 0 && (
          <FavItem
            favs={favourites}
            search={getWeatherHandler}
            remove={removeFavouriteHandler}
          />
        )}
      </Card>
      {loadingWeather && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!loadingWeather && weather && (
        <ResultWeather data={weather[0]} loc={weather[1]} />
      )}
    </div>
  );
};

export default memo(Weather);
