import './TabView.css'

export const TabView: React.FC = ({ children }) => {
  return <div className="TabView">{children}</div>
}

export const TabBar: React.FC = ({ children }) => {
  return <div className="TabBar">{children}</div>
}

export default TabView
