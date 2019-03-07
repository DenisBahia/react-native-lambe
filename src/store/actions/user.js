import {USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOADED, LOADING_USER} from "./actionTypes"
import axios from "axios"
import * as firebase from 'firebase'
import firebaseConfig from "../../firebase"

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT,
    }
}

export const createUser = (user) => {
    return dispatch => {

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function(FBuser) {
            var FBuser = firebase.auth().currentUser
            if (FBuser.uid) {
                axios.put(`/users/${FBuser.uid}.json`, {
                    name: user.name
                })
                .catch(err => console.log(err))
                .then(res => {
                    console.log("Usuario registrado com sucesso !!!")
                })
            }
        }, function(error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            alert(errorMessage)
        });
        
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER,
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED,
    }
}

export const login = user => {
    return dispatch => {
        
        dispatch(loadingUser())

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function(FBuser) {
            var FBuser = firebase.auth().currentUser
            if (FBuser.uid) {
                axios.get(`/users/${FBuser.uid}.json`)
                .catch(err => console.log(err))
                .then(res => {
                    user.name = res.data.name
                    user.password = null
                    dispatch(userLogged(user))
                    dispatch(userLoaded())
                })
            }
        }, function(error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            alert(errorMessage)
        });

    }
}