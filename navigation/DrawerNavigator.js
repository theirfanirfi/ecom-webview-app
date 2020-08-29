import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthStack } from "./AuthStack"
import DigitalStack from "./DigitalStack"
import ProfileStack from "./ProfileStack"
import FriendsStack from "./FriendsStack"
import ActivityStack from "./ActivityStack"
import SettingStack from "./SettingStack"
import OrdersStack from "./OrdersStack"
import MembershipsStack from "./MembershipsStack"
import ShopStack from "./ShopStack"
import DownloadStack from "./DownloadStack"
import ConcertsStack from "./ConcertsStack"
import InboxStack from "./InboxStack"
import StarredStack from "./StarredStack"
import SentStack from "./SentStack"
import ComposeStack from "./ComposeStack"
import ContactStack from "./ContactStack"
import NewsStack from "./NewsStack"
import { HomeStack } from "./HomeStack"
import { MessengerStack } from "./MessengerStack"
import { SubscriptionStack } from "./SubscriptionStack"
import { ShopSubscriptionStack } from "./ShopSubscriptionStack"
import { MerchStack } from "./MerchStack"
import { SideBar } from "../components/SideBar"
import { PayPalScreen, Youtube, Logout, MainScreen } from '../screens';
const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

    return (

        <Drawer.Navigator headerStyle={{ backgroundColor: '#000' }} initialRouteName="Home" drawerContent={(props) => <SideBar {...props} />} >
            <Drawer.Screen name="Login" component={AuthStack} />
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Merch Deals" component={MerchStack} />
            <Drawer.Screen name="Messenger" component={MessengerStack} />
            <Drawer.Screen name="Orders" component={OrdersStack} />
            <Drawer.Screen name="Memberships" component={MembershipsStack} />
            <Drawer.Screen name="Shop" component={ShopStack} />
            <Drawer.Screen name="Download" component={DownloadStack} />
            <Drawer.Screen name="Concerts" component={ConcertsStack} />
            <Drawer.Screen name="Profile" component={ProfileStack} />
            <Drawer.Screen name="Friends" component={FriendsStack} />
            <Drawer.Screen name="Inbox" component={InboxStack} />
            <Drawer.Screen name="Starred" component={StarredStack} />
            <Drawer.Screen name="Sent" component={SentStack} />
            <Drawer.Screen name="Compose" component={ComposeStack} />
            <Drawer.Screen name="Activity" component={ActivityStack} />
            <Drawer.Screen name="Settings" component={SettingStack} />
            <Drawer.Screen name="Contact us" component={ContactStack} />
            <Drawer.Screen name="News" options={{
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTitle: "News",
                headerTintColor: "#fff"
            }} component={NewsStack} />
            <Drawer.Screen name="Youtube" component={Youtube} />
            <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
    );
}