import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, ListItem, Left, Right, Icon, Toast } from 'react-native'
import { gql, useMutation } from "@apollo/client";

const ACTUALIZAR_TAREA = gql`
mutation actualizarTarea($id: ID!, $input: TareaInput, $estado: Boolean) {
    actualizarTarea(id: $id, input: $input, estado: $estado) {
        nombre, 
        id, 
        proyecto,
        estado
    }
}`;

export default function Tarea({ tarea }) {

    // Apollo
    const [actualizarTarea] = useMutation(ACTUALIZAR_TAREA);

    // Cambia el estado de una tarea a completo o incompleto
    const cambiarEstado = async () => {
        console.log(!tarea.estado);

        try {
            const { data } = await actualizarTarea({
                id,
                input: {
                    nombre: tarea.nombre
                },
                estado: !tarea.estado
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ListItem
                onPress={() => cambiarEstado()}
            >
                <Left>
                    <Text>{tarea.nombre}</Text>
                </Left>

                <Right>
                    {tarea.estado ? (
                        <Icon
                            name="ios-checkmark-circle"
                            style={[styles.icono, styles.completo]}
                        />
                    ) : (
                        <Icon
                            name="ios-checkmark-circle"
                            style={[styles.icono, styles.completo]}
                        />
                    )}

                </Right>
            </ListItem>
        </>
    )
}

const styles = StyleSheet.create({
    icono: {
        fontSize: 32
    },
    completo: {
        color: "green"
    },
    incompleto: {
        color: "#E1E1E1"
    },
})