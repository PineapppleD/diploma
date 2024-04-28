import React, { useState } from "react";
import { storage } from "../firebase/firebase";
import { Timestamp } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { useUserContext } from "../contexts/userContext/userContextProvider";
import { addClass, addVideoToFirestore } from "../firebase/teacherOperations";
import { Video } from "../models";

const Test: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoData, setVideoData] = useState<Video | undefined>(); // State for video data
  const {userId} = useUserContext();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleVideoDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setVideoData((prevData: any) => ({ ...prevData, [name]: value })); // Update video data based on input
  };

  const handleUpload = async () => {
    if (!selectedFile || !videoData) return;

    const storageRef = ref(storage, `videos/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading video:", error);
      },
      async () => {
        // Upload completed successfully, get download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Combine video data with download URL
        const completeVideoData = {
          ...videoData,
          url: downloadURL,
          createdAt: Timestamp.now(),
        };

        // Upload video data to Firestore
        try {
          if (userId) {
            await addVideoToFirestore(completeVideoData, userId); // Use currentUser
            console.log("Video uploaded and metadata added successfully!");
            await addClass(completeVideoData, userId)
            // Reset state for next upload
            setSelectedFile(undefined);
            setVideoData(undefined);
          }
        } catch (error) {
          console.error("Error adding video data to Firestore:", error);
        }
      }
    );
  };

  

  

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <br />
      {/* Input fields for video data */}
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" onChange={handleVideoDataChange} />
      <br />
      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" onChange={handleVideoDataChange} />
      <br />
      {/* Add more input fields for other video properties (optional URL, thumbnail URL, etc.) */}
      <button onClick={handleUpload} disabled={!selectedFile || !videoData}>
        Upload Video
      </button>
      {uploadProgress > 0} && <p>Upload Progress: {uploadProgress}%</p>
    </div>
  );
};

export default Test;