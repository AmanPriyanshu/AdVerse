import React from 'react';
import { Box, Button, HStack, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      color="text"
      pb="24"
    >
      <HStack spacing={32} direction="row">
      <Button
          mt="3"
          size="lg"
          cursor="pointer"
          padding="1.5rem 3rem"
          fontSize="xl"
          backgroundColor="#ff6ec7"
          color="black"
          boxShadow="0 0 10px #ff6ec7, 0 0 20px #ff6ec7, 0 0 30px #ff6ec7"
          _hover={{
            backgroundColor: '#ff85d2',
            boxShadow: '0 0 30px #ff85d2, 0 0 60px #ff85d2',
            transform: 'scale(1.05)',
          }}
          _active={{
            backgroundColor: '#ff6ec7',
            transform: 'scale(0.95)',
          }}
          onClick={() => navigate('/content-creator')}
        >
          Content Creators
        </Button>
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
          onClick={() => navigate('/advertiser')}
        >
          Advertisers
        </Button>
      </HStack>
    </Flex>
  );
}

export default Home;
