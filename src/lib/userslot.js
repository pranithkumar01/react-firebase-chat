import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './fierbase';

export const useUserstore = create((set) => ({
  currentuser: null,
  isLoading:true,
 fetchuserinfo: async(uid)=>{
    if(!uid) return set({currentuser:null, isLoading:false})
        try {
        const docRef = doc(db, "user", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            set({currentuser:docSnap.data(),isLoading:false})
          } else {
            // docSnap.data() will be undefined in this case
            
            set({currentuser:null,isLoading:false})
          }
          
        } catch (err) {
            console.log(err)
            return set({currentuser:null, isLoading:false})
        }
 }
}))