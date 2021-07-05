import CreateTaskView from '../CreateTaskView'
import TasksView from '../TasksView'

export const Home = () => (
  <div>
    <h1>Home</h1>
    <CreateTaskView quick />
    <TasksView />
  </div>
)

export default Home
