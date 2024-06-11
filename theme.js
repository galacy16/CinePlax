import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const styles = {
    global: (props) => ({
        body: {
            bg: mode("blackAlpha.900", "white")(props),
            color: mode("red.50", "inherit")(props),
        },
    }),
};

const theme = extendTheme({ config, styles });

export default theme;
