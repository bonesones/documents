import { Navigate } from "react-router-dom";

const Protected = function({isSignedIn, children}) {
    console.log(isSignedIn)
    if(isSignedIn) {
        return children
    }

    return <Navigate to="/login" replace />
}

export default Protected