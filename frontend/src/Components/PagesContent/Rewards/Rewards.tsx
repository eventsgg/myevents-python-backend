import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import qrCodeImage from '../../../Assets/qr-code.svg';

function RewardsPageContent() {
    return (
        <>
            <Typography variant="h3" paragraph={true}>Промокоды</Typography>
            <Grid container spacing={32}>
                {
                    new Array(10).fill(null).map(() => {
                        return (
                            <Grid item style={{width: '300px', height: '300px'}}>
                                <img style={{width: '100%', height: '100%'}} src={qrCodeImage} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
}

export { RewardsPageContent };