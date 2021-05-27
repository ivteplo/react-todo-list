import { FC, Suspense, useEffect } from 'react'
import { AuthCheck } from 'reactfire'
import firebase from 'firebase/app'

import LoadingScreen from './LoadingScreen'
import HomePage from './HomePage'

const Content: FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthCheck fallback={<LoginAnonymously />}>
        <HomePage />
      </AuthCheck>
    </Suspense>
  )
}

export default Content

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

  return <LoadingScreen />
}
