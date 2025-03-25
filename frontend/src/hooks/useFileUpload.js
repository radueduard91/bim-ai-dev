import { useState } from 'react';
import axios from 'axios';
import useAppState from './useAppState';

const useFileUpload = (setGraphData, showNotification) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { startAIProcessing } = useAppState();

  const handleFileChange = (event) => {
    console.log("File selected:", event.target.files[0]);
    setFile(event.target.files[0]);
  };

  // Modified handleFileUpload to skip confirmation dialog
  const handleFileUpload = async (notification = null) => {
    console.log("handleFileUpload called, file:", file);
    
    if (!file) {
      console.log("No file selected");
      if (notification) {
        notification("Please select a file before uploading.", "error");
      }
      return;
    }

    console.log("Directly uploading file...");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    console.log("FormData created with file:", file.name);
    
    try {
      console.log("Attempting to upload file to server...");
      // First upload the file
      const response = await axios.post("http://localhost:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log("File upload response:", response.data);
      
      // Then start AI processing
      const aiProcess = startAIProcessing("Analyzing file structure...");
      
      // Simulate AI progress in stages
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        console.log("AI progress:", progress);
        
        // Update message at certain thresholds
        if (progress === 20) {
          aiProcess.updateProgress(progress, "Identifying data entities and relationships...");
        } else if (progress === 40) {
          aiProcess.updateProgress(progress, "Processing attribute characteristics...");
        } else if (progress === 60) {
          aiProcess.updateProgress(progress, "Analyzing semantic connections...");
        } else if (progress === 80) {
          aiProcess.updateProgress(progress, "Finalizing data structure...");
        }
        
        aiProcess.updateProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          aiProcess.complete();
          
          // Fetch graph data after AI processing completes
          fetchGraphData();
          
          if (notification) {
            notification(response.data.message, "success");
          }
        }
      }, 100);
      
    } catch (error) {
      console.error("Error uploading file:", error);
      console.error("Error details:", error.response ? error.response.data : "No response data");
      let errorMessage = "Error uploading file.";
      if (error.response && error.response.data) {
        errorMessage += ` ${error.response.data.detail || error.response.data.message || JSON.stringify(error.response.data)}`;
      }
      if (notification) {
        notification(errorMessage, "error");
      }
      setIsLoading(false);
    }
  };

  const fetchGraphData = async (notification = null) => {
    console.log("Fetching graph data...");
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/graph-data/");
      console.log("Graph data response:", response.data);
      setGraphData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching graph data:", error);
      let errorMessage = "Error fetching graph data.";
      if (error.response && error.response.data) {
        errorMessage += ` ${error.response.data.detail || ''}`;
      }
      if (notification) {
        notification(errorMessage, "error");
      }
      setIsLoading(false);
    }
  };

  return {
    file,
    isLoading,
    handleFileChange,
    handleFileUpload,
    fetchGraphData
  };
};

export default useFileUpload;