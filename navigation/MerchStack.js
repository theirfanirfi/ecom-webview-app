import * as React from 'react';
import { TouchableOpacity } from "react-native"
import { Icon } from "native-base"
import { createStackNavigator } from '@react-navigation/stack';
import { ProductsScreen, CartsScreen, CheckoutScreen, PayPalScreen, WebViewScreen } from "../screens"

const Stack = createStackNavigator();

export const MerchStack = () => (
    <Stack.Navigator

        initialRouteName="Products"
    >
        <Stack.Screen
            options={({ navigation }) => {
                return (
                    {
                        headerStyle: {
                            backgroundColor: '#000',
                        },
                        headerTintColor: "#fff",
                        headerTitle: "Merch Deals",



                    }
                )
            }}
            name={"Products"} component={ProductsScreen} />


        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
                fontFamily: "Oswald-Regular"
            },
            headerTitle: "Cart Details",
            headerTintColor: "#fff"
        }} name={"Carts"} component={CartsScreen} />
        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
                fontFamily: "Oswald-Regular"
            },
            headerTitle: "Checkout",
            headerTintColor: "#fff"
        }} name={"Checkout"} component={CheckoutScreen} />

        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
                fontFamily: "Oswald-Regular"
            },
            headerTitle: "Payment",
            headerTintColor: "#fff"
        }} name={"PayPalScreen"} component={PayPalScreen} />


    </Stack.Navigator>
)