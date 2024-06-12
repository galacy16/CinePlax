import {
    Avatar,
    Box,
    Button,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

const Navbar = () => {
    const { user, signInWithGoogle, logout } = useAuth();
    const { onOpen, isOpen, onClose } = useDisclosure();

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            console.log("success");
        } catch (error) {
            console.log("error", error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // for smooth scrolling
        });
    };

    return (
        <Box
            py="6"
            mb="3"
            position="sticky"
            top="0"
            zIndex="sticky"
            bg="blackAlpha.700"
            opacity={"0.98"}
        >
            <Container maxW={"container.xl"}>
                <Flex justifyContent={"space-between"}>
                    <Link to="/">
                        <Box as="button" onClick={scrollToTop}>
                            <Box
                                fontSize={"2xl"}
                                fontWeight={"700"}
                                color={"red"}
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
                        gap="4"
                        alignItems={"center"}
                        display={{ base: "none", md: "flex" }}
                        color={"orange.500"}
                        textTransform={"uppercase"}
                        fontSize={"lg"}
                        fontWeight={"600"}
                    >
                        <Link to={"/"} _hover={{ color: "orange.700" }}>
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
                        {user && (
                            <Menu>
                                <MenuButton>
                                    <Avatar
                                        bg={"orange.500"}
                                        color={"white"}
                                        size={"sm"}
                                        name={user?.email}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <Link to="/watchlist">
                                        <MenuItem color={"wheat"}>
                                            Watchlist
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={logout} color={"wheat"}>
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                        {!user && (
                            <Avatar
                                size={"sm"}
                                bg={"gray.800"}
                                as="button"
                                onClick={handleGoogleLogin}
                            />
                        )}
                    </Flex>
                    {/* Mobile */}
                    <Flex
                        display={{ base: "flex", md: "none" }}
                        alignItems={"center"}
                        gap="4"
                    >
                        <Link to="/search">
                            <SearchIcon fontSize={"xl"} />
                        </Link>
                        <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
                        <Drawer
                            isOpen={isOpen}
                            placement="right"
                            onClose={onClose}
                        >
                            <DrawerOverlay />
                            <DrawerContent bg={"black"}>
                                <DrawerCloseButton />
                                <DrawerHeader
                                    color={"orange.400"}
                                    textTransform={"uppercase"}
                                >
                                    {user ? (
                                        <Flex alignItems="center" gap="2">
                                            <Avatar
                                                bg="red.500"
                                                size={"sm"}
                                                name={user?.email}
                                            />
                                            <Box fontSize={"sm"}>
                                                {user?.displayName ||
                                                    user?.email}
                                            </Box>
                                        </Flex>
                                    ) : (
                                        <Avatar
                                            size={"sm"}
                                            bg="gray.800"
                                            as="button"
                                            onClick={handleGoogleLogin}
                                        />
                                    )}
                                </DrawerHeader>

                                <DrawerBody>
                                    <Flex
                                        flexDirection={"column"}
                                        gap={"10"}
                                        color={"orange.400"}
                                        textTransform={"uppercase"}
                                        onClick={onClose}
                                    >
                                        <Link to="/">Home</Link>
                                        <Link to="/movies">Movies</Link>
                                        <Link to="/series">TV Series</Link>
                                        {user && (
                                            <>
                                                <Link to="/watchlist">
                                                    Watchlist
                                                </Link>
                                                <Button
                                                    variant={"outline"}
                                                    colorScheme="red"
                                                    onClick={logout}
                                                >
                                                    Logout
                                                </Button>
                                            </>
                                        )}
                                    </Flex>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;
