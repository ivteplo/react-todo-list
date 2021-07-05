import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { TabView, TabBar } from './components/TabView'
import { Icon, homeIcon, tasksIcon, projectsIcon } from './Icons'
import Home from './pages/Home'

export default function Content() {
  return (
    <Router>
      <TabView>
        <TabBar>
          <Link className="button" to="/">
            <Icon icon={homeIcon} />
            <span>Home</span>
          </Link>
          <Link className="button" to="/tasks">
            <Icon icon={tasksIcon} />
            <span>Tasks</span>
          </Link>
          <Link className="button" to="/projects">
            <Icon icon={projectsIcon} />
            <span>Projects</span>
          </Link>
        </TabBar>
        <Route exact path="/" component={Home} />
      </TabView>
    </Router>
  )
}
