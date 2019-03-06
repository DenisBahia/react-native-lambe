import React, {Component} from "react"
import {StyleSheet,
    View, Text, TextInput
    , TouchableOpacity
    , Image, Dimensions, ScrollView, Alert, Platform } from "react-native"
import ImagePicker from "react-native-image-picker"
import {connect} from "react-redux"
import {addPost} from "../store/actions/posts"

const noUser = "Precisa estar logado para postar..."

class AddPhoto extends Component {
    
    state = {
        image: null,
        comment: ""
    }

    componentDidUpdate = prevProps => {
        if (prevProps.loading && !this.props.loading) {
            this.setState({
                image: null,
                comment: ""
            })
            this.props.navigation.navigate("Feed")
        }
    }

    pickImage = () => {

        if (!this.props.name) {
            Alert.alert("Falha!", noUser)
            return
        }

        ImagePicker.showImagePicker({
            title: "Escolha a imagem",
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if (!res.didCancel){
                this.setState({ image: {uri: res.uri, base64: res.data} })
            }
        })
    }

    save = async () => {

        if (!this.props.name) {
            Alert.alert("Falha!", noUser)
            return
        }

        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [
                {nickname: this.props.name, 
                comment: this.state.comment}
            ]
        })

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe sua imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image}></Image>
                    </View>
                    <TouchableOpacity onPress={this.pickImage}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Escolha a foto
                        </Text>
                    </TouchableOpacity>
                    <TextInput placeholder="Algum comentario ?"
                        style={styles.input}
                        value={this.state.comment}
                        editable={this.props.name != null}
                        onChangeText={comment => this.setState({comment})}
                        >
                    </TextInput>
                    <TouchableOpacity onPress={this.save}
                        disabled={this.props.loading}
                        style={[styles.button, this.props.loading ? styles.buttonDisabled : null]}>
                        <Text style={styles.buttonText} >Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === "ios" ? 30 : 10,
        fontWeight: "bold"
    },
    imageContainer: {
        width: "90%",
        height: Dimensions.get("window").width / 2,
        backgroundColor: "#eee",
        marginTop: 10
    },
    image: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width / 2,
        resizeMode: "center"
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: "#4286f4"
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    input: {
        marginTop: 20,
        width: "90%"
    },
    buttonDisabled: {
        backgroundColor: "#aaa"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

const mapStateToProps = ({user, posts}) => {
    return {
        email: user.email,
        name: user.name,
        loading: posts.isUploading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)