import React, { useState } from 'react'
import "./adduser.css"
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../lib/fierbase'
import { useUserstore } from '../../lib/userslot'
function Adduser() {

  const {currentuser}=useUserstore()
  const [user,setUser]=useState(null)

  const handleserch =async(e)=>{
    e.preventDefault()
    const formdata=new FormData(e.target)
    const username =formdata.get("username")

    try {
      const userRef=collection(db,"user")

      const q =query(userRef,where("username","==",username))

      const querysnapshot=await getDocs(q)

      if(!querysnapshot.empty){
        setUser(querysnapshot.docs[0].data())
      }

    } catch (err) {
      console.log(err)
    }
  }

  const handleadd =async()=>{
    const chatRef= collection(db,"chats")
    const userchatsRef=collection(db,"userchats")

    try {
      const newchatref=doc(chatRef)
      await setDoc(newchatref,{
        createdAt: serverTimestamp(),
        messages:[],
      }
      )

      await updateDoc(doc(userchatsRef,user.id),{
        chats:arrayUnion({
          chatId: newchatref.id,
          lastMessage:"",
          resiverId: currentuser.id,
          updatedat: Date.now()
        })
      })

      await updateDoc(doc(userchatsRef,currentuser.id),{
        chats:arrayUnion({
          chatId: newchatref.id,
          lastMessage:"",
          resiverId: user.id,
          updatedat: Date.now()
        })
      })

      console.log(newchatref.id);
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='adduser'>
     <form action="" onSubmit={handleserch}>
        <input type="text" placeholder='Username' name='username' />
        <button>Search</button>
     </form>
     {user && 
     <div className="usersli">
        <div className="detail">
            <img src={ user.avtar} alt="" />
            <span>{user.username}</span>
        </div>
        <button onClick={handleadd}>Add User</button>
     </div>
     }
    </div>
  )
}

export default Adduser
