import React from 'react';
import {AuthContext} from './AuthContext';

function Logout(props) {
  const {logout} = React.useContext(AuthContext);
  const {match: {params: {redirect}}, history} = props;

  React.useEffect(() => {
    (async () => {
        await logout();
        history.push(`/login/${redirect}`);
    })();
  }, [history, logout, redirect])

  return (
    <></>
  );
}

export default Logout;
