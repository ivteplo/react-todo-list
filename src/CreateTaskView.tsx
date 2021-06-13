import React, { useRef, useState } from 'react'
import firebase from 'firebase/app'
import { NewTaskInfo } from './TaskInfo'
import './CreateTaskView.css'

type FormReference = React.RefObject<HTMLFormElement>

function addTask(input: string, priority: number) {
  const user = firebase.auth().currentUser!

  return new Promise<void>((resolve, reject) => {
    const task: NewTaskInfo = {
      task: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      done: false,
      priority: priority
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
  const formRef: FormReference = useRef(null)

  const [priority, setPriority] = useState(4)

  const _addTask = (event: React.FormEvent) => {
    event.preventDefault()

    const formElements = Array.from(formRef.current?.elements)
    const { task, priority } = (
      formElements
        .filter(input => input.name !== "submitted")
        .reduce((prev, current) => {
          if (prev instanceof Node) {
            prev = {
              [prev.name]: prev.value,
            }
          }

          return {
            ...prev,
            [current.name]: current.value
          }
        })
    )

    if (!task) {
      return
    }

    addTask(task, +priority)
    formRef.current?.reset()
    setPriority(4)
  }

  const onPriorityChange = (event: any) => {
    setPriority(event.currentTarget.value)
  }

  return (
    <form
      action="#"
      method="post"
      onSubmit={_addTask}
      className="CreateTaskView"
      ref={formRef}
    >
      <div className="Row TaskInputWrapper">
        <input
          type="text"
          placeholder="My task for today is..."
          className="TaskInput"
          name="task"
          autoComplete="off"
        />
        <button type="submit" name="submitted" value="true" className="primary">Add</button>
      </div>
      <div className="Row TaskOptionalFields">
        <div className="Field">
          <select
            name="priority"
            className={`PriorityField Priority${priority}`}
            onChange={onPriorityChange}
          >
            <option value="4">Default priority</option>
            <option value="1">Priority 1</option>
            <option value="2">Priority 2</option>
            <option value="3">Priority 3</option>
          </select>
        </div>
      </div>
    </form>
  )
}
