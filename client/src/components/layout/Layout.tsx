import { Box } from '@material-ui/core'
import { Spacer } from '../spacer'
import React from 'react'
import { Header } from './header'

export const Layout: React.FC<{}> = ({ children }) => {
    return (
        <>
            <Header />
            <Spacer height={50} />
            <Box>{children}</Box>
        </>
    )
}
