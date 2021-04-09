import React from 'react'
import { View } from 'react-native'
import { Container, Button, Text, Input, Form, Item, Toast, H1 } from "native-base"
import globalStyles from '../styles/global'
import { useNavigation } from "@react-navigation/native"

export default function Login() {

    // React Navigation
    const navigation = useNavigation();

    return (
        <Container style={[globalStyles.contenedor, { backgroundColor: "#E84347" }]}>
            <View style={globalStyles.contenido} >
                <H1 style={globalStyles.titulo}>Uptask</H1>
                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Email"
                        />
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                    </Item>
                </Form>

                <Button
                    square
                    block
                    style={globalStyles.boton}
                >
                    <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
                </Button>

                <Text
                    onPress={() => navigation.navigate("CrearCuenta")}
                    style={globalStyles.enlace}
                >Crear Cuenta</Text>
            </View>
        </Container>
    )
}
