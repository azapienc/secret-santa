import { useDispatch, useSelector } from "react-redux";
import { reset, sort } from "../redux/actions/santaActions";
import { useNavigate } from "react-router-dom/dist";
import { FamilyCard } from "./FamilyCard";

export const Dashboard = () => {
    const { santaId, data, result } = useSelector(store => store.santa);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleReset = async () => {
        dispatch(reset());
        navigate("/");
    };

    const handleSort = async () => {
        dispatch(sort(santaId));
        // navigate("/results");
    };

    return (
        <div className='container-sm'>
            <h1>this is the secret santa for <b>{santaId}</b> family</h1>
            <button
                className="btn btn-secondary"
                onClick={handleReset}
            >back</button> <br /><br />
            <button
                className="btn btn-primary"
                onClick={handleSort}
            >Sort it!</button> <br /><br />
            <h1>these are the families that are participating</h1>
            <div className="row">
                {data && Object.keys(data).map(family =>
                    <FamilyCard
                        key={family}
                        familyData={
                            {
                                name: family,
                                members: data[family]
                            }
                        }
                    />
                )}
            </div>
            {!!Object.keys(result).length && (<h2>Here are the results</h2>)}
            {result && Object.keys(result).map(giver =>
                <>
                    <p>{`${giver} gives to ${result[giver]}`}</p>
                </>
            )}
        </div>
    )
}
