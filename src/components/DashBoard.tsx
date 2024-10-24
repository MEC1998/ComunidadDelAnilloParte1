import { MainContent } from "./MainContent"
import { Sidebar } from "./Sidebar"

export const DashBoard = () => {
  return (
    <div className="dashboardContainer">
        <Sidebar></Sidebar>
        <MainContent></MainContent>
    </div>
  )
}
