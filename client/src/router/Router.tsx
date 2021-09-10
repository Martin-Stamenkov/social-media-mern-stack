import React, { useEffect } from 'react'
import { AuthForm, getUser } from 'auth'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Home, Profile } from 'screens'
import { getPosts } from 'post'
import { GET_USER_SUCCESS } from 'auth/types'
import { userData } from 'utils'

export function Router() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
        if (userData) {
            if (userData.result?._id) {
                dispatch(getUser(userData.result?._id))
            } else {
                const userGoogle = userData
                dispatch({ type: GET_USER_SUCCESS, payload: userGoogle })
            }
        }
    }, [dispatch])

    return (
        <>
            <Switch>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/profile"} component={Profile} />
                <Route exact path={"/auth"} component={AuthForm} />
            </Switch>
        </>
    )
}
