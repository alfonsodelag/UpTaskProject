import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import AsyncStorage from "@react-native-community/async-storage";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
    uri: "http://192.168.1.135:4000/"
})

// import { Platform } from "react-native";
// const uri = Platform.OS === "ios" ? "http://localhost:4000": "http://192.168.1.135:4000"

const authLink = setContext(async (_, { headers }) => {
    // Leer el storage
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;
