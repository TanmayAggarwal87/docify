import React from 'react'
import { auth } from '../../auth'
import Repos from '@/components/Repos'

async function page() {
  const session = await auth()
  return (
    <div>
      
      <Repos session ={session}/>
      
    </div>
  )
}

export default page