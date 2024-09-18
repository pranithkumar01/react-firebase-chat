import React, { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/fierbase'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../lib/fierbase'
import upload from '../lib/uploadfils'

export default function Login() {
    const [avtar,setavatar]=useState({
        file:null,
        url:""
    }
    )

    const [loading,setloading]=useState(false)

    const handleavatar =e=>{
        if(e.target.files[0]){
        setavatar({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
     }
    }


    const handleregistration =async (e)=>{
        e.preventDefault()
        setloading(true)
        const formData =new FormData(e.target)

        const {username,email,password}=Object.fromEntries(formData)
        
        try {
            const res =await createUserWithEmailAndPassword(auth,email,password)
            const imgUrl=await upload(avtar.file)

            // Add a new document in collection "cities"
            await setDoc(doc(db, "user", res.user.uid), {
  
              username,
              email,
              id:res.user.uid,
              avtar:avtar.url,
              blocked:[],
            });

            await setDoc(doc(db, "userchats", res.user.uid), {
  
              chats:[],
              
            });

toast.success("Account Created! you can Login now!")
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }finally{
          setloading(false)
        }

    }


   const handleLogin =async e=>{
    e.preventDefault()
    setloading(true)

    const formData =new FormData(e.target)

    const {email,password}=Object.fromEntries(formData)
    try {
      await signInWithEmailAndPassword(auth,email,password)
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }finally{
      setloading(false)
    }
   }
  

  return (
    <div className='login'>
      <div className="item">
        <h2>wellcome back,</h2>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder='email' name='email' />
            <input type="password" placeholder='password' name="password"/>
            <button disabled={loading}>{loading ?"Loading.." : "Login"}</button>
        </form>
      </div>
      <div className="seperetor"></div>
      <div className="item">
      <h2>Create an Account</h2>
        <form onSubmit={handleregistration}>
            <label htmlFor="file">  <img src={avtar.url || "/public/avatar.png"} alt="" />Upload my image</label>
            
        <input type="file" id='file' style={{display: "none"}} onChange={handleavatar}/>
            <input type="text" placeholder='Username'name='username' />
           
            <input type="text" placeholder='email' name='email' />
            <input type="password" placeholder='password' name="password"/>
            <button disabled={loading}>{loading ?"Loading.." : "Sign Up"}</button>
        </form>
      </div>
    </div>
  )
}
