import { useEffect, useState } from "react"
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import useShowToast from "./useShowToast";
const useFollowUnfollow=(user)=>{
    const [updating, setUpdating]=useState(false);
    const currentUser= useRecoilValue(userAtom);
    const [following, setFollowing]=useState(user.followers.includes(currentUser?._id));//following will be true if currentUser is following the user
   // console.log(following)
    const showToast=useShowToast();
    const handleFollowUnfollow=async()=>{
        if(!currentUser){
            showToast("Error", "Please login to follow", "error");
			return;
        }
        if(updating)return;
        setUpdating(true);
        try {
            const res= await fetch(
                `/api/users/follow/${user._id}`,//this will either follow or unfollow the user. Logic in backend
                { 
                    method:'POST',
                    headers:{
                        "Content-Type": "application/json",
                    }
            });
            const data = await res.json();
            if(data.error){
                showToast('Error',data.error,"error")
                return
            }
            if(following){
                showToast("Success", `Unfollowed ${user.name}`, "success");
                user.followers.pop();//this will -1 the followers in the profile UI... This is for the client side only. Server side is done automaticaly when fetch requesting in line 19
            }else{
                showToast("Success", `Followed ${user.name}`, "success");
                user.followers.push(user?._id);//Similarly simulate the followers count which is displayed on user profile
                
            }
            setFollowing(!following);
            
        } catch (error) {
			showToast("Error", error, "error");
            
        }finally{
            setUpdating(false);
        }
    }
    return {handleFollowUnfollow, following,updating}
}
export default useFollowUnfollow