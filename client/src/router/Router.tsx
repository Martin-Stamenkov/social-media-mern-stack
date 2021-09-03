import { AuthForm } from 'auth'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Home } from 'screens'
import { getPosts } from 'store'

export function Router() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <>
            <Switch>
                <Route exact path={"/"} component={Home} />
                <Route exact path={"/auth"} component={AuthForm} />
            </Switch>
        </>
    )
}
