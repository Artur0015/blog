import { useHistory } from "react-router-dom";
import { userCredentialsType } from "../../redux/reducers/reducer-types";
import { AppStateType } from "../../redux/redux-store";
const { connect } = require("react-redux");
const { loginUser } = require("../../redux/reducers/auth-reducer.ts");
const { default: Login } = require("./login");

type mapDispatchToPropsType = {
    loginUser: (credentials: userCredentialsType) => Promise<{ detail: string }>
}

function LoginContainerWithAPI(props: mapDispatchToPropsType) {
    const history = useHistory()

    async function handleSubmit(values: userCredentialsType, ev: any) {

        const response = await props.loginUser(values)
        if (response.detail === 'Invalid Credentials') {
            ev.setErrors({ password: "Invalid Credentials" })
            ev.setSubmitting(false)
        } else if (response.detail === 'OK') {
            history.push('/menu')
        }
    }
    return <Login handleSubmit={handleSubmit} />
}

const LoginContainer = connect((state: AppStateType) => ({}), { loginUser })(LoginContainerWithAPI)

export default LoginContainer