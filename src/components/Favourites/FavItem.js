// import { useContext } from "react";
import { FaHeartBroken } from "react-icons/fa";
// import AuthContext from "../../store/auth-context";
import classes from "./FavItems.module.css";

const FavItem = (props) => {
  // const authCtx = useContext(AuthContext);
  const list = props.favs;

  const favList = [];

  for (const key in list) {
    favList.push(list[key].place);
  }

  const searchFavHandler = (event) => {
    const value = event.currentTarget.id;
    props.search(value);
  };

  const removeHandler = (event) => {
    props.remove(event.currentTarget.value);
    // authCtx.removeFavourite()

  };

  const ListFavourites = favList.map((fav) => (
    <span key ={fav}>
      <button
        className={classes.name}
        key={fav}
        id={fav}
        onClick={searchFavHandler}
      >
        {fav}
      </button>
      <button
        className={classes.heart}
        key={`${fav} + remove`}
        value={fav}
        onClick={removeHandler}
      >
        <FaHeartBroken />
      </button>
    </span>
  ));

  return ListFavourites;
};

export default FavItem;
