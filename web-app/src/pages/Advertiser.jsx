// Advertiser.jsx
import React, { useState } from 'react';
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Input,
  Button,
  Image,
  Grid,
} from '@chakra-ui/react';

function Advertiser() {
  // State variables for Product Ad
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState(''); // New state variable
  const [productBid, setProductBid] = useState('');

  // State variables for Logo Ad
  const [logoImage, setLogoImage] = useState(null);
  const [logoDescription, setLogoDescription] = useState(''); // New state variable
  const [logoBid, setLogoBid] = useState('');

  // Handlers for Product Ad
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleProductBidChange = (e) => {
    setProductBid(e.target.value);
  };

  const handleSubmitProductAd = () => {
    // Implement your submission logic here
    console.log('Product Ad Submitted:', { productImage, productName, productType, productBid });
    // Reset fields after submission
    setProductImage(null);
    setProductName('');
    setProductType('');
    setProductBid('');
  };

  // Handlers for Logo Ad
  const handleLogoImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoImage(URL.createObjectURL(file));
    }
  };

  const handleLogoDescriptionChange = (e) => {
    setLogoDescription(e.target.value);
  };

  const handleLogoBidChange = (e) => {
    setLogoBid(e.target.value);
  };

  const handleSubmitLogoAd = () => {
    // Implement your submission logic here
    console.log('Logo Ad Submitted:', { logoImage, logoDescription, logoBid });
    // Reset fields after submission
    setLogoImage(null);
    setLogoDescription('');
    setLogoBid('');
  };

  // Ensure consistent vertical space
  const contentHeight = '600px'; // Adjust as needed

  return (
    <Box
      minHeight="100vh"
      color="text"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box width="100%" maxWidth="600px">
        <Tabs variant="soft-rounded">
          <TabList justifyContent="center" mb={4}>
            <Tab
              width="200px"
              mx="15px"
              _selected={{
                bg: '#FFFF00', // Bright neon yellow
                color: 'black',
                boxShadow: '0 0 10px #FFFF00, 0 0 20px #FFFF00',
              }}
            >
              Product Ad
            </Tab>
            <Tab
              width="200px"
              mx="15px"
              _selected={{
                bg: '#FFFF00', // Bright neon yellow
                color: 'black',
                boxShadow: '0 0 10px #FFFF00, 0 0 20px #FFFF00',
              }}
            >
              Logo Ad
            </Tab>
          </TabList>
          {/* Set a fixed height to prevent shifting */}
          <Box height={contentHeight}>
            <TabPanels height="100%">
              {/* Product Ad Tab */}
              <TabPanel height="100%">
                <VStack spacing={4} align="stretch" height="100%">
                  <Text fontSize="3xl" fontWeight="bold" textAlign="center" mt="-2">
                    Upload Product Ad
                  </Text>
                  {/* Product Image Upload */}
                  <Box textAlign="center">
                    <Input
                      id="product-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      display="none"
                    />
                    <Button
                      as="label"
                      htmlFor="product-image-upload"
                      cursor="pointer"
                      padding="1.5rem 3rem"
                      fontSize="xl"
                      backgroundColor="#ff6ec7"
                      color="black"
                      boxShadow="0 0 10px #ff6ec7, 0 0 20px #ff6ec7"
                      _hover={{
                        backgroundColor: '#ff85d2',
                        boxShadow: '0 0 15px #ff85d2, 0 0 30px #ff85d2',
                        transform: 'scale(1.05)',
                      }}
                      _active={{
                        backgroundColor: '#ff6ec7',
                        transform: 'scale(0.95)',
                      }}
                    >
                      Choose Product Image
                    </Button>
                  </Box>
                  {/* Image Placeholder to stabilize layout */}
                  <Box height="220px" display="flex" alignItems="center" justifyContent="center">
                    {productImage ? (
                      <Image src={productImage} alt="Product Image" boxSize="200px" />
                    ) : (
                      <Box boxSize="200px" />
                    )}
                  </Box>
                  {/* Inputs with labels */}
                  <VStack spacing={4} align="stretch">
                    <Grid templateColumns="auto 1fr" gap={4} alignItems="center">
                      <Text textAlign="right">Product Name:</Text>
                      <Input
                        placeholder="Product Name"
                        value={productName}
                        onChange={handleProductNameChange}
                        size="lg"
                      />
                      <Text textAlign="right">Product Type:</Text>
                      <Input
                        placeholder="Product Type"
                        value={productType}
                        onChange={handleProductTypeChange}
                        size="lg"
                      />
                      <Text textAlign="right">Bid per View ($):</Text>
                      <Input
                        placeholder="Bid per View ($)"
                        value={productBid}
                        onChange={handleProductBidChange}
                        size="lg"
                        type="number"
                        step="0.01"
                      />
                    </Grid>
                  </VStack>
                  {/* Spacer to fill remaining space */}
                  <Box flex="1" />
                  {/* Submit Button */}
                  <Box textAlign="center">
                    <Button
                      mt="3"
                      size="lg"
                      padding="1.5rem 3rem"
                      fontSize="xl"
                      backgroundColor="#39ff14"
                      color="black"
                      boxShadow="0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14"
                      _hover={{
                        backgroundColor: '#66ff66',
                        boxShadow: '0 0 30px #66ff66, 0 0 60px #66ff66',
                        transform: 'scale(1.05)',
                      }}
                      _active={{
                        backgroundColor: '#39ff14',
                        transform: 'scale(0.95)',
                      }}
                      onClick={handleSubmitProductAd}
                      isDisabled={!productImage || !productName || !productType || !productBid}
                      _disabled={{
                        backgroundColor: '#39ff14',
                        opacity: 0.3,
                        cursor: 'not-allowed',
                      }}
                    >
                      Submit Product Ad
                    </Button>
                  </Box>
                </VStack>
              </TabPanel>
              {/* Logo Ad Tab */}
              <TabPanel height="100%">
                <VStack spacing={4} align="stretch" height="100%">
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    Upload Logo Ad
                  </Text>
                  {/* Logo Image Upload */}
                  <Box textAlign="center">
                    <Input
                      id="logo-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoImageUpload}
                      display="none"
                    />
                    <Button
                      as="label"
                      htmlFor="logo-image-upload"
                      cursor="pointer"
                      padding="1.5rem 3rem"
                      fontSize="xl"
                      backgroundColor="#ff6ec7"
                      color="black"
                      boxShadow="0 0 10px #ff6ec7, 0 0 20px #ff6ec7"
                      _hover={{
                        backgroundColor: '#ff85d2',
                        boxShadow: '0 0 15px #ff85d2, 0 0 30px #ff85d2',
                        transform: 'scale(1.05)',
                      }}
                      _active={{
                        backgroundColor: '#ff6ec7',
                        transform: 'scale(0.95)',
                      }}
                    >
                      Choose Logo Image
                    </Button>
                  </Box>
                  {/* Image Placeholder to stabilize layout */}
                  <Box height="220px" display="flex" alignItems="center" justifyContent="center">
                    {logoImage ? (
                      <Image src={logoImage} alt="Logo Image" boxSize="200px" />
                    ) : (
                      <Box boxSize="200px" />
                    )}
                  </Box>
                  {/* Inputs with labels */}
                  <VStack spacing={4} align="stretch">
                    <Grid templateColumns="auto 1fr" gap={4} alignItems="center">
                      <Text textAlign="right">Logo Product Description:</Text>
                      <Input
                        placeholder="Logo Product Description"
                        value={logoDescription}
                        onChange={handleLogoDescriptionChange}
                        size="lg"
                      />
                      <Text textAlign="right">Bid per View ($):</Text>
                      <Input
                        placeholder="Bid per View ($)"
                        value={logoBid}
                        onChange={handleLogoBidChange}
                        size="lg"
                        type="number"
                        step="0.01"
                      />
                    </Grid>
                  </VStack>
                  {/* Spacer to fill remaining space */}
                  <Box flex="1" />
                  {/* Submit Button */}
                  <Box textAlign="center">
                    <Button
                      mt="3"
                      size="lg"
                      padding="1.5rem 3rem"
                      fontSize="xl"
                      backgroundColor="#39ff14"
                      color="black"
                      boxShadow="0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14"
                      _hover={{
                        backgroundColor: '#66ff66',
                        boxShadow: '0 0 30px #66ff66, 0 0 60px #66ff66',
                        transform: 'scale(1.05)',
                      }}
                      _active={{
                        backgroundColor: '#39ff14',
                        transform: 'scale(0.95)',
                      }}
                      onClick={handleSubmitLogoAd}
                      isDisabled={!logoImage || !logoDescription || !logoBid}
                      _disabled={{
                        backgroundColor: '#39ff14',
                        opacity: 0.3,
                        cursor: 'not-allowed',
                      }}
                    >
                      Submit Logo Ad
                    </Button>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Box>
        </Tabs>
      </Box>
    </Box>
  );
}

export default Advertiser;
