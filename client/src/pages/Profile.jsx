import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess  } from "../redux/user/userSlice.js"

export default function Profile () {

  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] =useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [formData, setFormData] = useState({});

  const [ updateSucess, setUpdateSuccess ] = useState(false);

  const [showListingsError, setShowListingsError] = useState(false);

  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  // console.log(filePerc);
  // console.log(file)
  // console.log(formData);

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(err){
      dispatch(updateUserFailure(err.message));
    }
  }

  const handleDeleteUser = async() => {

    try{

      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
      });


      const data = await res.json();

      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

    }catch(err){
      dispatch(deleteUserFailure(err.message));
    }

  };


  const handleSignOut = async () => {
    try{
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    }catch(err){
      dispatch(signOutUserFailure(data.message));
    }
  }

  const handleShowListings = async () => {

    try{
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if(data.success === false){
        setShowListingsError(true);
        return;
      }
      setUserListings(data);

    }catch(err){
      setShowListingsError(true);
    }

  }

  const handleListingDelete = async (listingId) => {
    try{

      const res = await fetch(`api/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if(data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))

    }catch(err){

      console.log(err.message);
      
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef}/>

        <img onClick={() => fileRef.current.click()} src={ formData.avatar || (currentUser.avatar ? currentUser.avatar : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F862298659890870728%2F&psig=AOvVaw31sw8qjyHzpfCrONFudsaS&ust=1729241929928000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjL442GlYkDFQAAAAAdAAAAABAE") } alt='profile image' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>

        <p className='text-sm self-center'>
          {fileUploadError ?
            (<span className='text-red-700'>Error Image Upload (image must be less than 2 MB)</span>) :
            filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>
                {`uploading ${filePerc}% `}
              </span> ) :
              filePerc === 100 ? (
                <span className='text-green-700'>
                  Image successfully uploaded !
                </span>) : ""
            }
        </p>

        <input type='text' 
          id="username" 
          placeholder='username' 
          className='border p-3 rounded-lg' 
          defaultValue={currentUser.username} 
          onChange={handleChange}
        />

        <input type='text' 
          id="email" 
          placeholder='email' 
          className='border p-3 rounded-lg' 
          defaultValue={currentUser.email} 
          onChange={handleChange}
        />

        <input type='password' 
          id="password" 
          placeholder='password' 
          className='border p-3 rounded-lg' 
          defaultValue={currentUser.password} 
          onChange={handleChange}
        />
        
        {/* <input type='text' id="username" placeholder='username' className='border p-3 rounded-lg'/> */}

        <button disabled = {loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-85 disabled: opacity-70'>
          { loading ? "Loading..." : "Update" }
        </button>

        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>
            Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>


      <p className='text-red-700 mt-5'>{ error ? error : "" }</p>

      <p className='text-green-700 mt-5'>
        { updateSucess ? "User updated successfully":"" }
      </p>
      <button onClick={handleShowListings} className='text-green-700 w-full '>Show Listings</button>
      <p className='text-red-700' mt-5>
        {showListingsError ? "error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0  &&
      
      <div className='flex flex-col gap-4'>

          <h1 className='text-center mt-7 text-3xl font-semibold'>YOUR LISTINGS</h1>

          {userListings.map((listing) => (

              <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center'>
                <Link to={`/listings/${listing._id}`}>
                  <img src={listing.imageURLs[0]} alt='listing image'
                    className='h-16 w-16 object-contain'
                  />
                </Link>
                <Link className='text-black-700 font-semibold  hover:underline truncate flex-1' to={`/listing/${listing._id}`}>
                  <p>{listing.name}</p>
                </Link>

                <div className=' flex flex-col items-center'>

                  <button onClick={ () => handleListingDelete(listing._id) } className='text-red-700'>DELETE</button>
                  
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className='text-green-700'>EDIT</button>
                  </Link>

                </div>

              </div>

          ))}

      </div> 
        
      }

    </div>
  )
}
