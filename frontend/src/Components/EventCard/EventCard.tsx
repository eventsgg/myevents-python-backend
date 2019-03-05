import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import graphql from 'babel-plugin-relay/macro';
import { fragment } from 'relay-compose';
import { compose } from "recompose";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

interface IEventCardProps {
    classes: {
        root: string;
        media: string;
        actions: string;
    };
    card: {
        id: string;
        mainImgMedia: {
            url: string;
            title: string;
        };
        title: string;
    }
    shareModalStore?: any
}

const query = graphql`
    fragment EventCard_card on Event {
        id,
        title,
        mainImgMedia {
            title,
            url
        }
}`

@inject('shareModalStore')
@observer class PureEventCard extends Component<IEventCardProps> {
    showShareModal = (e) => {
        e.preventDefault();
        this.props.shareModalStore.open = true;
    }

    renderLink = linkProps => <Link to={`/deals/${this.props.card.id}`} {...linkProps} />;

    render() {
        const { classes, card: { mainImgMedia, title } } = this.props;

        return (
            <Card component={this.renderLink} className={classes.root}>

                <CardMedia className={classes.media} image={mainImgMedia.url} title={mainImgMedia.title} />

                <CardContent>
                    <Typography variant={'title'}>{title}</Typography>
                </CardContent>

                <CardActions className={classes.actions} disableActionSpacing>

                    <IconButton aria-label="Добавить в избранное">
                        <FavoriteIcon />
                    </IconButton>

                    <IconButton onClick={this.showShareModal} aria-label="Поделиться">
                        <ShareIcon />
                    </IconButton>

                </CardActions>
            </Card>
        );
    }
}

const EventCard = compose(
    withStyles(({
        root: {
            display: 'block',
            textDecoration: 'none'
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        actions: {
            display: "flex",
        }
    })),
    fragment(query)
)(PureEventCard);

export { EventCard };