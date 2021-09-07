import React, { useEffect } from 'react'
import { AuthForm, getUser } from 'auth'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Home, Profile } from 'screens'
import { getPosts } from 'post'
import { Storage } from 'storage'

export function Router() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
        dispatch(getUser(JSON.parse(Storage.getItem("profile") || "null")?.result._id))
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
