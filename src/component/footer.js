import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  bottom: 0,
  left: 50,
  position: 'inherit',
  marginTop:'10px',
  borderRadius: '5px'
});

function Footer() {
  return (
    <StyledAppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="body1" color="inherit">
          This is the footer
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Footer;
