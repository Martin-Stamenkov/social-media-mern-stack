import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { IPost } from 'post';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: "20%",
            marginRight: "20%"
        },
        container: {
            padding: "40px 50px 40px",
            background: theme.palette.background.paper,
            borderRadius: 20,
            boxShadow: "4px 3px 10px #b19d9d",
        },
        image: {
            width: 226,
            height: 152,
            maxHeight: 300,
            borderRadius: 20,
            boxShadow: "4px 3px 10px #b19d9d",
            cursor: "pointer"
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        imagesContainer: {
            display: "flex",
            flexDirection: "row",
            padding: 16
        }
    }),
);

interface IImagesList {
    posts: IPost[],
}


export function ImagesList({ posts }: IImagesList) {
    const classes = useStyles();
    const history = useHistory()

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <Box padding="14px">
                    <Typography color="textSecondary" variant="h6">Photos</Typography>
                </Box>
                <Grid className={classes.imagesContainer} container spacing={2}>
                    {posts.map((post: IPost, index: number) => (
                        <Grid item key={index}>
                            <img className={classes.image} onClick={() => history.push(`post/${post._id}`)} src={post.selectedFile} alt={index.toString()} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
