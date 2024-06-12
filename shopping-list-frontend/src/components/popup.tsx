import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export interface PopupProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Popup = ({ title, isOpen, onClose, children }: PopupProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Zamknij</Button>
          </DialogActions>
        </Dialog>
      );
}