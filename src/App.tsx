import React, { FC } from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { Router } from '@reach/router'
import Dynamic from 'containers/Dynamic'
import './app.sass'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

const App: FC<{}> = () => (
  <Root>
    <Nav />
    <React.Suspense fallback={<main>Loading...</main>}>
      <Router>
        <Dynamic path="dynamic" />
        <Routes path="*" />
      </Router>
    </React.Suspense>
    <Footer />
  </Root>
)

export default App
