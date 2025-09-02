import React from 'react'
import Navbar from '@/components/Navbar'
import { auth } from '../../auth'
import { fetchRepos } from './api/token'
import Repos from '@/components/Repos'

async function page() {
  const session = await auth()
  
  console.log(session)
  return (
    <div>
      <Navbar/>
      <Repos session ={session}/>
      
    </div>
  )
}

export default page