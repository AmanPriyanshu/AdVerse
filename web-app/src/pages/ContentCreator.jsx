import React, { useState } from 'react';
import {
  Box,
  VStack,
  Input,
  Text,
  Checkbox,
  CheckboxGroup,
  Image,
  Spinner,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';

function ContentCreator() {
  const [selectedAds, setSelectedAds] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [randomName, setRandomName] = useState('');

  const apiURL = 'https://logistics-sur-lie-cdna.trycloudflare.com/';

  const adOptions = ['T-shirt', 'Sneakers', 'Smartphone', 'Headphones', 'Watch', 'Pants'];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  const fileToByteArray = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      // Event handler when file reading is complete
      reader.onloadend = () => {
        const arrayBuffer = reader.result; // ArrayBuffer of the image
        const byteArray = new Uint8Array(arrayBuffer); // Convert ArrayBuffer to Uint8Array (bytearray equivalent)
        resolve(byteArray);
      };
      
      // Error handler if file reading fails
      reader.onerror = () => {
        reject(new Error('Failed to read file as bytearray'));
      };
      
      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  };

  const handleShowAds = async () => {
    if (!selectedImageFile) {
      alert('Please upload an image first.');
      return;
    }
    if (selectedAds.length === 0) {
      alert('Please select at least one ad.');
      return;
    }
    setLoading(true);
    setStatusMessage('Uploading image...');
  
    try {
      // 1. Convert the selected image file to bytearray
      const imageByteArray = await fileToByteArray(selectedImageFile);
  
      // 2. Onboard Meme
      const memeName = 'user_meme'; // You can generate a unique name if needed
      
      // Create data and files objects similar to the Python format
      const formData = new FormData();
      const imageBlob = new Blob([imageByteArray], { type: selectedImageFile.type });
  
      // Simulate the structure similar to the Python example
      // files = {'image': ('kid.png', img_byte_arr, 'image/png')}
      // data = {'name': 'funny_red_square'}
      formData.append('image', imageBlob, selectedImageFile.name); // Appending the file
      const randomString = Math.random().toString(36).substring(2, 10);
      setRandomName(randomString);
      formData.append('name', randomString); // Appending the meme name
  
      // Log FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      try {
        await axios.post(`${apiURL}/onboard_meme`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // If the request is successful, continue with the rest of your logic
        setStatusMessage('Image uploaded successfully.');
      } catch (error) {
        // Catch and handle any errors from the request
        console.error('Error uploading image:', error);
      
        // Set the status message to indicate an error occurred
        setStatusMessage('Error uploading image. Please try again.');
      }    
  
      setStatusMessage('Editing image...');
      const prompt = `Add the following products to the image: ${selectedAds.join(', ')}`;
      console.log("prompt: ", prompt);
      await axios.post(`${apiURL}/edit_meme/${randomString}`, { prompt });
  
      setStatusMessage('Fetching edited image...');
      const filename = `edited_${randomName}_${selectedImageFile.name}`;
      const response = await axios.get(`${apiURL}/get_edited_meme/${randomName}`, {
        responseType: 'blob',
      });
  
      const editedImageUrl = URL.createObjectURL(response.data);
      setGeneratedImage(editedImageUrl);
  
      setStatusMessage('Completed');
    } catch (error) {
      console.error(error);
      setStatusMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      minHeight="100vh"
      color="text"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack spacing={6} textAlign="center" width="100%" maxWidth="600px">
        <Text fontSize="3xl" fontWeight="bold" mt={3}>
          Upload Your Image
        </Text>

        {/* File Upload Button */}
        <Box>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            display="none"
          />
          <Button
            as="label"
            htmlFor="file-upload"
            cursor="pointer"
            mt="3"
            size="lg"
            padding="1.5rem 3rem"
            fontSize="xl"
            backgroundColor="#ff6ec7"
            color="black"
            _hover={{
              backgroundColor: '#ff85d2',
              boxShadow: '0 0 20px #ff85d2',
              transform: 'scale(1.05)',
            }}
            _active={{
              backgroundColor: '#ff6ec7',
              boxShadow: '0 0 10px #ff6ec7',
              transform: 'scale(0.95)',
            }}
          >
            Choose File
          </Button>
        </Box>

        {/* Image Area */}
        <Box height="300px" display="flex" alignItems="center" justifyContent="center">
          {imagePreview ? (
            <Image src={imagePreview} alt="Uploaded Image" boxSize="300px" />
          ) : (
            <Box boxSize="300px" borderWidth="1px" borderColor="gray.200" />
          )}
        </Box>

        <Text fontSize="2xl" fontWeight="bold">
          Select Ads to Display
        </Text>

        <CheckboxGroup
          colorScheme="pink"
          onChange={setSelectedAds}
          value={selectedAds}
        >
          <SimpleGrid columns={4} spacing={4}>
            {adOptions.map((ad) => (
              <Checkbox key={ad} value={ad}>
                {ad}
              </Checkbox>
            ))}
          </SimpleGrid>
        </CheckboxGroup>

        {/* Status Message */}
        {statusMessage && (
          <Text fontSize="lg" fontWeight="bold">
            {statusMessage}
          </Text>
        )}

        {/* Neon Green Submit Button */}
        <Button
          mt="3"
          size="lg"
          padding="1.5rem 3rem"
          fontSize="xl"
          backgroundColor="#39ff14"
          color="black"
          _hover={{
            backgroundColor: '#66ff66',
            boxShadow: '0 0 20px #66ff66',
            transform: 'scale(1.05)',
          }}
          _active={{
            backgroundColor: '#39ff14',
            boxShadow: '0 0 10px #39ff14',
            transform: 'scale(0.95)',
          }}
          onClick={handleShowAds}
          isDisabled={selectedAds.length === 0 || !selectedImageFile || loading}
          _disabled={{
            backgroundColor: '#39ff14',
            opacity: 0.6,
            cursor: 'not-allowed',
          }}
        >
          {loading ? (
            <Spinner size="md" />
          ) : generatedImage ? (
            'Generate New Ad'
          ) : (
            'Show Ads'
          )}
        </Button>

        {generatedImage && (
          <Box mt={4} mb={14}>
            <Text fontSize="2xl" fontWeight="bold">
              Generated Image
            </Text>
            <Image src={generatedImage} alt="Generated Ad Image" />
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default ContentCreator;
