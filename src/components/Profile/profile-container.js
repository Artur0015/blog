import { connect } from "formik"
import Profile from "./profile"

function ProfileContainerAPI(props) {

    return <Profile /> 
}



const ProfileContainer = connect()(ProfileContainerAPI)
export default ProfileContainer