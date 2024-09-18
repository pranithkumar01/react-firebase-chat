import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './fierbase';
import { useUserstore } from './userslot';

export const usechatstore = create((set) => ({
  chatId: null,
  user:null,
  isCurrentuseblocked:false,
  isreceverblocked:false,
  changechat:(chatId,user)=>{
    const currentuser=useUserstore.getState().currentuser

    // check if current user is blocked

    if(user.blocked.includes(currentuser.id)){
       return set ({ 
        chatId,
        user:null,
        isCurrentuseblocked:true,
        isreceverblocked:false,
       })

    }

    // check if recever is blocked

  else if(currentuser.blocked.includes(user.id)){
        return set ({ 
         chatId,
         user:user,
         isCurrentuseblocked:false,
         isreceverblocked:true,
        })
     }else{
    return set ({ 
        chatId,
        user,
        isCurrentuseblocked:false,
        isreceverblocked:false,
       })}
    
  },



    // return set ({ 
    //     chatId,
    //     user,
    //     isCurrentuseblocked:false,
    //     isreceverblocked:false,
    //    })},
 
changeblock: ()=>{
    set((state)=>({...state,isreceverblocked: !state.isreceverblocked}))
}


}))