import Chats from "./components/chats/chats"
import Details from "./components/details/details"
import List from "./list/list"
import Login from "./login/Login"
import Notification from "./components/notification/notification.jsx"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/fierbase"
import { useUserstore } from "./lib/userslot"
import { usechatstore } from "./lib/chatstore"


const App = () => {
  const {chatId}=usechatstore()
  const {currentuser,isLoading,fetchuserinfo}=useUserstore()
  useEffect(()=>{
    const unSub= onAuthStateChanged(auth,(user)=>{
      if(!user){fetchuserinfo(user?.uid)} 
      else{
     fetchuserinfo(user?.uid)
    }
    })
    return ()=>{
      unSub()
    }
  },[fetchuserinfo])

console.log(currentuser)

  if(isLoading) return <div className="loading">Loading...</div>
  return (
    <div className='container'>
      {
        
        currentuser ? (<>
        <List/>
          {chatId &&<Chats/>}
          {chatId &&<Details/>}
          </>): (<Login/>)
      }
      <Notification/>
    </div>
  )
}

export default App