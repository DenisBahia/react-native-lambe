import {ADD_POST, ADD_COMMENT} from "../actions/actionTypes"

const initialState = {
    posts: [{
        id: Math.random(),
        nickname: "Denis Bahia",
        email: "denis.bahia@aptus.com.br",
        image: require("../../../assets/imgs/fence.jpg"),
        comments: [{
                nickname: "Luciana Pontel",
                comment: "top !!!"
            },
            {
                nickname: "Lucas Bahia",
                comment: "ficou feio..."
            }]
        },
        {
            id: Math.random(),
            nickname: "Luciana Pontel",
            email: "luciana.pontel@aptus.com.br",
            image: require("../../../assets/imgs/bw.jpg"),
            comments: [{
                nickname: "Luciana Pontel",
                comment: "kkkk auh a uha uha a uha uia"
            },
            {
                nickname: "Denis Bahia",
                comment: " uha hjassasad uhsda sda uysda sda sda ui"
            },
            {
                nickname: "Denis Bahia",
                comment: " tijiowe 92378934  y894tsef u890us"
            }]
        },
        {
            id: Math.random(),
            nickname: "Denolao",
            email: "blablabla@aptus.com.br",
            image: require("../../../assets/imgs/boat.jpg"),
            comments: []
        }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat({
                    ...action.payload
                })
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        if (post.comments){
                            post.comments = post.comments.concat(
                                action.payload.comment
                            )
                        } else {
                            post.comments = [action.payload.comment]
                        }
                    }
                    return post
                })
            }
        default:
            return state
    }   
}

export default reducer