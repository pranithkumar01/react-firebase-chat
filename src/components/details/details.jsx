
import React from 'react'
import "./details.css"
import { auth, db } from '../../lib/fierbase'

import { usechatstore } from '../../lib/chatstore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useUserstore } from '../../lib/userslot'

function Details() {

  const { chatId,user,isCurrentuseblocked, isreceverblocked,changeblock}=usechatstore()
  const {currentuser}=useUserstore()
  const handleblock =async()=>{
    if(!user)return;
    const userDocref=doc(db,"user",currentuser.id)
    
    try {
      await updateDoc(userDocref,{
        blocked:isreceverblocked ? arrayRemove(user.id) :arrayUnion(user.id)
      })
      changeblock()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='details'>
      <div className="user">
        <img src={user?.avtar ||"/public/avatar.png"} alt="" className='profileindetails'/>
        <h2>{user?.username }</h2>
        <p>Lorem ipsum, dolor sit amet cons. ?</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>chat settings</span>
            <img src="/public/arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>privacy & help</span>
            <img src="/public/arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>shared phots</span>
            <img src="/public/arrowDown.png" alt="" />
            </div>
            <div className="photos">
              <div className="photitem">
                <div className="photodetails">
                <img src="https://th.bing.com/th/id/OIP.RCEGnPWOmOAmGk9yeaHVJAHaEo?rs=1&pid=ImgDetMain" alt=""  />
                <span>photos_2024.png</span>
            <div>
              <img src="/public/download.png" alt="" className='icon'/>
            </div>
            </div>
                          </div>

            </div>
            <div className="photos">
              <div className="photitem">
                <div className="photodetails">
                <img src="https://th.bing.com/th/id/OIP.RCEGnPWOmOAmGk9yeaHVJAHaEo?rs=1&pid=ImgDetMain" alt=""  />
                <span>photos_2024.png</span>
            <div>
              <img src="/public/download.png" alt="" className='icon'/>
            </div>
            </div>
                          </div>

            </div>
            <div className="photos">
              <div className="photitem">
                <div className="photodetails">
                <img src="https://th.bing.com/th/id/OIP.RCEGnPWOmOAmGk9yeaHVJAHaEo?rs=1&pid=ImgDetMain" alt=""  />
                <span>photos_2024.png</span>
            <div>
              <img src="/public/download.png" alt="" className='icon'/>
            </div>
            </div>
                          </div>

            </div>
            <div className="photos">
              <div className="photitem">
                <div className="photodetails">
                <img src="https://th.bing.com/th/id/OIP.RCEGnPWOmOAmGk9yeaHVJAHaEo?rs=1&pid=ImgDetMain" alt=""  />
                <span>photos_2024.png</span>
            <div>
              <img src="/public/download.png" alt="" className='icon'/>
            </div>
            </div>
                          </div>

            </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="/public/arrowUp.png" alt="" />
           
          </div>
        </div>

      </div>
      <button onClick={handleblock}>{isCurrentuseblocked ? 'your Blocked ' : isreceverblocked?'user blocked': "block user"}</button>
      <button  className='logout' onClick={()=> auth.signOut()}>Logout</button>
    </div>
  )
}

export default Details
