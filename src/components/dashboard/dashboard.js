import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import TodoDataService from "../../services/todo.service";

function Dashboard(props) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [totalTodos, setTotalTodos] = useState(0)
  const [totalTodosDone, setTotalTodosDone] = useState(0)
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
    TodoDataService.getAll()
    .then(response => {
      
        setTotalTodos(response.data.count)
    })
    .catch(err=>{
        console.log(err)

    })

    TodoDataService.getAllDone()
    .then(response => {

        
        setTotalTodosDone(response.data)
    })
    .catch(err=>{
        console.log(err)

    })

    if (loading) return;

    if (!user) {
     
    //  alert('no user')
     return props.history.push('/dashboard')

        // return navigate("/");
    }

    fetchUserName();
  }, [user, loading]);
  const Reports = () => {
      return (<div className="reports__container">
      Here is your TODO List Summary
       <div><b> Total Tasks:</b> {totalTodos}</div>
       <div><b>Total tasks completed:</b> {totalTodosDone}</div>
       <div><b>Total tasks pending:</b> {totalTodos - totalTodosDone}</div>
      {/* <button className="dashboard__btn" onClick={logout}>
       Logout
      </button> */}
    </div>)
  }
  if (!user){
      return (
      <>
          <div>**You are not logged in**</div>
            <Reports />
      </>
      
      )
  }
   return  (
   
    <div className="dashboard">
       <div className="dashboard__container">
        You are logged in as
          <div><b> Name:</b> {name}</div>
          <div><b>Email:</b> {user?.email}</div>
         {/* <button className="dashboard__btn" onClick={logout}>
          Logout
         </button> */}
       </div>
       <Reports  />
       

     </div> 
  );
}
export default Dashboard;