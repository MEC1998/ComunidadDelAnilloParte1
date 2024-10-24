import Button from "./Button"

export const Sidebar = () => {
  return (
    <div className="sidebarContainer">
      <h2 className="title2">Empresas</h2>
      <ul className="sidebarItems">
        <li className="sidebarItem"><div className="sidebarItemText">Empresa1 <span className="sidebarItemTextDesc">Descripción</span></div>
          <div>
            <span className="material-symbols-outlined sidebarButton">
              info_i
            </span><span className="material-symbols-outlined sidebarButton">
              edit
            </span>
          </div>
        </li>
        <li className="sidebarItem"><div className="sidebarItemText">Empresa1 <span className="sidebarItemTextDesc">Descripción</span></div>
          <div>
            <span className="material-symbols-outlined sidebarButton">
              info_i
            </span><span className="material-symbols-outlined sidebarButton">
              edit
            </span>
          </div>
        </li>
        <li className="sidebarItem"><div className="sidebarItemText">Empresa1 <span className="sidebarItemTextDesc">Descripción</span></div>
          <div>
            <span className="material-symbols-outlined sidebarButton">
              info_i
            </span><span className="material-symbols-outlined sidebarButton">
              edit
            </span>
          </div>
        </li>
      </ul>
    </div>
  )
}
