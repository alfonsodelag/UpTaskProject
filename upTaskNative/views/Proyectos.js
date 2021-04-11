import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text, H2, Content, List, ListItem, Left, Right } from "native-base";
import globalStyles from '../styles/global';
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

const OBTENER_PROYECTOS = gql`
query obtenerProyectos {
    obtenerProyectos {
        id
        nombre
    }
}`;

export default function Proyectos() {

    const navigation = useNavigation();

    // Apollo
    // ! Data: los datos una vez que se hizo la consulta. Loading: cambia a true mientras se hace la consulta
    const { data, loading, error } = useQuery(OBTENER_PROYECTOS);

    console.log(data);
    console.log(loading);
    console.log(error);

    if (loading) return <Text>Cargando...</Text>

    return (
        <Container style={[styles.contenedor], { backgroundColor: "#E84347" }}>
            <Button
                style={[globalStyles.boton], { marginTop: 30 }}
                square
                block
                onPress={() => navigation.navigate("NuevoProyecto")}
            >
                <Text style={globalStyles.botonTexto}>Nuevo Proyecto</Text>
            </Button>

            <H2 style={globalStyles.subtitulo}>Selecciona un Proyecto</H2>

            <Content>
                <List style={styles.contenido}>
                    {data.obtenerProyectos.map(proyecto => (
                        <ListItem
                            key={proyecto.id}
                            onPress={() => navigation.navigate("Proyecto", proyecto)}
                        >
                            <Left>
                                <Text>
                                    {proyecto.nombre}
                                </Text>
                            </Left>
                            <Right>
                                <Text>

                                </Text>
                            </Right>
                        </ListItem>
                    ))}
                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: "#FFF",
        marginHorizontal: "2.5%"
    }
})
