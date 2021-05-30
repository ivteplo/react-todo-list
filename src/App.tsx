import { Suspense, useEffect } from 'react'
import { AuthCheck } from 'reactfire'
import firebase from 'firebase/app'

import Spinner from './Spinner'
import Content from './Content'

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AuthCheck fallback={<LoginAnonymously />}>
        <div className="App">
          <Content />
        </div>
      </AuthCheck>
    </Suspense>
  )
}

function signInAnonymously() {
  const auth = firebase.auth()

  return new Promise<void>((resolve, reject) => {
    auth
      .signInAnonymously()
      .then(() => {
        resolve()
      })
      .catch(() => {
        alert('Error while signing in')
        reject()
      })
  })
}

function LoginAnonymously() {
  useEffect(() => {
    signInAnonymously()
  })

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Spinner />
    </div>
  )
}
