import { useDispatch } from "react-redux";
import { reset } from "../redux/actions/santaActions";

export const ResetState = () => {
    const dispatch = useDispatch();

    const handleReset = async () => {
        dispatch(reset());
        alert("state restored");
    };

    return(
            <button
                className="btn btn-secondary"
                onClick={handleReset}
            >reset state</button>
    );
};