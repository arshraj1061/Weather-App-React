import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Logout = (props) => {
const authCtx = useContext(AuthContext);

const clickHandler = () => {
    authCtx.logout();
}

    return <span onClick={clickHandler}>Logout</span>;
}

export default Logout;