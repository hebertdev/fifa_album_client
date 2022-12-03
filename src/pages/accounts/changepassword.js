import { useState, useContext } from "react";

//next modified
import HeadTags from "components/Next/HeadTags";

//axios instance
import axiosInstance from "helpers/axios";

//context
import AlertContext from "contexts/AlertContext";

//components edit profile
import NavLeft from "components/NavLeft";

import { TextField, Button, Box, Toolbar, Avatar } from "@mui/material";

export default function ChangePassword({ user }) {
  const { alertSms } = useContext(AlertContext);
  return (
    <>
      <HeadTags title={"SeifTree | Cambiar contraseña"} />
      <Toolbar />
      {user && (
        <ChangePassword2 user={user} alertSms={alertSms}></ChangePassword2>
      )}

      <br />
    </>
  );
}

function ChangePassword2({ user, alertSms }) {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
  });

  const [verifiedPassword, setVerifiedPassword] = useState(true);

  function onChangePassword(e) {
    let xdpassword = {
      ...password,
    };

    xdpassword[e.target.name] = e.target.value;
    setPassword({ ...xdpassword });
    //verify if new_password.length >8 and old_password.length >8 and new_password != old_password
    if (
      xdpassword.new_password.length > 7 &&
      xdpassword.old_password.length > 7
    ) {
      setVerifiedPassword(false);
    } else {
      setVerifiedPassword(true);
    }
  }

  async function onSubmitPassword(e) {
    e.preventDefault();
    try {
      await axiosInstance.put("/change_password/", password);
      setPassword({
        old_password: "",
        new_password: "",
      });
      alertSms("Contraseña actualizada ✔", "success", true);
      setVerifiedPassword(true);
    } catch (error) {
      console.log(error);
      alertSms("Contraseña actual invalida", "error", true);
    }
  }

  return (
    <div className="Container__edit">
      <div className="Container__edit-left">
        <NavLeft />
      </div>
      <div className="Container__edit-right">
        <div className="Sub__contianer_edit_profile">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="container__edit-picture">
              <Avatar src={user.profile.avatar} />
            </div>
            <div>
              <b>
                <p> {user.username} </p>
              </b>
            </div>
          </div>
          <br />

          <form className="form__edit-profile" onSubmit={onSubmitPassword}>
            <Box
              sx={{
                "& > :not(style)": { margin: "10px 0" },
              }}
            >
              <TextField
                label="contraseña actual"
                variant="outlined"
                fullWidth
                autoComplete="off"
                maxLength={50}
                name="old_password"
                placeholder="contraseña actual"
                type="password"
                onChange={onChangePassword}
                value={password.old_password}
              />
              <TextField
                label="nueva contraseña"
                variant="outlined"
                fullWidth
                autoComplete="off"
                maxLength={50}
                name="new_password"
                placeholder="nueva contraseña"
                type="password"
                onChange={onChangePassword}
                value={password.new_password}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={verifiedPassword}
              >
                Actualizar datos
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}
