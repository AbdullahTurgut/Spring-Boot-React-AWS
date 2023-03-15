import './App.css';
import axios from 'axios';
import React,{ useState , useEffect , useCallback} from "react";
import {useDropzone} from 'react-dropzone';


// Backend bağlantısı
const UserProfiles = () => {

  // Backend'deki veritabanı verilerini çekmek için 
    const fetchUserProfiles = () => {
      const [userProfiles,setUserProfiles] = useState([]);

      axios.get("http://localhost:8080/api/v1/user-profile").then(res => {
        console.log(res); 
        // const data = res.data; // backend'den gelen veriyi aldık
        setUserProfiles(res.data);
      });
    }

    useEffect(() => {
      fetchUserProfiles();
    }, []);

    return  userProfiles.map((userProfile,index) => {
      return ( 
        <div key={index}>
            {userProfile.userProfileId ? (
              <img 
              src={`http://localhost:8080/api/v1/user-profile/${userProfile.userProfileId}/image/download`} 
              />
            ):null}
            <br />
            <br />
            <h1> { userProfile.username } </h1>
            <p>{ userProfile.userProfileId } </p>
            <Dropzone {...userProfile}/>
            <br />
            </div>
      )
    })
} 
// userProfileId = {userProfile.userProfileId} <Dropzone {bu kısımın alternatifi} />  

//userProfilId'yi props dan alıcaz
function Dropzone({ userProfileId }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const file = acceptedFiles[0];
    console.log(file);

    const formData = new FormData();
    formData.append("file",file); // "file" backenddeki PostParam'daki isim ile aynı olmasına dikkat

    axios.post(
      `http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      }
    ).then(() => {
      console.log("file uploaded succesfully")
    }).catch(err => {
      console.log(err);
    });
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the image here ...</p> :
          <p>Drag 'n' drop profile image , or click to select profile image</p>
      }
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <UserProfiles />
    </div>
  );
}

export default App;
