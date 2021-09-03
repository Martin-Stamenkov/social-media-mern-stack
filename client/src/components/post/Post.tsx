import React, { SetStateAction } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import { Spinner } from '../spinner';
import { useDispatch } from 'react-redux';
import { removePost } from 'store/actions/postsActions';
import { Box } from '@material-ui/core';
import moment from 'moment';

export interface IPost {
    _id?: string,
    title: string,
    message: string,
    selectedFile: string,
    tags: string[],
    createdAt?: string,
    setCurrentId?: any,
    creatorId?: string,
    name?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 360,
            width: 360,
            maxHeight: 430,
            height: 430,
            // flex: "50%",
            margin: 16
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

export function Post({ _id, title, name, message, selectedFile, tags, createdAt, setCurrentId }: IPost) {
    const classes = useStyles();
    const dispatch = useDispatch()

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => setCurrentId(_id)} aria-label="settings">
                        <MoreHorizonIcon />
                    </IconButton>
                }
                title={name}
                subheader={moment(createdAt).fromNow()}
            />
            {selectedFile ? <CardMedia
                className={classes.media}
                image={selectedFile}
            /> : <Spinner size={20} />}
            <CardContent>
                {tags.length > 0 ? <Typography variant="body2" color="textSecondary" component="p">
                    {tags.map((tag: string) => ` #${tag}`)}
                </Typography> : <Box height="20px" />}
                <Typography variant="subtitle1" color="inherit" component="h1">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {message}
                </Typography>
            </CardContent>
            <Box display="flex" justifyContent="space-between">
                <IconButton aria-label="like">
                    <ThumbUpAltIcon />
                    <Typography variant="body2" color="textSecondary" component="p">
                        Like
                    </Typography>
                </IconButton>
                <IconButton onClick={() => _id && dispatch(removePost(_id))} aria-label="delete">
                    <Typography variant="body2" color="textSecondary" component="p">
                        Delete
                    </Typography>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card >
    )
}