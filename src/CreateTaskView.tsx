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
      priority: priority,
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

export default function CreateTaskView(
  { quick }: { quick?: boolean } = {
    quick: false,
  }
) {
  const formRef: FormReference = useRef(null)

  const [priority, setPriority] = useState(4)

  const _addTask = (event: React.FormEvent) => {
    event.preventDefault()

    const formElements = formRef.current!.elements
    const { task, priority } = formElements as any

    if (!task.value) {
      return
    }

    addTask(task.value, +priority.value)
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
          placeholder={!quick ? 'My task for today is...' : 'Add quick task...'}
          className="TaskInput"
          name="task"
          autoComplete="off"
        />
        <button type="submit" name="submitted" value="true" className="primary">
          Add
        </button>
      </div>
      {!quick ? (
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
      ) : (
        <>
          <input type="hidden" name="priority" value="4" />
        </>
      )}
    </form>
  )
}
