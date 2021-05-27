import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle as circleIcon,
  faCheckCircle as checkedCircleIcon,
  faTrashAlt as trashIcon,
} from '@fortawesome/free-regular-svg-icons'
import firebase from 'firebase/app'
import React from 'react'
import './TasksView.css'

export interface TaskInfo {
  taskId: string
  task: string
  createdAt: firebase.firestore.Timestamp
  done: boolean
}

export default function TasksView() {
  const user = useUser()
  const collection = useFirestore().collection(`users/${user.data.uid}/tasks`)

  const tasksRequest = useFirestoreCollectionData<TaskInfo>(collection, {
    idField: 'taskId',
  })

  if (tasksRequest.status === 'loading') {
    return <>Loading</>
  }

  if (tasksRequest.status === 'error') {
    return <div className="Alert AlertError">Error: {tasksRequest.error}</div>
  }

  const { data: tasks } = tasksRequest

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
        <section>
          <h2 className="SectionTitle">To do</h2>
          <div className="TasksContainer">
            {todo.map((taskData) => {
              return <Task key={taskData.taskId} task={taskData} />
            })}
          </div>
        </section>
      )}

      {done.length === 0 ? null : (
        <section>
          <h2 className="SectionTitle">Done</h2>
          <div className="TasksContainer">
            {done.map((taskData) => {
              return <Task key={taskData.taskId} task={taskData} />
            })}
          </div>
        </section>
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
    <div className={`Task ${task.done ? 'Done' : ''}`}>
      <div className="Row" style={{ alignItems: 'center' }}>
        <button type="button" onClick={_toggleDone}>
          <FontAwesomeIcon icon={task.done ? checkedCircleIcon : circleIcon} />
          <span className="ScreenReaderOnly">
            {!task.done ? 'Done' : 'Not done'}
          </span>
        </button>
        {/* <button type="button">Change</button> */}
        <p className="TaskText">{task.task}</p>
        <button type="button" onClick={_deleteTask}>
          <FontAwesomeIcon icon={trashIcon} />
          <span className="ScreenReaderOnly">Delete</span>
        </button>
      </div>
    </div>
  )
}
