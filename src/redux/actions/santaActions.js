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

class FamilyMember {
    constructor(name, familyId) {
        this.name = name;
        this.familyId = familyId;
        this.secretSanta = null;
    }
}

function assignSecretSanta(members) {
  let availableCandidates = new Set(members);
  for (const member of members) {
    let candidates = Array.from(availableCandidates).filter(candidate =>
      candidate !== member && candidate.familyId !== member.familyId);
    if (candidates.length === 0) {
      throw new Error("too much for me, please check the family");
    }
    let secretSanta = candidates[Math.floor(Math.random() * candidates.length)];
    member.secretSanta = secretSanta;
    availableCandidates.delete(secretSanta);
  }
}

export const sort = (santaId) => async (dispatch) => {
  const registryQuery = query(
    collection(db, "registry"),
    where("santaId", "==", santaId)
  );
  const registrySnapshot = await getDocs(registryQuery);
  const registry = {};
  registrySnapshot.forEach((doc) => {
    const { families } = doc.data();
    families.forEach(family => {
      family.members.forEach(member => {
        if (member in registry) { return; }
        registry[member] = family.familyName;
      })
    })
  });
  let members = Object.keys(registry).map(name => {
    return new FamilyMember(name, registry[name]);
  })
  try {
    assignSecretSanta(members);
    let payload = members.reduce((acc, member) => {
      acc[member.name] = member.secretSanta.name;
      return acc;
    }, {});
    console.log("payload:", payload);
    return dispatch({ type: "SET_RESULTS", payload });
  } catch (e) {
    console.error(e.message);
    const error = e.message;
    return dispatch({ type: "ASSIGNMENT_ERROR", error });
  }
};

export const reset = () => async (dispatch) => {
  return dispatch({type: "RESET_FOUND_RECORDS"});
}; 
