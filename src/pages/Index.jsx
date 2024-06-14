import { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Image, Input, SimpleGrid, Card, CardBody, Heading, Flex, Spacer, Button, IconButton } from "@chakra-ui/react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/etqnucv7a7cag")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxW="container.xl" p={0}>
      {/* Navbar */}
      <Flex as="nav" bg="teal.500" color="white" p={4} align="center">
        <Heading size="md">HerPlaces</Heading>
        <Spacer />
        <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>
          Home
        </Button>
        <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>
          Login
        </Button>
        <IconButton aria-label="Login with Google" icon={<FaGoogle />} size="lg" variant="ghost" colorScheme="whiteAlpha" mr={2} />
        <IconButton aria-label="Login with Facebook" icon={<FaFacebookF />} size="lg" variant="ghost" colorScheme="whiteAlpha" />
      </Flex>

      {/* Hero Section */}
      <Box position="relative" textAlign="center" color="white">
        <Image src="/images/hero-background.jpg" alt="Female Empowerment" objectFit="cover" width="100%" height="400px" />
        <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="blackAlpha.600" display="flex" alignItems="center" justifyContent="center">
          <VStack spacing={4}>
            <Heading size="2xl">Empowering Women, One City at a Time</Heading>
            <Text fontSize="lg">Discover the best cities for women around the world.</Text>
          </VStack>
        </Box>
      </Box>

      {/* Searchable List of Cities */}
      <Box p={4}>
        <Input
          placeholder="Search for a city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mb={4}
        />
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {filteredCities.map((city) => (
            <Card key={city.id}>
              <CardBody>
                <Heading size="md">{city.city}</Heading>
                <Text>{city.country}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Index;