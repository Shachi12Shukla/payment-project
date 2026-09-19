import {Outlet} from "react-router-dom"
import "./appLayout.css"
import SideBar from "../components/SideBar"

const AppLayout = () => {

  return (
    <div className='app-layout'>
      
      <SideBar/>

      <main className='main-content'>
        <Outlet/>
      </main>

    </div>
  )
}

export default AppLayout
