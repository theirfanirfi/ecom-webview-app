import React from "react";
import { View, Text, Button } from "react-native";
import { Subscribe } from "unstated";
import { AuthContainer } from "../store/auth";
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { WebView } from 'react-native-webview';
class Logout extends React.Component {
    componentDidMount() {
        // var obj = new AuthContainer();
        // const { navigation } = this.props
        // obj.logoutUser(navigation);
        // this.props.navigation.navigate("Login")
        // console.log('logout');
        // alert('Logout successful')
    }

    render() {
        const { navigation } = this.props

        return (
            
            <View style={{ flex: 1}}>
                
                     <WebView
                        scrollEnabled={false}
                        source={{ uri: 'https://illumenium.veebispetsid.com/sisene/?action=logout'}}
                        
             />
            </View>
                
           
        )
    }
}

export { Logout };