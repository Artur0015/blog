/* Here will be data from ajax request*/

import { writeReducer } from "../reducers/write-reduce";

let renderEntireTree;


export let store =
{
    _state: {
        newPost: {
            header: 'Hello',
            text: 'Hello',
            Author: 'Artur'
        },
        posts: [
            {
                header: "Hello World",
                text: "Laborum Lorem est proident est irure.",
                author: 'Artur'
            },
            {
                header: 'Bye World',
                text: "Incididunt eiusmod magna qui exercitation.",
                author: 'Artur'
            }
        ]
    },
    getState() {
        console.log('getstate\n\n\n\n\n\n\n\n\n\n\n\n', this._state)
        return this._state
    },
    dispatch(action) {
        this._state = writeReducer(this._state, action)
        console.log(this._state)
    }
}

export const subscribe = (observer) => {
    renderEntireTree = observer
}
