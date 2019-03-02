import {connect} from "react-redux"
import {login} from "../store/actions/user"
import React, {Component} from "react"
import {StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View} from "react-native"

class Login extends Component {

    state = {
        name: "temporario",
        email: "",
        password: ""
    }

    login = () => {
        this.props.onLogin({...this.state})
        this.props.navigation.navigate("Profile")
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Email" style={styles.input}
                    autoFocus={true} keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}></TextInput>
                <TextInput placeholder="Senha" style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}></TextInput>
                <TouchableOpacity onPress={this.login} style={styles.buttom}>
                    <Text style={styles.buttomText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("Register")
                }} style={styles.buttom}>
                    <Text style={styles.buttomText}>Criar Nova Conta</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        marginTop: 20,
        width: "90%",
        height: 40,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#333"
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: "#4286f4"
    },
    buttomText: {
        fontSize: 20,
        color: "#fff"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)