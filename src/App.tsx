import { Row } from 'antd'
import { useState } from 'react'
import RootLayout from './components/RootLayout'

function App() {

  return (
    <div className="font-arimo container-xl w-[1200px] mx-auto">
     <Row>
        <RootLayout/>
     </Row>
    </div>
  )
}

export default App
