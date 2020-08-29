import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Subscribe } from 'unstated';
import { CartList } from '../components/CartList';
import { images } from '../components/Images';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation';
import RBSheet from "react-native-raw-bottom-sheet";
import { CartContainer } from '../store/cart';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import AccountTabBottomSheet from './BottomSheetViews/AccountTabBottomSheet.js'
import ProfileTabBottomSheet from './BottomSheetViews/ProfileTabBottomSheet.js'
import MessageTabBottomSheet from './BottomSheetViews/MessageTabBottomSheet.js'
import ShopTabBottomSheet from './BottomSheetViews/ShopTabBottomSheet.js'


const { Visa, MasterCard, Maestro, Discover, Amex } = images

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#0F0F17',
        flex: 1
    },
    listHeaderContainer: {
        width: Dimensions.get("window").width,
        flexDirection: 'row',
    },
    productHeaderContainer: {
        width: '35%',
    },
    priceHeaderContainer: {
        width: '17%',
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
    quantityHeaderContainer: {
        width: '20%',
    },
    subTotalHeaderContainer: {
        width: '20%',
    },
    iconHeaderContainer: {
        width: '7%',
    },
    listHeaderTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listHeaderProductTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartTotalRoot: {
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#3E3E3E',
    },
    promotionalCodeRoot: {
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#3E3E3E',
        marginBottom: 10
    },
    CouponCodeApplyBtnContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
    },
    cartTotalHeaderContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#3E3E3E',
        marginTop: 10,
    },
    cartTotalHeader: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: "Oswald-Regular"
    },
    subTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10

    },
    shippingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#3E3E3E',
        marginTop: 10

    },
    ByPostContainer: {
        marginBottom: 10
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    cartTotalListText: {
        color: 'white',
        // fontFamily:"Oswald-Regular",
        fontSize: 15
    },
    cartTotalPriceText: {
        color: 'red',
        fontFamily: "Oswald-Regular"
    },
    btnContainer: {
        alignItems: 'flex-end'
    },
    updateCartBtn: {
        width: 122,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DD0000',
        marginTop: 20,
        marginBottom: 10
    },
    updateCartBtnText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: "Oswald-Regular"
    },
    proceedCheckOutBtn: {
        width: 190,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DD0000',
        marginBottom: 5
    },
    container: {
        flex: 1,
        // marginTop: 20,
    },
    proceedCheckOutBtnText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: "Oswald-Regular",

    },
    payPalBtn: {
        width: '100%',
        height: 45,
        backgroundColor: '#FFC439',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    pPayPalImageContainer: {},
    pPayPalImage: {
        width: 90,
        height: 22,
    },
    payPalImageContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
    paPalImage: {
        width: 65,
        height: 25,
    },
    poweredBy: {
        color: 'white',
    },
    payBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    visaBtn: {
        // width: 60,
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aqua',
        marginRight: 5
    },
    visa: {
        width: 50,
        height: 22,
    },
    masterCardBtn: {
        // width: 60,
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3E3939',
        marginRight: 5
    },
    masterCard: {
        width: 50,
        height: 28,
    },
    amexBtn: {
        // width: 60,
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1477BE',
        marginRight: 5
    },
    amex: {
        width: 50,
        height: 22,
    },
    DiscouverBtn: {
        // width: 60,
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'aqua',
        marginRight: 5
    },
    discouver: {
        width: 50,
        height: 22,
        backgroundColor: 'green',
        color: 'red'
    },
    field: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        borderWidth: 1,
        borderColor: "#2E2E30",
        height: 40,
        paddingLeft: 10,
        width: 185,
        fontFamily: "Oswald-Regular"
    },
    couponBtn: {
        width: 122,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DD0000',
        marginLeft: 10,
    },
    couponBtnText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: "Oswald-Regular"
    },
});

class CartsScreen extends Component {
    state = {
        quickModalVisible: false,
        modalData: {},
        addCount: 1,
        promotionalCode: '',
        activeTab: 'account',
        RBSheetView: null,
        posts: [],
    }

    addQuantityHandler = (id) => {
        // let getCartListData = this.state.cartListData;
        const findAddItem = this.state.cartListData.find((item) => item.id === id)
        console.log({ findAddItem })
        // alert("Add quantity.")
        // let localCount = this.state.addCount;
        // this.setState({ addCount: this.state.addCount + 1 })
    }

    lessQuantityHandler = () => {
        // alert("Less quantity.")
        // let localCount = this.state.addCount;
        // if (localCount !== 0) {
        //     this.setState({ addCount: localCount - 1 })
        // }
    }

    cancelItemHandler = () => {
        // alert("Cancel this item.")
    }
    updateCart = () => {
        // alert('Goto Update Cart')
    }

    proceedToCheckOut = () => {
        this.props.navigation.navigate("Checkout")

    }

    payPal = cart => {

        this.props.navigation.navigate("Checkout");

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

    async componentDidMount() {
        const user = await AsyncStorage.getItem("user");
        const parsedUser = JSON.parse(user || {});
        const { user_id } = parsedUser;
        this.setState({ user_id, user_id })

    }

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
            this.props.navigation.navigate('Merch Deals', { screen: 'Carts' })
        }
    }

    payVisa = () => {
        // alert('Goto Visa')
    }

    payMasterCard = () => {
        // alert('Goto MasterCard')
    }

    payAmex = () => {
        // alert('Goto Amex')
    }

    payDiscouver = () => {
        // alert('Goto Discover')
    }

    couponApply = () => {
        // alert("Your Apply Faild")
    }

    render() {
        const { promotionalCode } = this.state;
        const myScript = `
          document.getElementsByClassName('fusion-flyout-mobile-menu-icons')[0].style.visibility = 'hidden';
          true; `;

        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <WebView
                        scrollEnabled={false}
                        source={{ uri: 'https://illumenium.veebispetsid.com/cart/' }}
                        injectedJavaScript={myScript}
                        javaScriptEnabled
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
                        closeOnPressBack={true}
                        onClose={() => this.setState({ RBSheetView: null })}
                        keyboardAvoidingViewEnabled={true}


                    >
                        <View>
                            {this.state.RBSheetView}
                        </View>
                    </RBSheet>
                </View>
            </View>
        )
    }
}

export { CartsScreen }