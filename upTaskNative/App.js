import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Login from "./views/Login";
import CrearCuenta from "./views/CrearCuenta";
import Proyectos from './views/Proyectos';
import NuevoProyecto from './views/NuevoProyecto';
import Proyecto from './views/Proyecto';

export default function App() {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">

            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "Iniciar Sesión",
                headerShown: false
              }}
            >
            </Stack.Screen>

            <Stack.Screen
              name="CrearCuenta"
              component={CrearCuenta}
              options={{
                title: "Crear Cuenta",
                headerStyle: {
                  backgroundColor: "#28303B"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold"
                }
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="Proyectos"
              component={Proyectos}
              options={{
                title: "Proyectos",
                headerStyle: {
                  backgroundColor: "#28303B"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold"
                }
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="NuevoProyecto"
              component={NuevoProyecto}
              options={{
                title: "Nuevo Proyecto",
                headerStyle: {
                  backgroundColor: '#28303B'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen
              name="Proyecto"
              component={Proyecto}
              options={({ route }) => ({
                title: route.params.nombre,    // ! De esta forma tenemos titulos dinamicos que vienen de la Base de Datos
                headerStyle: {
                  backgroundColor: "#28303B"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold"
                }
              })}
            ></Stack.Screen>

          </Stack.Navigator>
        </NavigationContainer>

      </Root>
    </>
  );
}

const styles = StyleSheet.create({

});
