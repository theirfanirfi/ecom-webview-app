import * as React from 'react';
import { TouchableOpacity } from "react-native"
import { Icon } from "native-base"
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, WebViewScreen, WebViewForSite, ViewBlogPost, Youtube, Logout, SplashScreen, SubscriptionScreen, MainScreen } from "../screens"
import ShopSubscriptionStack from './ShopSubscriptionStack';

const Stack = createStackNavigator();

export const HomeStack = () => (
    <Stack.Navigator

        initialRouteName="SplashScreen"
        headerMode="none"
    >
        <Stack.Screen
            options={({ navigation }) => {
                return (
                    {
                        headerStyle: {
                            backgroundColor: '#000',
                        },
                        headerTitle: null,
                    }
                )
            }}
            name={"Home"} component={HomeScreen} />


        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitle: "",
            headerTintColor: "",
        }} name={"SplashScreen"} component={SplashScreen} />

        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitle: "",
            headerTintColor: ""
        }} name={"MainScreen"} component={MainScreen} />


        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitle: "illuminium",
            headerTintColor: "#fff"
        }} name={"WebViewScreen"} component={WebViewScreen} />

        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitle: "Blog Post",
            headerTintColor: "#fff"
        }} name={"ViewBlogPost"} component={ViewBlogPost} />


        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitle: "Youtube",
            headerTintColor: "#fff"
        }} name={"Youtube"} component={Youtube} />

        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitle: "Logout",
            headerTintColor: "#fff"
        }} name={"Logout"} component={Logout} />

        <Stack.Screen options={{
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitle: "",
            headerTintColor: ""
        }} name={"WebViewForSite"} component={WebViewForSite} />

        <Stack.Screen options={{
            headerTitle: "ShopSubscriptionStack",
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#000',
            },
        }} name={"ShopSubscriptionStack"} component={ShopSubscriptionStack} />

        <Stack.Screen
            options={({ navigation }) => {
                return (
                    {
                        headerStyle: {
                            backgroundColor: '#000',
                        },
                        headerTintColor: "",
                        headerTitle: "account subscription screen",
                        headerLeft: null

                        // headerLeft: () => <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()}>
                        //     <Icon name="menuunfold" type="AntDesign" size={100} style={{ color: "#fff" }} />
                        // </TouchableOpacity>


                    }
                )
            }}
            name={"SubscriptionScreen"} component={SubscriptionScreen} />
    </Stack.Navigator>
)