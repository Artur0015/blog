import { connect } from 'react-redux'
import { signupUser } from "../../redux/reducers/auth-reducer"
import Signup from "./signup"
import { useHistory } from "react-router-dom";
import { responseType, userCredentialsType } from '../../redux/reducers/reducer-types'

type propsType = {
    signupUser: (credenrials: userCredentialsType) => Promise<responseType>
}

function SignupContainerWithApi(props: propsType) {
    let history = useHistory()
    async function handleSubmit(values: userCredentialsType, ev: any) {
        console.log('in handle submit');

        let response = await props.signupUser({ username: values.username, password: values.password })
        if (response.detail === 'Username is already taken') {
            ev.setErrors({ username: 'Username is already taken' })
        }
        else if (response.detail === 'OK') {
            history.push('/login')
        }

    }
    return <Signup handleSubmit={handleSubmit} />
}

const SignupContainer = connect(state => ({}), { signupUser })(SignupContainerWithApi)

export default SignupContainer