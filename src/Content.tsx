import React, { useRef } from 'react'
import firebase from 'firebase/app'
import TasksView from './TasksView'
import './Content.css'

type InputReference = React.RefObject<HTMLInputElement>

function addTask(input: string) {
  const user = firebase.auth().currentUser!

  return new Promise<void>((resolve, reject) => {
    firebase
      .firestore()
      .collection(`users/${user.uid}/tasks`)
      .add({
        task: input,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        done: false,
      })
      .then(() => {
        resolve()
      })
      .catch((error) => {
        alert('Error while adding a task')
        reject(error)
      })
  })
}

const Content = () => {
  const taskInputRef: InputReference = useRef(null)

  const _addTask = (event: React.FormEvent) => {
    event.preventDefault()

    if (taskInputRef.current?.value) {
      addTask(taskInputRef.current.value)
      taskInputRef.current.value = ''
    }
  }

  return (
    <>
      <h1 style={{ marginTop: '20px' }}>To do</h1>
      <form action="#" method="post" onSubmit={_addTask}>
        <div className="Row TaskInputWrapper">
          <input
            ref={taskInputRef}
            type="text"
            placeholder="My task for today is..."
            className="TaskInput"
          />
          <button type="submit">Add</button>
        </div>
      </form>
      <TasksView />
    </>
  )
}

export default Content
