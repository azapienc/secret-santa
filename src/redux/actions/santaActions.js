import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

export const search = (santaId) => async (dispatch) => {
  const db = getFirestore();
  const q = query(collection(db, "myCollection"), where("santaId", "==", santaId));
  const querySnapshot = await getDocs(q);
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
  console.log("result:", payload);
  return dispatch({type: "SEARCH_BY_SANTA_ID", payload});
}; 

export const reset = () => async (dispatch) => {
  return dispatch({type: "RESET_FOUND_RECORDS"});
}; 
