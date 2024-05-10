import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/actions/santaActions";
import { useNavigate } from "react-router-dom/dist";
import { FamilyCard } from "./FamilyCard";

export const Dashboard = () => {
    const { data } = useSelector(store => store.santa);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const db = getFirestore();

    const saveDataToFirestore = async () => {
        const docRef = await addDoc(collection(db, "myCollection"), 
            {
                santaId: "friends",
                families: [
                    {
                        familyName: "Women",
                        members: [
                            "Monica",
                            "Rachel"
                        ]
                    },
                    {
                        familyName: "Men",
                        members: [
                            "Chandler",
                            "Ross",
                            "Joey"
                        ]
                    }
                ]
            }
        );
        alert("Document written to Database");
    };

    const handleReset = async () => {
        dispatch(reset());
        navigate("/");
    };

    return (
        <div className='container-sm'>
            <h1>Dashboard</h1>
            <h1>Save Data to Firebase Firestore</h1>
            <button onClick={saveDataToFirestore}>Save to Firestore</button> <br /><br />
            <button onClick={handleReset}>This is not mine</button> <br /><br />

            <h1>Dashboard</h1>
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
    )
}
