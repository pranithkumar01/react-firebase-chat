import React from 'react'
import "./userinfo.css"
import { useUserstore } from '../lib/userslot'
function Userinfo() {

  const {currentuser}=useUserstore()
  return (
    <div className='userinfo'>
     <div className='user'>
     <img src={currentuser.avtar } alt="" />
     <h2>{currentuser.username}</h2>
     </div>
     <div className='icons'>
      <img src="public/more.png" alt="" />
      <img src="public/video.png" alt="" />
      <img src="public/edit.png" alt="" />
     </div>
    </div>
  )
}

export default Userinfo
