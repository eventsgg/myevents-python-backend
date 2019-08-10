import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import qrCodeImage from '../../../static/qr-code.svg';

function RewardsList() {
    return (
        <>
            <Typography variant="h3" paragraph={true}>Промокоды</Typography>
            <Grid container spacing={8}>
                {
                    new Array(10).fill({ img: qrCodeImage }).map((item, i) => {
                        return (
                            <Grid key={i} item style={{width: '300px', height: '300px'}}>
                                <img style={{width: '100%', height: '100%'}} src={item.img} alt="QR код" />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
}

export { RewardsList };