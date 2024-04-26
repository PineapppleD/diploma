import React from 'react'
import Sidebar from '../Sidebar'
import Goals from './Goals'
import Messages from './Messages'

export default function HomeContent() {
  return (
    <div className="app-content">
        <Sidebar />
        <Goals />
        <Messages />
    </div>
  )
}
