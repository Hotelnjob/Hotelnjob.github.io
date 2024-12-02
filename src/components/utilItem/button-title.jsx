import React from 'react';
import { Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const ArticleButtonTitle = ({ title, isLoading, onButtonClick, icon, showButton = true, buttonText }) => {
    return (
        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid item>
                <Typography variant="h3">{title}</Typography>
            </Grid>
            {showButton && (
                <Grid item>
                    <LoadingButton
                        variant="outlined"
                        startIcon={icon}
                        onClick={onButtonClick}
                        loading={isLoading}
                        loadingPosition="start"
                    >
                        {buttonText}
                    </LoadingButton>
                </Grid>
            )}
        </Grid>
    );
};

export default ArticleButtonTitle;
