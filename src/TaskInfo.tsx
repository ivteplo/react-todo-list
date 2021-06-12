import firebase from 'firebase/app'

export interface TaskInfo {
  taskId: string
  task: string
  createdAt: firebase.firestore.Timestamp
  done: boolean
}

// Interface used when constructing an object to upload to Firebase
export interface NewTaskInfo {
  task: string
  createdAt: firebase.firestore.FieldValue
  done: boolean
}
