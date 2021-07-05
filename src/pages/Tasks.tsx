import CreateTaskView from '../CreateTaskView'
import TasksView from '../TasksView'

export const Tasks = () => {
  return (
    <div>
      <h1>Tasks</h1>
      <CreateTaskView />
      <TasksView />
    </div>
  )
}

export default Tasks
