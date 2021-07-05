import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { Icon, circleIcon, checkedCircleIcon, trashIcon } from './Icons'
import firebase from 'firebase/app'
import { TaskInfo } from './TaskInfo'
import Spinner from './components/Spinner'
import './TasksView.css'

export default function TasksView() {
  const user = useUser()
  const collection = useFirestore()
    .collection(`users/${user.data.uid}/tasks`)
    .orderBy('priority')
    .orderBy('createdAt')

  const tasksRequest = useFirestoreCollectionData<TaskInfo>(collection, {
    idField: 'taskId',
  })

  const { status, data: tasks } = tasksRequest

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spinner />
      </div>
    )
  }

  if (status === 'error') {
    return <div className="Alert AlertError">Error: {tasksRequest.error}</div>
  }

  const done = []
  const todo = []

  for (let task of tasks) {
    if (task.done) {
      done.push(task)
    } else {
      todo.push(task)
    }
  }

  return (
    <div className="TasksView">
      {todo.length === 0 ? null : (
        <section className="TaskGroup">
          <h2 className="SectionTitle">To do</h2>
          <div className="TasksContainer">
            {todo.map((taskData) => {
              return <Task key={taskData.taskId} task={taskData} />
            })}
          </div>
        </section>
      )}

      {done.length === 0 ? null : (
        <section className="TaskGroup">
          <h2 className="SectionTitle">Done</h2>
          <div className="TasksContainer">
            {done.map((taskData) => {
              return <Task key={taskData.taskId} task={taskData} />
            })}
          </div>
        </section>
      )}

      {!(done.length === 0 && todo.length === 0) ? null : (
        <p className="OnEmptyMessage">
          Looks like you don't have any tasks yet
        </p>
      )}
    </div>
  )
}

function toggleDone(task: TaskInfo) {
  firebase
    .firestore()
    .collection(`users/${firebase.auth().currentUser!.uid}/tasks`)
    .doc(task.taskId)
    .set({
      ...task,
      done: !task.done,
    })
    .catch((_) => {
      alert('Error while writing to database')
    })
}

function deleteTask(task: TaskInfo) {
  firebase
    .firestore()
    .collection(`users/${firebase.auth().currentUser!.uid}/tasks`)
    .doc(task.taskId)
    .delete()
    .catch((_) => {
      alert('Error while writing to database')
    })
}

function Task({ task }: { task: TaskInfo }) {
  const _toggleDone = () => {
    toggleDone(task)
  }

  const _deleteTask = () => {
    deleteTask(task)
  }

  return (
    <div className={`Task ${task.done ? 'Done' : ''} Priority${task.priority}`}>
      <div className="Row" style={{ alignItems: 'center' }}>
        <button type="button" onClick={_toggleDone} className="MarkAsDone">
          <Icon icon={task.done ? checkedCircleIcon : circleIcon} />
          <span className="ScreenReaderOnly">
            {!task.done ? 'Done' : 'Not done'}
          </span>
        </button>
        <p className="TaskText">{task.task}</p>
        <button type="button" onClick={_deleteTask}>
          <Icon icon={trashIcon} />
          <span className="ScreenReaderOnly">Delete</span>
        </button>
      </div>
    </div>
  )
}
