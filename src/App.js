import React, { useState, useEffect } from 'react'
import { app,storage,db } from "./firebase-config"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDocs, collection} from "firebase/firestore"; 

function App() {

  const [fileUrl, setFileUrl] = useState(null)
  const [users, setUsers] = useState([])

  const AddFile = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage)
    const fileRef = ref(storage, file.name);
    await uploadBytes(fileRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!', file.name);
    });  
    const Url = await getDownloadURL(fileRef)
    setFileUrl(Url)
    console.log(fileUrl);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    if(username){
      await setDoc(doc(db, "users", username), {
        name: username,
        avatar: fileUrl
      });
    } else {
      alert("Please enter a valid username")
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, "users"));
      setUsers(usersCollection.docs.map(doc => {
        return doc.data()
      }))
      console.log(usersCollection);
    }
    fetchUsers()
  }, [users])

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="NAME"/>
        <input type="file" onChange={AddFile}/>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {
          users.map((user) => {
            return (
              <li key={user.name}>
                <img width="100" height="100" src={user.avatar} alt={user.name}></img>
                <p>{user.name}</p>
              </li>
            )
          })
        }
      </ul>
    </>
  );
}

export default App;
