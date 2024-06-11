import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Flex,
    Grid,
    Heading,
    Skeleton,
} from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";
import Footer from "../components/Footer";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeWindow, setTimeWindow] = useState("day");

    useEffect(() => {
        setLoading(true);
        fetchTrending(timeWindow)
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(err, "err");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [timeWindow]);

    return (
        <Container maxW={"container.xl"}>
            <Flex
                alignItems="center"
                justifyContent="center"
                gap={"4"}
                my={"20"}
            >
                <Heading
                    as="h2"
                    fontSize={"md"}
                    textTransform={"uppercase"}
                    textAlign="center"
                >
                    Trending
                </Heading>
                <Flex
                    alignItems={"center"}
                    justifyContent="center"
                    gap={"2"}
                    border={"1px solid orange"}
                    borderRadius={"20px"}
                >
                    <Box
                        as="button"
                        px="3"
                        py="1"
                        borderRadius={"20px"}
                        fontWeight={"600"}
                        bg={`${timeWindow === "day" ? "orange.500" : ""}`}
                        onClick={() => setTimeWindow("day")}
                    >
                        Today
                    </Box>
                    <Box
                        as="button"
                        px="3"
                        py="1"
                        borderRadius={"20px"}
                        fontWeight={"600"}
                        bg={`${timeWindow === "week" ? "orange.500" : ""}`}
                        onClick={() => setTimeWindow("week")}
                    >
                        This week
                    </Box>
                </Flex>
            </Flex>
            {/* {loading && <div>Loading...</div>} */}
            <Grid
                templateColumns={{
                    base: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                    xl: "repeat(5, 1fr)",
                }}
                gap={"4"}
            >
                {data &&
                    data.map((item, i) =>
                        loading ? (
                            <Skeleton height={300} key={i} />
                        ) : (
                            <CardComponent
                                key={item?.id}
                                item={item}
                                type={item?.media_type}
                            />
                        )
                    )}
            </Grid>
            <Footer />
        </Container>
    );
};

export default Home;
