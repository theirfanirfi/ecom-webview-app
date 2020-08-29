import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { Icon } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Subscribe, } from "unstated"
import { AuthContainer } from "../store/auth"
// import { CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation';
import RBSheet from "react-native-raw-bottom-sheet";
// import { Button, Card, Title, } from 'react-native-paper';
import { CustomModal } from '../components/CustomModal';
import { getProducts } from '../apis';
import { CartContainer } from '../store/cart';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import AccountTabBottomSheet from './BottomSheetViews/AccountTabBottomSheet.js'
import ProfileTabBottomSheet from './BottomSheetViews/ProfileTabBottomSheet.js'
import MessageTabBottomSheet from './BottomSheetViews/MessageTabBottomSheet.js'
import ShopTabBottomSheet from './BottomSheetViews/ShopTabBottomSheet.js'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#0F0F17'
    },
    img: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
    },
    detailContainer: {
        height: Dimensions.get("window").height / 4 - 20,
    },
    name: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Oswald-Regular',
        marginTop: 10
    },
    price: {
        textAlign: 'center',
        color: '#DD0000',
        fontSize: 24,
        fontFamily: 'Oswald-Regular'
    },
    detail: {
        textAlign: 'justify',
        color: 'white',
        fontSize: 16,
        fontFamily: 'Oswald-Regular',
        padding: 10
    },
    wrapperCountContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 122,
        borderWidth: 1,
        borderColor: '#3E3E3E',
        marginLeft: 10,
        marginBottom: 8,
    },
    wrapperSign: {
        backgroundColor: '#383838',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
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
    wrapperCount: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sign: {
        color: 'white',
    },
    count: {
        color: 'white',
    },
    addToCartBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DD0000',
        marginRight: 10,
        borderRadius: 0,
        fontFamily: 'Oswald-Regular'
    },
    addToCartBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Oswald-Regular",
        paddingHorizontal: 10
    },
    wrapperCountAddCartBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    closeIconRoot: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "flex-end",
        marginRight: 20,
    },
    closeIconContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: 27,
        width: 27,
        borderRadius: 27,
        marginRight: 7,
        marginTop: 7,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    basketIcon: {
        // fontSize: 30,
        color: 'red',
    },
    basketIconRoot: {
        position: 'absolute',
        left: 5,
        zIndex: 1,
        top: Dimensions.get("window").height / 1.35
    },
    basketIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#bebebe',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    basketCountContainer: {
        justifyContent: 'center',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: 'red',
        alignItems: 'center',
        left: 35,
        top: 13,
        zIndex: 1,
    },
    basketCount: {
        color: 'white',
        fontSize: 12,
        fontFamily: "Roboto-Bold"
    },
});

class ProductsScreen extends Component {

    state = {
        productsList: [],
        quickModalVisible: false,
        modalData: {},
        addCount: 1,
        loading: true,
        activeTab: 'account',
        RBSheetView: null,
        posts: [],
        user_id: null,
        view: 'Login',

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

    async componentDidMount() {
        const user = await AsyncStorage.getItem("user");
        const parsedUser = JSON.parse(user || {});
        const { user_id } = parsedUser;
        this.setState({ user_id, user_id })


    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="black" name={icon} />
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

    async componentDidMount() {
        const { status, message } = await getProducts()
        if (status) {
            this.setState({ productsList: message.data })
        }
        this.setState({ loading: false })

    }
    addToCartHandler = () => {
        alert('Pakistan Zindabad')
    }

    quickViewHandler = (id) => {
        let dataModal = this.state.productsList.find((item => item.id === id))
        this.setState({ quickModalVisible: true, modalData: dataModal })
    }

    addCart = () => {
        let localCount = this.state.addCount;
        this.setState({ addCount: this.state.addCount + 2 })
    }

    lessCart = () => {
        let localCount = this.state.addCount;
        if (localCount !== 0) {
            this.setState({ addCount: localCount - 1 })
        }
    }

    addToCart = () => {
        alert("This Item is add to cart.")
    }

    render() {
        const { productsList, loading } = this.state;
        const { navigation } = this.props
        console.log(this.state.modalData)
        return (
            <Subscribe to={[CartContainer]}>
                {
                    (cartStore) => {
                        const { state: { cart }, addToCart, increaseCount, decreaseCount, removeFromCart } = cartStore
                        return (
                            <View style={styles.root}>
                                {
                                    loading ? <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                                        <ActivityIndicator size="large" color="#DD0000" />
                                    </View> : (

                                            <View style={{ flex: 1 }}>

                                                <WebView
                                                    scrollEnabled={false}
                                                    source={{ uri: 'https://illumenium.veebispetsid.com/tootekategooria/merch-shop/' }}
                                                // StarRatingInLoadingState
                                                // saclesPageToFit
                                                // javaScriptEnabled
                                                // style={{ flex:1, padding: 0, marginTop:20 }}
                                                // scrollEnabled={false}
                                                />


                                            </View>
                                        )
                                }
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

                            </View >

                        )
                    }
                }

            </Subscribe>
        )
    }
}

export { ProductsScreen }