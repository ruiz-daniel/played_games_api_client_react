import { Link, useLocation } from 'react-router-dom'

export const Sidebar = ({ children }) => {
  return <div className="flex flex-column gap-3"> {children} </div>
}

export const SidebarHeader = ({ children, className }) => {
  return <section id="sidebar-header" className={className}> {children} </section>
}

export const SidebarContent = ({ children, className }) => {
  return <section id="sidebar-content" className={className}> {children} </section>
}

export const SidebarItem = ({ children, onClick, className }) => {
  return <div className={className} onClick={onClick}> {children} </div>
}

export const SidebarLink = ({ children, onClick, linkTo }) => {
  const location = useLocation()
  return (
    <div className="menu-item">
      <Link
        onClick={onClick}
        to={linkTo}
      >
        <h3
          className={
            location.pathname.includes(linkTo)
              ? 'router-view'
              : ''
          }
        >
          {children}
        </h3>
      </Link>
    </div>
  )
}
