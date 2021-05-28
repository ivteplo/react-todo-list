import { Component, Suspense } from 'react'
import { AuthCheck } from 'reactfire'
import firebase from 'firebase/app'

import Spinner from './Spinner'
import Content from './Content'

export default class App extends Component {
  constructor(props: any) {
    super(props)
    this.LoginAnonymously = this.LoginAnonymously.bind(this)
  }

  private signInAnonymously() {
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

  private LoginAnonymously() {
    this.signInAnonymously()

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

  render = () => (
    <Suspense fallback={<Spinner />}>
      <AuthCheck fallback={<this.LoginAnonymously />}>
        <div className="App">
          <Content />
        </div>
      </AuthCheck>
    </Suspense>
  )
}
