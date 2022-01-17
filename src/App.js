import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChatRoom from './components/ChatRoom';
import ChatRoomsList from './components/ChatRoomsList';
import { Route, Switch } from 'react-router';
import axios from "axios";

function App() {

  const [rooms, setRooms] = useState([])

  useEffect(() => fetchRoom(),[])
  
  const fetchRoom = async () =>{
    try{
    const response = await axios.get("https://coded-task-axios-be.herokuapp.com/rooms");
    setRooms(response.data);
  }
  catch(error){
    console.log(error);
    alert ("Failed getting tasks")
  };
};


  const createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try{
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      newRoom = response.data
      setRooms([...rooms,newRoom]);
    }
    catch (error){
      console.log(error);
      alert("cannot add");
    }
  }

  const deleteRoom =async (id) => {
    // to do : call BE to delete a room
    try{
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      let tempRoom = rooms.filter((room) => room.id !==id);
      setRooms(tempRoom);
      alert("Deleted successfully")
    } catch(error){
      console.log(error);
      alert("Cannot delete");
    }
  };

  const updateRoom =async(id) => {
    try{
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`,id
      );
    
      let updtRoom = rooms.filter((room) => room.id !==id);
      setRooms(updtRoom);
      alert("Updated successfully")
    }catch(error){
      console.log(error);
      alert("cannot Update");
    }
  }

  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList rooms={rooms}  createRoom={createRoom} deleteRoom ={deleteRoom} updateRoom={updateRoom}/>
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
