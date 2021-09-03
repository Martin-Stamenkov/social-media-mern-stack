import { Avatar, Box } from '@material-ui/core'
import React from 'react'
import logo512 from "assets/logo512.png"

export function Profile() {
    return (
        <Box>
            <img style={{
                width: "20%",
                height: "20%",
                borderRadius: "50%",
                boxShadow: "3px 0px 18px #2f2a2a",
            }} alt="avatar" src={logo512} />
        </Box>
    )
}
