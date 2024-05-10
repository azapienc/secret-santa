import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

const db = getFirestore();

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
