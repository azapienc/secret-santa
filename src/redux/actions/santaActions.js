import { addDoc, collection, getDocs, getFirestore, limit, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";

const db = getFirestore();

const secretSanta = (families) => {
    const assignments = {};

  // Flatten the array of families into a single array of participants
  const participants = Object.values(families).flatMap(members => members);
  console.log("participants:", participants);

  for (const familyName in families) {
    const familyMembers = families[familyName];
    const availableRecipients = [...participants];

    for (const giver of familyMembers) {
      // Filter out recipients from the same family
      const filteredRecipients = availableRecipients.filter(recipient => !families[giver] || !families[giver].includes(recipient));

      if (filteredRecipients.length === 0) {
        throw new Error(`Unable to assign a recipient for ${giver}. Check family members.`);
      }

      const recipientIndex = Math.floor(Math.random() * filteredRecipients.length);
      const recipient = filteredRecipients[recipientIndex];

      assignments[giver] = recipient;
      availableRecipients.splice(availableRecipients.indexOf(recipient), 1);
    }
  }

  return assignments;
};

export const search = (santaId) => async (dispatch) => {
  const registryQuery = query(
    collection(db, "registry"),
    where("santaId", "==", santaId)
  );
  const querySnapshot = await getDocs(registryQuery);
  const payload = {};
  querySnapshot.forEach((doc) => {
    const {families} = doc.data();
    families.forEach(family => {
      if(family.familyName in payload) {
        payload[family.familyName].push(family.members);
        return;
      }
        payload[family.familyName] = [family.members];
    })
  });
  return dispatch({type: "SEARCH_BY_SANTA_ID", santaId, payload});
}; 

export const sort = (santaId) => async (dispatch) => {
  console.log("---sorting", santaId);
  // queries
  const registryQuery = query(
    collection(db, "registry"),
    where("santaId", "==", santaId)
  );
  const registrySnapshot = await getDocs(registryQuery);
  const historyQuery = query(
    collection(db, "history"), 
    where("santaId", "==", santaId),
    limit(3)
  );
  const historySnapshot = await getDocs(registryQuery);

  // data mapping
  const registry = {};
  registrySnapshot.forEach((doc) => {
    const {families} = doc.data();
    families.forEach(family => {
      if(family.familyName in registry) {
        registry[family.familyName].concat(family.members);
        return;
      }
        registry[family.familyName] = family.members;
    })
  });
  const payload = secretSanta(registry);
  console.log("registry:", JSON.stringify(registry, null, 2));
  console.log("result:", JSON.stringify(payload, null, 2));

  return dispatch({type: "SET_RESULTS", payload});
}; 

export const reset = () => async (dispatch) => {
  return dispatch({type: "RESET_FOUND_RECORDS"});
}; 
