import React, { useEffect, useMemo, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { getPostDetails } from '../api/requests';
import { useHistory, useParams } from 'react-router';
import { IPost } from 'post';
import { Spinner } from 'components';
import { Avatar, Box, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Store } from 'store';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            // width: `calc(100% - ${drawerWidth}px)`,

        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,

        },
        drawerPaper: {
            width: drawerWidth,
            marginTop: 64,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            marginTop: 20,
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(1),
            display: "flex",
            justifyContent: "center"
        },
        img: {
            width: 950,
            height: "auto",
            verticalAlign: "middle",
        },
        avatar: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
        backButton: {
            position: "absolute",
            top: 10,
            bottom: 100,
            "&:hover": {
                backgroundColor: "transparent"
            },
            "& .MuiIconButton-label": {
                backgroundColor: "#bdbdbd",
                padding: 16,
                borderRadius: 50,
                "&:hover": {
                    backgroundColor: theme.palette.background.paper,
                    transform: "translateX(8px)"
                },
            }
        },
        nextButton: {
            position: "absolute",
            top: 10,
            bottom: 100,
            right: 235,
            marginRight: 10,
            "&:hover": {
                backgroundColor: "transparent"
            },
            "& .MuiIconButton-label": {
                backgroundColor: "#bdbdbd",
                padding: 16,
                borderRadius: 50,
                "&:hover": {
                    backgroundColor: theme.palette.background.paper,
                    transform: "translateX(8px)"
                },
            }
        }
    }),
);

export function PostDetails() {
    const classes = useStyles();
    const { id }: { id: string } = useParams()
    const [details, setDetails] = useState<IPost | null>(null);
    const { loading, posts } = useSelector((state: Store) => state?.postsReducer);
    const { authData } = useSelector((state: any) => state?.authReducer);
    const history = useHistory();
    const relatedCreatorPosts = useMemo(() => posts
        .filter((posts: IPost) => posts.creatorId === details?.creatorId), [details?.creatorId, posts])
    const nextElementIndex = useMemo(() => relatedCreatorPosts
        .findIndex((post: IPost) => post._id === id) + 1, [id, relatedCreatorPosts])
    const prevElementIndex = useMemo(() => relatedCreatorPosts
        .findIndex((post: IPost) => post._id === id) - 1, [id, relatedCreatorPosts])

    useEffect(() => {
        const GetDetails = async () => {
            const response = await getPostDetails(id);
            setDetails(response.data)
        }
        GetDetails()
    }, [])

    return (
        !details ? <Spinner /> : <Box className={classes.root}>
            <Box className={classes.content}>
                <Box className={classes.toolbar} />
                <img className={classes.img} src={details.selectedFile} alt={details.title} />
            </Box>
            <IconButton className={classes.nextButton} disabled={loading} onClick={() => history
                .push(`../post/${relatedCreatorPosts[nextElementIndex]?._id ?
                    relatedCreatorPosts[nextElementIndex]?._id :
                    relatedCreatorPosts[0]?._id}`)}
            >
                <ArrowForwardIosIcon />
            </IconButton>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="right"
            >
                {/* <Box className={classes.toolbar} /> */}
                <Divider />
                <List>
                    <ListItem button onClick={() => history.push(authData.id === details.creatorId ? "/profile" : `/user/${details.creatorId}`)} >
                        <Avatar className={classes.avatar}  >{details.name && details.name[0]}</Avatar>
                        <Box marginLeft="4px">
                            <Typography variant="subtitle2" >{details.name}</Typography>
                            <Box>
                                <Typography color="textSecondary" variant="caption" >{moment(details.createdAt).fromNow()}</Typography>
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem  >
                        <Box marginLeft="4px">
                            {details.tags.length > 0 ? <Typography variant="body2" color="textSecondary" component="p">
                                {details.tags.map((tag: string) => ` #${tag}`)}
                            </Typography> : <Box height="20px" />}
                            <Typography variant="subtitle2" >{details.title}</Typography>
                            <Box>
                                <Typography color="textSecondary" variant="caption" >{(details.message)}</Typography>
                            </Box>
                        </Box>
                    </ListItem>
                </List>
                <Divider />

            </Drawer>
            <IconButton className={classes.backButton} disabled={loading} onClick={() => history
                .push(`../post/${relatedCreatorPosts[prevElementIndex]?._id ?
                    relatedCreatorPosts[prevElementIndex]?._id :
                    relatedCreatorPosts[relatedCreatorPosts.length - 1]?._id}`)}>
                <ArrowBackIosIcon />
            </IconButton>

        </Box>

    );
}
