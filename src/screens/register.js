import React, {Component} from "react"
import {StyleSheet, 
    View,
    Text,
    TextInput,
    TouchableOpacity} from "react-native"

export default class Register extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Nome"
                    autoFocus={true} value={this.state.name}
                    onChangeText={name => this.setState({name})}></TextInput>
                <TextInput style={styles.input} placeholder="Email"
                    value={this.state.email} keyboardType="email-address"
                    onChangeText={email => this.setState({email})}></TextInput>
                <TextInput style={styles.input} placeholder="Senha"
                    value={this.state.password} secureTextEntry={true}
                    onChangeText={password => this.setState({password})}></TextInput>
                <TouchableOpacity style={styles.buttom}
                    onPress={() => {}}>
                    <Text style={styles.buttomText}>Salvar</Text>
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
        borderColor: "#333",
        paddingLeft: 15
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