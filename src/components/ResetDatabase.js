import { addDoc, collection, getFirestore } from "firebase/firestore";

export const ResetDatabase = () => {
    const db = getFirestore();

    const saveDataToFirestore = async () => {
        await addDoc(collection(db, "registry"), 
            {
                santaId: "friends",
                families: [
                    {
                        familyName: "Apartment 20",
                        members: [
                            "Monica",
                            "Rachel"
                        ]
                    },
                    {
                        familyName: "Apartment 19",
                        members: [
                            "Chandler",
                            "Joey"
                        ]
                    },
                    {
                        familyName: "Apartment 3B",
                        members: [
                            "Ross",
                        ]
                    }
                ]
            }
        );
        alert("Document written to Database");
    };

    return(
        <>
            <h1>Reset database to the original state</h1>
            <button onClick={saveDataToFirestore}>Reset</button>
        </>

    );
};