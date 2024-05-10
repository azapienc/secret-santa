import { useDispatch, useSelector } from "react-redux";
import { reset, sort } from "../redux/actions/santaActions";
import { useNavigate } from "react-router-dom/dist";
import { FamilyCard } from "./FamilyCard";
import { Results } from "./Results";

export const Dashboard = () => {
    const { santaId, data, result, error } = useSelector(store => store.santa);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleReset = async () => {
        dispatch(reset());
        navigate("/");
    };

    const handleSort = async () => {
        dispatch(sort(santaId));
    };

    return (
        <div>
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <button
                        className="btn text-light back-button"
                        onClick={handleReset}
                    >back</button>
                </li>
            </ul>
            <div className='container-sm full-page'>
                <div className="row">
                    <h1 className="mt-5">this is the secret santa for <b>{santaId}</b> family</h1>
                    <h3 className="highlight-text">the families that are participating are...</h3>
                </div>
                <div className="row justify-content-center text-center mt-3">
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
                <div className="row justify-content-center">
                    <button
                        className="btn btn-primary sort-button border border-light"
                        onClick={handleSort}
                    >Sort it!</button>
                </div>
                <div className="row mt-3 justify-content-center">
                    {
                        !error && <Results secretSantaResuls={result} />
                    }
                    {!!error &&
                        <div className="alert alert-danger" role="alert">
                            too much computing for me, please retry or check the family structure
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
