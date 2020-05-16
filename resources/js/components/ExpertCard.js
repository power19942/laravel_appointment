import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from '../../img/user.png'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 240,
    },
});

const ExpertCard = ({ user }) => {
    const classes = useStyles();

    return (
        <div className='col-md-4'>
            <Card className={classes.root}>
                <CardActionArea component={Link} to={'/details/' + user.id}>
                    <CardMedia
                        className={classes.media}
                        image={img}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {user.expert}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button className='btn-hover' component={Link} to={'/details/' + user.id} size="small" color="primary">
                        Details
                    </Button>

                </CardActions>
            </Card>
        </div>
    )
}

export default ExpertCard
