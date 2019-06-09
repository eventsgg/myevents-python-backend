import React, { Component } from 'react';
import Link from 'next/link';
import { observer, inject } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import { IShareModalStore } from '../../Typings/';

interface IEventCardProps {
    classes: {
        root: string;
        media: string;
        actions: string;
    };
    card: {
        id: string;
        img: string;
        title: string;
    }
    shareModalStore?: IShareModalStore
}

const styles = {
    root: {
        display: 'block',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: "flex",
    }
};

@inject('shareModalStore')
@observer class PureEventCard extends Component<IEventCardProps> {
    constructor(props: IEventCardProps) {
        super(props);

        this.showShareModal = this.showShareModal.bind(this);
    }

    showShareModal(e) {
        e.preventDefault();
        this.props.shareModalStore!.open = true;
    }

    render() {
        const { classes, card: { id, img, title } } = this.props;

        return (
            <Link href={`/deal?id=${id}`}>
                <Card className={classes.root}>

                    <CardMedia className={classes.media} image={img} />

                    <CardContent>
                        <Typography variant="h6">{title}</Typography>
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
            </Link>
        );
    }
}

const EventCard = withStyles(styles)(PureEventCard);

export { EventCard };