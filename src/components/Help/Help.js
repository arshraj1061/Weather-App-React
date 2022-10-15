import Card from "../UI/Card";
import classes from "./Help.module.css";

const Help = () => {
  return (
    <div className={classes.result}>
      <Card>
        <h2>Search</h2>
        <p>Enter the location in the space provided.</p>
        <p>Press 🔍 button.</p>
        <h2>Add a location to favourites:</h2>
        <p>Type the location in the space provided and press the ❤️ button.</p>
        <h2>Remove a location from favourites</h2>
        <p>Tap the corresponding 💔 button.</p>
      </Card>
    </div>
  );
};

export default Help;
