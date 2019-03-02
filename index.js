/** @format */

import React from "react"
import {Provider} from "react-redux"
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import Navigator from "./src/components/navigator"

import storeConfig from "./src/store/storeConfig"
import axios from "axios"

axios.defaults.baseURL = "https://lambe-f9148.firebaseio.com/"

const store = storeConfig()

const Redux = () => (
    <Provider store={store}>
        <Navigator />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
