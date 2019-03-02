import React, {Component} from "react"
import {StyleSheet,
    View, FlatList} from "react-native"
import Header from "../components/header"
import Post from "../components/post"
import {connect} from "react-redux"

class Feed extends Component {

    render(){
        return (
            <View style={styles.container}>
                <Header></Header>
                <FlatList data={this.props.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) => <Post key={item.id} {...item} />}>
                </FlatList>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
})

const mapStateToProps = ({posts}) => {
    return {
        posts: posts.posts
    }
}

export default connect(mapStateToProps)(Feed)