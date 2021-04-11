import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Button, Text, H2, Content, List, Form, Item, Input, Toast } from "native-base";
import globalStyles from "../styles/global";
import { gql, useMutation, useQuery } from "@apollo/client";
import Tarea from "../components/Tarea";

// Crea nuevas Tareas
const NUEVA_TAREA = gql`
mutation nuevaTarea($input: TareaInput){
nuevaTarea(input: $input) {
    nombre,
    id, 
    proyecto,
    estado
}
}`;

// Consulta las tareas del proyecto 
const OBTENER_TAREAS = gql`
query obtenerTareas($input: ProyectoIDInput) {
    obtenerTareas(input: $input) {
        id,
        nombre,
        estado
    }
}`;

export default function Proyecto({ route }) {

    // Obtiene el ID del proyecto 
    const { id } = route.params;

    // State del componente
    const [nombre, guardarNombre] = useState("");
    const [mensaje, guardarMensaje] = useState(null);

    // Apollo
    const [nuevaTarea] = useMutation(NUEVA_TAREA);

    // Apollo obtener Tareas
    const { data, loading, error } = useQuery(OBTENER_TAREAS, {
        variables: {
            proyecto: id
        }
    });

    console.log(data);

    // Validar y crear Tareas
    const handleSubmit = async () => {
        if (nombre === "") {
            guardarMensaje("El nombre de la tarea es obligatorio");
            return;
        }

        // Almacenarlo en la base de datos 

        try {
            const { data } = await nuevaTarea({
                variables: {
                    input: {
                        nombre,
                        proyecto: id
                    }
                }
            });

            console.log(data);
            guardarNombre("");
            guardarNombre("Tarea creada correctamente");

            setTimeout(() => {
                guardarMensaje(null);
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 5000
        })
    }

    // Si Apollo está consultando 
    if (loading) return <Text>Cargando</Text>

    return (
        <Container style={[globalStyles.contenedor], { backgroundColor: "e84347" }}>
            <Form style={{ marginHorizontal: "2.5%", marginTop: 20 }}>
                <Item inlineLabel last style={globalStyles.input}>
                    <Input
                        placeholder="Nombre Tarea"
                        value={nombre}
                        onChangeText={texto => guardarNombre(texto)}
                    />
                </Item>

                <Button
                    style={globalStyles.boton}
                    square
                    block
                    onPress={() => handleSubmit()}
                >
                    <Text>Crear Tarea</Text>
                </Button>
            </Form>

            <H2 style={globalStyles.subtitulo}>Tareas: {route.params.nombre}</H2>

            <Content>
                <List style={styles.contenido}>
                    {data.obtenerTareas.map(tarea => {
                        <Tarea key={tarea.id} tarea={tarea} />
                    })}
                </List>
            </Content>

            {mensaje && mostrarAlerta()}

        </Container>
    )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: "#FFF",
        marginHorizontal: "2.5%"
    }
})