import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
// import { useParams } from 'react-router-dom';
// import useShowToast from "..hooks/useShowToast";
import useGetUserProfile from '../hooks/useGetUserProfile';


const UserPage = () => {
  const {loading,user}=useGetUserProfile();
  return (
  <>
    <UserHeader user={user} loading={loading} />
    <UserPost likes={867} replies={4} postImg='post1.png' postTitle={'Going for a walk'} />
    <UserPost likes={765} replies={14} postImg='post2.png' postTitle={'Studying ComSci'} />
    <UserPost likes={65} replies={3} postImg='post3.png' postTitle={'Building an app'} />
    <UserPost likes={233} replies={43}  postTitle={'Playing football'} />
  </>
  )
}

export default UserPage
