import React, { useRef } from 'react'
import firebase from 'firebase/app'
import { NewTaskInfo } from './TaskInfo'

type InputReference = React.RefObject<HTMLInputElement>

function addTask(input: string) {
  const user = firebase.auth().currentUser!

  return new Promise<void>((resolve, reject) => {
    const task: NewTaskInfo = {
      task: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      done: false,
    }

    firebase
      .firestore()
      .collection(`users/${user.uid}/tasks`)
      .add(task)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        alert('Error while adding a task')
        reject(error)
      })
  })
}

export default function CreateTaskView() {
  const taskInputRef: InputReference = useRef(null)

  const _addTask = (event: React.FormEvent) => {
    event.preventDefault()

    if (taskInputRef.current?.value) {
      addTask(taskInputRef.current.value)
      taskInputRef.current.value = ''
    }
  }

  return (
    <form action="#" method="post" onSubmit={_addTask}>
      <div className="Row TaskInputWrapper">
        <input
          ref={taskInputRef}
          type="text"
          placeholder="My task for today is..."
          className="TaskInput"
        />
        <button type="submit" className="primary">Add</button>
      </div>
    </form>
  )
}
