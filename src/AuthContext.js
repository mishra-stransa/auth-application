import React, {createContext} from 'react';
import Amplify, {Auth} from 'aws-amplify';

export const AuthContext = createContext();

Amplify.configure({
    Auth: {
        identitPoolId: 'ap-northeast-1:3893626b-152b-4393-a981-382ec18c274e',
        region: 'ap-northeast-1',
        userPoolId: 'ap-northeast-1_ZGtXRXYue',
        userPoolWebClientId: '1fo7ne7d7iji21fgqo9akf31vf',
    }
})

const AuthContextProvider = (props) => {

    const login = async (email, password) => {
        try {
            const user = await Auth.signIn(email, password)
            if(!user.signInUserSession.idToken.payload.sessionId || !user.signInUserSession.idToken.payload.authKey) {
                return '以外にエラーはなった！'
            }
            await fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo/', {
                method: 'POST',
                body: JSON.stringify({
                    sessionId: user.signInUserSession.idToken.payload.sessionId,
                    authKey: user.signInUserSession.idToken.payload.authKey,
                }),
                credentials: 'include',
            })
            // alert('')
            return false;
        } catch(err) {
            console.log(err);
            return '以外にエラーはなった！';
        }
    }

    const logout = async () => {
        Auth.signOut();
        const res = await fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo/', {
            method: 'POST',
            body: JSON.stringify({
                logout: true,
            }),
            credentials: 'include',
        })
        // document.cookie = "sso-authenticated=; =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        const parsedRes = res.json();
        return parsedRes.logout;
    }

    return (
        <AuthContext.Provider value={{
            login,
            logout,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;