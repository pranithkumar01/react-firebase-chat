import React, { useEffect } from 'react'
import "./chatlist.css"
import { useState } from 'react'
import Adduser from './adduser/adduser'
import { useUserstore } from '../lib/userslot'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../lib/fierbase'
import { usechatstore } from '../lib/chatstore'
function Chatlist() {
    const [addMode,setAddmode]=useState(false)
    const [chats,setchats]=useState([])
    const {currentuser}=useUserstore()
    const [input,setinput]=useState("")

    const {chatId,changechat}=usechatstore()

useEffect(()=>{
    const unSub =onSnapshot(doc(db, "userchats", currentuser.id,),async (res)=>{
        const items=res.data().chats;

        const promises =items.map(async(item)=>{
            const userRef=doc(db,"user",item.resiverId)
            const userSnap= await getDoc(userRef)

            const user=userSnap.data()

        return {...item,user}
        })
        const chatdata=await Promise.all(promises)
        setchats(chatdata.sort((a,b)=>b.updatedAt -a.updatedAt))
    
    }
)
    return ()=>{
        unSub()
    }
},[currentuser.id])

const handleselect=async(chat)=>{


    const userchatss=async(chat)=>{
        const userchat=chats.map((item)=>{
            const {user,...rest}=item
            return rest
        })
        const chatIndex=userchatss.findIndex((item)=>item.chatId === chat.chatId)
        userchatss[chatIndex].isSeen=true

        const userchatRef=doc(db,"userchats",currentuser.id)

        try {
            await updateDoc(userchatRef,{
                chats:userchatss,
            })
        } catch (err) {
            console.log(err);
            
        }
    }
    changechat(chat.chatId,chat.user)


}

const filterdchats=chats.filter((c)=>
c.user.username.toLowerCase().includes(input.toLowerCase()))


  return (
    
    <div className='chatlist'>
     <div className="search">
        <div className="searchBar">
            <img src="/public/search.png" alt="" />
            <input type="text" placeholder='search' onChange={(e)=>setinput(e.target.value)}/>
        </div>
        <img src={addMode ? "/public/minus.png": "/public/plus.png" }alt=""  className='add' onClick={()=>setAddmode((prev) =>!prev)}/>
     </div>
     {/* <div className="items">
        <img src="/public/avatar.png" alt="" />
        <div className="texts">
            <span>username</span>
            <p>hello</p>

        </div>
     </div> */}
      

     {/* {chats.map((chat)=>{
         <div className="items" key={chat.chatId}>
         <img src="/public/avatar.png" alt="" />
         <div className="texts">
         <span>{chats.username}</span>
             <p>{chats.lastMessage}</p>
 
         </div>
      </div>
     })} */}
     {filterdchats.map((chat) => (
    <div className="items" key={chat.chatId} onClick={()=>handleselect(chat)}
    style={{backgroundColor: chat?.isSeen ? "transparent": "#5183fe", }}>
        <img src={chat.user.blocked.includes(currentuser.id)? chat.user.avtar:"/public/avatar.png"} alt="" />
        <div className="texts">
            <span>{chat.user.blocked.includes(currentuser.id)? "user": chat.user.username}</span>
            <p>{chat.lastMessage}</p>
        </div>
    </div>
))}
     

    
     {addMode &&<Adduser/>}
    </div>
  )
}

export default Chatlist






