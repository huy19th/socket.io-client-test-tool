import { useState, forwardRef } from 'react';
import { IconButton, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ children, icon, isOpen }) {
    const [open, setOpen] = useState(isOpen);

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
                {children}
            </Dialog>
        </div>
    );
}