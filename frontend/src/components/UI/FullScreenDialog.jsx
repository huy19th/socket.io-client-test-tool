import { useState, forwardRef } from 'react';
import { AppBar, Toolbar, Dialog } from '@mui/material';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ children, title, icon }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                {icon}
            </div>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className="relative">
                    <Toolbar>
                        <Typography sx={{ flex: 1, textAlign: "center" }} variant="h6" component="div">
                            {title}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{
                                position: "fixed",
                                top: "10px",
                                right: "10px"
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Toolbar/>
                {children}
            </Dialog>
        </div>
    );
}