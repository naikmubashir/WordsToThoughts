import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
  <>
    <UserHeader/>
    <UserPost likes={867} replies={4} postImg='post1.png' postTitle={'Going for a walk'} />
    <UserPost likes={765} replies={14} postImg='post2.png' postTitle={'Studying ComSci'} />
    <UserPost likes={65} replies={3} postImg='post3.png' postTitle={'Building an app'} />
    <UserPost likes={233} replies={43}  postTitle={'Playing football'} />
  </>
  )
}

export default UserPage
