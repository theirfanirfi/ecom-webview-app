import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation';
import RBSheet from "react-native-raw-bottom-sheet";
// import { Icon } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import AccountTabBottomSheet from '../screens/BottomSheetViews/AccountTabBottomSheet.js'
import ProfileTabBottomSheet from '../screens/BottomSheetViews/ProfileTabBottomSheet.js'
import MessageTabBottomSheet from '../screens/BottomSheetViews/MessageTabBottomSheet.js'
import ShopTabBottomSheet from '../screens/BottomSheetViews/ShopTabBottomSheet.js'
// import { bicons } from '../components/Icons';

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#000000',
        flex: 1
    },
    img: {
        width: '75%',
        height: 250,
        textAlign: 'center',
        marginLeft: 50
    },
    container: {
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#3E3E3E',
        marginTop: 10
    },
    navButton: {
        height: 20,
        // alignItems: 'flex-start',
        justifyContent: 'center',
        // marginTop:20,
        borderBottomWidth: 1,
        borderColor: '#3E3E3E',
        width: '100%',
        padding: 30
    },
    navButtonText: {
        fontFamily: 'Oswald-Regular',
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        paddingBottom: 20
    },
    subsc: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5
    },
    wrapperPriceText: {
        flexDirection: 'row',
        marginBottom: 15
    },
    price: {
        color: 'red',
    },
    month: {
        color: 'white',
    },
    service: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 15
    },
    buyBtn: {
        width: '100%',
        height: 45,
        backgroundColor: '#FFC439',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    buyNow: {
        fontWeight: 'bold',
    },
    quantityHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    wrapperCountContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#3E3E3E',
    },

    wrapperSign: {
        backgroundColor: '#383838',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperCount: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sign: {
        color: 'white',
    },
    count: {
        color: 'white',
        fontSize: 12
    },
    signUpBtn: {
        width: 107,
        height: 37,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    signUpNow: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
    addToWishlistBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 125,
        marginBottom: 5
    },
    addWish: {
        color: 'white',
        marginLeft: 10
    },
    wrapperCategory: {
        flexDirection: 'row',
        marginBottom: 10
    },
    category: {
        color: 'white'
    },

});


class SubscriptionScreen extends Component {
    state = {
        quantity: 1,
        activeTab: 'account',
        RBSheetView: null,
        posts: [],
        user_id: null
    }

    async componentDidMount() {

    }

    buyNowHandler = () => {
        this.props.navigation.navigate("PlayList")
    }


    tabs = [
        {
            key: 'account',
            icon: 'user',
            label: 'Account',
            barColor: 'lightgray',
            pressColor: 'lightgray'
        },
        {
            key: 'chat',
            icon: 'shopping-basket',
            label: 'Shop',
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'profile',
            icon: 'user-circle',
            label: 'Profile',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'inbox',
            icon: "inbox",
            label: 'Messages',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
        ,
        // {
        //     key: 'cart',
        //     icon: 'shopping-cart',
        //     label: 'cart',
        //     barColor: '#E64A19',
        //     pressColor: 'rgba(255, 255, 255, 0.16)'
        // }
    ]

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="black" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            labelStyle={{ color: 'black' }}
            renderIcon={this.renderIcon(tab.icon)}
            style={{ backgroundColor: 'white' }}
        />
    )



    tabClicked = tab => {
        console.log(tab)
        if (tab == 'account') {
            this.setState({
                RBSheetView: <AccountTabBottomSheet navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })
        } else if (tab == "chat") {
            this.setState({
                RBSheetView: <ShopTabBottomSheet navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })

        } else if (tab == "profile") {
            this.setState({
                RBSheetView: <ProfileTabBottomSheet navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })
        } else if (tab == "inbox") {
            this.setState({
                RBSheetView: <MessageTabBottomSheet navigation={this.props.navigation} />
            }, () => {
                this.RBSheet.open();
            })

        }
        else {
            // this.props.navigation.navigate('Merch Deals', { screen: 'Carts' })
        }
    }


    render() {
        const { quantity } = this.state;
        const myScript = `
            var divsToHide = document.getElementsByClassName("fusion-mobile-nav-item");
            for(var i = 0; i < divsToHide.length; i++){
                divsToHide[i].style.display = "none"; 
            }
            var divsToHideExtra = document.getElementsByClassName("logged-out"); 
            for(var i = 0; i < divsToHideExtra.length; i++){
                divsToHideExtra[i].style.display = "none"; 
            }
            var divsToShow = document.getElementsByClassName("show-app"); 
            for(var i = 0; i < divsToShow.length; i++){ 
                divsToShow[i].style.display = "block"; 
            }
        true; `;
        return (
            <View style={styles.root}>


                <View style={styles.container}>
                    <WebView
                        scrollEnabled={false}
                        source={{ uri: 'https://illumenium.veebispetsid.com/my-account/subscriptions/' }}
                        injectedJavaScript={myScript}

                    />

                    <BottomNavigation
                        activeTab={this.state.activeTab}
                        onTabPress={newTab => this.tabClicked(newTab.key)}
                        renderTab={this.renderTab}
                        tabs={this.tabs}
                        style={{ color: 'black', marginLeft: 2 }}
                    />
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        openDuration={250}
                        animationType="slide"
                        closeOnDragDown={true}
                        onClose={() => this.setState({ RBSheetView: null })}
                        keyboardAvoidingViewEnabled={true}

                    >
                        <View>
                            {this.state.RBSheetView}
                        </View>
                    </RBSheet>
                </View>
            </View>
        );
    }
}

export { SubscriptionScreen }