import CreateTaskView from './CreateTaskView'
import TasksView from './TasksView'

export default function Content() {
  return (
    <>
      <h1 style={{ marginTop: '2rem' }}>To do</h1>
      <CreateTaskView />
      <TasksView />
    </>
  )
}
