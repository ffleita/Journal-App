import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from './../firebase/firebase-config'
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( ( user ) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName) );
                setIsLoggedIn( true );

                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );

        });

    }, [ dispatch, setChecking ])

    if ( checking ) {
        return(
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={ JournalScreen }
                        isAuthenticated={ isLoggedIn }
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
