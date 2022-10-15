import { Fragment, memo, useRef, useState } from "react";
import Card from "../UI/Card";
import "./InputForm.css";
import { FaHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const InputForm = (props) => {
  const LocRef = useRef();
  const [Error, setError] = useState(null);

  const formSumbitHandler = async (event) => {
    event.preventDefault();
    const enteredLoc = LocRef.current.value;

    if (enteredLoc.trim().length === 0) {
      setError(`Please enter a Location.`);
      return;
    }

    props.place(enteredLoc);
  };

  const favHandler = (event) => {
    event.preventDefault();
    const place = LocRef.current.value;

    if (place.trim().length === 0) {
      setError(`Please enter a Location.`);
      return;
    }
    props.favourite(place);
  };

  return (
    <Fragment>
      <Card>
        <form>
          <div className="control-group">
            <div className="form-control">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" ref={LocRef} />

              <div className="form-actions">
                <button type="submit" onClick={formSumbitHandler}>
                  <FaSearch/>
                </button>
                <button onClick={favHandler}>
                  <FaHeart />
                </button>
              </div>
              {Error && (
                <p className="error-text">{Error}</p>
              )}
            </div>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default memo(InputForm);
