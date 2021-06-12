import CreateTaskView from './CreateTaskView'
import TasksView from './TasksView'
import './Content.css'

export default function Content() {
  return (
    <>
      <h1 style={{ marginTop: '20px' }}>To do</h1>
      <CreateTaskView />
      <TasksView />
    </>
  )
}
