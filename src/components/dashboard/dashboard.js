import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard(props) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
//   const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) {
     
    //  alert('no user')
     return props.history.push('/dashboard')

        // return navigate("/");
    }

    fetchUserName();
  }, [user, loading]);
  if (!user){
      return (<div>You are not logged in</div>)
  }
   return  (
   
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div> 
  );
}
export default Dashboard;