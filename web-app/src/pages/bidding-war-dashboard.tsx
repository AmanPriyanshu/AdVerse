import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, Heading, Button, Text, Grid, GridItem, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const companies = [
  { name: 'AdTech Inc', color: '#FF1493', aggressiveness: 0.8 },
  { name: 'BrandBoost', color: '#00FF00', aggressiveness: 0.6 },
  { name: 'MemeMarketing', color: '#1E90FF', aggressiveness: 0.9 },
  { name: 'ViralVentures', color: '#FFD700', aggressiveness: 0.7 },
  { name: 'TrendSetters', color: '#FF4500', aggressiveness: 0.75 },
];

const BiddingWarDashboard = () => {
  const [products, setProducts] = useState([]);
  const [bids, setBids] = useState({});
  const [winners, setWinners] = useState({});
  const [timeLeft, setTimeLeft] = useState(5);
  const [isAuctionActive, setIsAuctionActive] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const mockProducts = ['T-shirt', 'Sneakers', 'Smartphone', 'Headphones', 'Watch'];
      setProducts(mockProducts);
      const initialBids = {};
      mockProducts.forEach(product => {
        initialBids[product] = companies.map(c => ({ 
          name: c.name, 
          bid: 0, 
          color: c.color, 
          aggressiveness: c.aggressiveness 
        }));
      });
      setBids(initialBids);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let interval;
    if (isAuctionActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 0.1;
          console.log('Time left:', newTime.toFixed(1));
          return newTime;
        });
        simulateBidding();
      }, 100);
    } else if (timeLeft <= 0) {
      setIsAuctionActive(false);
      determineWinners();
    }
    return () => clearInterval(interval);
  }, [isAuctionActive, timeLeft]);

  const simulateBidding = () => {
    setBids(prevBids => {
      const newBids = { ...prevBids };
      products.forEach(product => {
        const currentMaxBid = Math.max(...prevBids[product].map(c => c.bid));
        newBids[product] = prevBids[product].map(company => {
          if (company.bid < currentMaxBid || Math.random() < 0.3) {
            const increase = Math.random() * 2 * company.aggressiveness;
            return {
              ...company,
              bid: Math.min(company.bid + increase, 50),
            };
          }
          return company;
        });
      });
      console.log('New bids:', newBids);
      return newBids;
    });
  };

  const determineWinners = () => {
    const newWinners = {};
    products.forEach(product => {
      const winner = bids[product].reduce((max, company) => 
        max.bid > company.bid ? max : company
      );
      newWinners[product] = winner;
    });
    setWinners(newWinners);
    console.log('Winners:', newWinners);
  };

  const startAuction = () => {
    setIsAuctionActive(true);
    setTimeLeft(5);
    const initialBids = {};
    products.forEach(product => {
      initialBids[product] = companies.map(c => ({ 
        name: c.name, 
        bid: 0, 
        color: c.color, 
        aggressiveness: c.aggressiveness 
      }));
    });
    setBids(initialBids);
    setWinners({});
    console.log('Auction started');
  };

  return (
    <ChakraProvider>
      <Box p={4} maxW="6xl" mx="auto" bg="gray.800" color="white">
        <VStack spacing={4} align="stretch">
          <Heading color="cyan.300">AdVerse Bidding War Dashboard</Heading>
          <Box>
            <Button 
              onClick={startAuction} 
              isDisabled={isAuctionActive}
              colorScheme="purple"
              mr={4}
            >
              {isAuctionActive ? 'Auction in Progress' : 'Start Auction'}
            </Button>
            <Text as="span" fontWeight="bold" color="yellow.300">Time Left: {timeLeft.toFixed(1)}s</Text>
          </Box>
          <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={4}>
            {products.map(product => (
              <GridItem key={product} borderWidth={1} borderColor="cyan.500" borderRadius="md" p={4} bg="gray.700">
                <Heading size="md" mb={2} color="pink.400">{product}</Heading>
                <Box h="240px">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bids[product] || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis domain={[0, 50]} stroke="#fff" />
                      <Tooltip 
                        contentStyle={{backgroundColor: '#333', border: 'none', color: '#fff'}}
                        cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}
                      />
                      <Legend />
                      <Bar dataKey="bid" fill={(data) => data.color} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                {winners[product] && (
                  <Alert status="success" mt={2}>
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Winner: {winners[product].name}</AlertTitle>
                      <AlertDescription>
                        Bid: ${winners[product].bid.toFixed(2)}
                      </AlertDescription>
                    </Box>
                  </Alert>
                )}
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default BiddingWarDashboard;