import { Box } from '@material-ui/core'
import React from 'react'
import { Header } from './header'

export const Layout: React.FC<{}> = ({ children }) => {
    return (
        <>
            <Header />
            <Box>{children}</Box>
        </>
    )
}
