import React, {Component} from "react"
import {StyleSheet,
    View, Image, Dimensions} from "react-native"
import Author from "./author"
import Comments from "./coments"
import AddComment from "./addComment"
import {connect} from "react-redux"

class Post extends Component {
    render() {
        const addComment = this.props.name ?
            <AddComment postId={this.props.id} /> : null
        return (
            <View style={styles.container}>
                <Image source={this.props.image}
                    style={styles.image}></Image>
                <Author email={this.props.email} 
                    nickname={this.props.nickname}></Author>
                <Comments comments={this.props.comments}></Comments>
                {addComment}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width * 3 / 4,
        resizeMode: "contain"
    }
})

const mapStateToProps = ({user}) => {
    return {
        name: user.name
    }
}

export default connect(mapStateToProps)(Post)