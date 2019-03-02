import React from "react"
import {createBottomTabNavigator, 
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer} from "react-navigation"
import Icon from "react-native-vector-icons/FontAwesome"

import Feed from "../screens/feed"
import AddPhoto from "../screens/addPhoto"
import Profile from "../screens/profile"
import Login from "../screens/login"
import Register from "../screens/register"

const authRouter = createStackNavigator({
    Login: {screen: Login, navigationOptions: {title: "Login"}},
    Register: {screen: Register, navigationOptions: {title: "Register"}}
}, {
    initialRouteName: "Login"
})

const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter
}, {
    initialRouteName: "Auth"
})

const menuRoutes = {
    Feed: {
        name: "Feed",
        screen: Feed,
        navigationOptions: {
            title:"Feed",
            tabBarIcon: ({tintColor}) => 
                <Icon name="home" size={30} color={tintColor} />
        }
    },
    Add: {
        name: "AddPhoto",
        screen: AddPhoto,
        navigationOptions: {
            title:"Add Picture",
            tabBarIcon: ({tintColor}) => 
                <Icon name="camera" size={30} color={tintColor} />
        }
    },
    Profile: {
        name: "Profile",
        screen: loginOrProfileRouter,
        navigationOptions: {
            title:"Profile",
            tabBarIcon: ({tintColor: color}) => 
                <Icon name="user" size={30} color={color} />
        }
    },
}

const menuConfig = {
    initialRouteName: "Feed",
    tabBarOptions: {
        showLabel: false
    }
}

const menuNavigator = createBottomTabNavigator(menuRoutes, menuConfig)
const App = createAppContainer(menuNavigator);
export default App