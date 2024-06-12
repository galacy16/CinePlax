import { SearchIcon } from "@chakra-ui/icons";
import { Box, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // for smooth scrolling
        });
    };

    return (
        <Box py="20" mt="6" bgGradient="linear(to-r, pink.900, #181414)">
            <Container maxW={"container.xl"} px={"20"}>
                <Flex
                    direction={{ base: "column", md: "row" }}
                    alignItems={{ base: "center", md: "center" }}
                    justifyContent={"space-between"}
                >
                    <Link to="/">
                        <Box as="button" onClick={scrollToTop}>
                            <Box
                                fontSize={"2xl"}
                                fontWeight={"bold"}
                                color={"orange.500"}
                                letterSpacing={"widest"}
                                fontFamily={"mono"}
                                display={"flex"}
                                gap={"2"}
                            >
                                <img
                                    src="/logo.png"
                                    width={"30px"}
                                    height={"30px"}
                                />
                                CINEPLAX
                            </Box>
                        </Box>
                    </Link>

                    {/* DESKTOP */}
                    <Flex
                        gap="8"
                        mt={{ base: "8", md: "0" }}
                        alignItems={"center"}
                        justifyContent={"center"}
                        textAlign={"center"}
                        color={"orange.500"}
                        textTransform={"uppercase"}
                    >
                        <Link
                            to={"/"}
                            _hover={{ color: "orange.700" }}
                            onClick={scrollToTop}
                        >
                            Home
                        </Link>
                        <Link to={"/movies"} _hover={{ color: "orange.700" }}>
                            Movies
                        </Link>
                        <Link to={"/series"} _hover={{ color: "orange.700" }}>
                            TV Series
                        </Link>
                        <Link to={"/search"} _hover={{ color: "orange.700" }}>
                            <SearchIcon fontSize={"xl"} />
                        </Link>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Footer;
