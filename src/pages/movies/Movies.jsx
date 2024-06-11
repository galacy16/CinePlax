import {
    Container,
    Flex,
    Grid,
    Heading,
    Select,
    Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";
import Footer from "../../components/Footer";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchMovies(activePage, sortBy)
            .then((res) => {
                setMovies(res?.results);
                setActivePage(res?.page);
                setTotalPages(res?.total_pages);
            })
            .catch((err) => {
                console.log(err, "err");
            })
            .finally(() => setIsLoading(false));
    }, [activePage, sortBy]);

    return (
        <Container maxWidth={"container.xl"}>
            <Flex alignItems="center" justifyContent="center" gap={"4"} my="20">
                <Heading
                    as="h2"
                    fontSize={"md"}
                    textTransform={"uppercase"}
                    textAlign="center"
                >
                    Discover Films
                </Heading>

                <Select
                    w={"130px"}
                    color="orange.600"
                    onChange={(e) => {
                        setActivePage(1);
                        setSortBy(e.target.value);
                    }}
                >
                    <option value="popularity.desc">Popular</option>
                    <option value="vote_average.desc&vote_count.gte=1000">
                        Top Rated
                    </option>
                    <option value="revenue.desc">Box Office</option>
                </Select>
            </Flex>

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
                {movies &&
                    movies?.map((item, i) =>
                        isLoading ? (
                            <Skeleton height={300} key={i} />
                        ) : (
                            <CardComponent
                                key={item?.id}
                                item={item}
                                type={"movie"}
                            />
                        )
                    )}
            </Grid>

            <PaginationComponent
                activePage={activePage}
                totalPages={totalPages}
                setActivePage={setActivePage}
            />
            <Footer />
        </Container>
    );
};

export default Movies;
