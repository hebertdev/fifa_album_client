import { useState } from "react";

//components
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

//material UI
import { Button, Dialog, DialogContent } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function ButtoAuth({ alertSms, user, setUser, logout }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("login");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        size="small"
        onClick={handleClickOpen}
      >
        login
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent>
          {section === "login" ? (
            <LoginForm
              alertSms={alertSms}
              handleClose={handleClose}
              user={user}
              setUser={setUser}
              setSection={setSection}
            />
          ) : (
            <RegisterForm
              user={user}
              setSection={setSection}
              alertSms={alertSms}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
