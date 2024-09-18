import React, { useEffect, useRef, useState } from 'react'
import "./chats.css"
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/fierbase'
import { usechatstore } from '../../lib/chatstore'
import { useUserstore } from '../../lib/userslot'
import upload from '../../lib/uploadfils'

function Chats() {
    const [open, setOpen]=useState(false)
    const [text,settext]=useState("")
    const endref =useRef(null)
    const [chat,setchat]=useState("")
    const [img,setimg]=useState({
        file:null,
        url:""
    })

    const {chatId,user,isCurrentuseblocked, isreceverblocked}=usechatstore()
    const {currentuser}=useUserstore()
    // useEffect(()=>{
    //     endref.current?.scrollIntoView({behavior: "smooth"})
    // },[])
    useEffect(() => {
        endref.current?.scrollIntoView({ behavior: "smooth" });
    }, []);



    useEffect(()=>{
        const unSub=onSnapshot(doc(db,"chats", chatId), (res)=>{
            setchat(res.data())
        })

        return ()=>{
            unSub()
        }
    },[chatId])
    console.log(chat)

    const handlemoji =e=>{
        settext((prv)=>prv+e.emoji)
        setOpen(false)
    }


    const handleimg =e=>{
        if(e.target.files[0]){
        setimg({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
     }
    }

    const handlesend=async()=>{
        if(text ==="")return;

        let imgurl=null


        try {

            if(img.file){
                imgurl=await upload(img.file)
            }

            await updateDoc(doc(db,"chats",chatId),{
                messages: arrayUnion({
                    senderId:currentuser.id,
                    text,
                    createdAt:new Date(),
                    ...(imgurl && {img:imgurl})
                })
            })

const userIds=[currentuser.id,user.id]

userIds.forEach(async(id)=>{


const userChatsef=doc(db,"userchats", id)
const userChatsssnapshot=await getDoc(userChatsef)

if(userChatsssnapshot.exists()){
    const userchats=userChatsssnapshot.data()
    const chatindex=userchats.chats.findIndex((c)=>c.chatId === chatId)
    userchats.chats[chatindex].lastMessage=text
    userchats.chats[chatindex].isSeen =id===currentuser.id ? true : false;
    userchats.chats[chatindex].updatedat=Date.now()

    await updateDoc(userChatsef,{
        chats:userchats.chats,
    })
}
})

        } catch (err) {
            console.log(err)
        }

        setimg({
            file:null,
            url:""
        })
        settext("")
    }

    
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
            <img src={user.avtar ||"/public/avatar.png"} />
            <div className="texts">
                <span>{user.username}</span>
                <p>Lorem ipsum dolor, sit amquod.</p>
            </div>
        </div>
        <div className="icons">
            <img src="/public/phone.png" alt="" />
            <img src="/public/video.png" alt="" />
            <img src="/public/info.png" alt="" />
        </div>
      </div>
      <div className="center">
       {chat?.messages?.map((messages)=>(
        <div className={messages.senderId ===currentuser?.id ?"message_own":"message"} key={messages?.createAt}>
            
            <div className="texts">
                {messages.img && <img src={messages.img} alt="" />}
                <p>{messages.text}</ p>
                {/* <span>{messages}</span> */}
            </div>
        </div>
        
       ))}
        

{img.url &&
       <div className="message_own">
        <div className="textss">
            <img src={img.url} alt="" />
        </div>
        </div>}

        <div ref={endref}></div>
      </div>
      <div className="bottom">
        <div className="icons">
            <label htmlFor="file">
            <img src="/public/img.png" alt="" />
            </label>
            <input type="file" id="file" style={{display:"none"}} onChange={handleimg}/>
            <img src="/public/camera.png" alt="" />
            <img src="/public/mic.png" alt="" />
        </div>
        <input type="text" placeholder={(isCurrentuseblocked || isreceverblocked )?"you cannot send message":'Type a message..'}value={text} onChange={(e)=> settext(e.target.value)} disabled={isCurrentuseblocked || isreceverblocked}/>
        <div className="emoji">
        <img src="/public/emoji.png" alt="" onClick={()=>setOpen((prv)=>!prv)}/>
        <div className="picker">
        <EmojiPicker open={open} onEmojiClick={handlemoji}/>
        </div>
        </div>
        <button className='sendbtn' onClick={handlesend} disabled={isCurrentuseblocked || isreceverblocked}>Send</button>
      </div>
    </div>
  )
}

export default Chats
