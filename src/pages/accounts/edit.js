import { useState, useEffect, useContext } from "react";

//next modified
import HeadTags from "components/Next/HeadTags";

//axios instance
import axiosInstance, { urlImage } from "helpers/axios";

//contexts
import AlertContext from "contexts/AlertContext";
import UserContext from "contexts/UserContext";

//components edit profile
import NavLeft from "components/NavLeft";

//material UI
import { TextField, Button, Box, Toolbar, Avatar } from "@mui/material";

export default function EditProfile({ user, setUser, alertSms }) {
  return (
    <>
      <HeadTags title={"SeifTree | Editar perfil"} />
      {user && <Edit setUser={setUser} user={user} alertSms={alertSms}></Edit>}
      <br />
    </>
  );
}

function Edit({ user }) {
  const { alertSms } = useContext(AlertContext);
  const { setUser } = useContext(UserContext);
  return (
    <>
      <Toolbar />
      <div className="Container__edit">
        <div className="Container__edit-left">
          <NavLeft />
        </div>
        <div className="Container__edit-right">
          <ContainerEditProfile
            setUser={setUser}
            user={user}
            alertSms={alertSms}
          />
        </div>
      </div>
    </>
  );
}

function ContainerEditProfile({ setUser, user, alertSms }) {
  //manejo de actualizaciones del usuario
  async function editProfile(profile) {
    const { data } = await axiosInstance.patch(
      `/users/${user.username}/profile_edit/`,
      profile
    );
    setUser({ ...data });
  }

  async function editUser(userEdit) {
    const { data } = await axiosInstance.patch(
      `/users/${user.username}/`,
      userEdit
    );
    setUser({ ...data });
  }
  return (
    <div className="Sub__contianer_edit_profile">
      <EditPicture
        user={user}
        editProfile={editProfile}
        alertSms={alertSms}
        setUser={setUser}
      />
      <EditUser
        user={user}
        editUser={editUser}
        alertSms={alertSms}
        setUser={setUser}
      />
    </div>
  );
}

function EditPicture({ user, editProfile, alertSms }) {
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  async function onChangeFile(e) {
    try {
      setSubiendoImagen(true);
      const file = e.target.files[0];
      const imageForm = new FormData();
      imageForm.append("avatar", file);
      await editProfile(imageForm);
      setSubiendoImagen(false);
      alertSms("foto actualizada", "success", true);
    } catch (error) {
      console.log(error);
      setSubiendoImagen(false);
      alertSms("Ups. ocurrio un error intente de nuevo.", "error", true);
    }
  }

  return (
    <div className="container__edit-picture-info">
      <div className="container__edit-picture">
        <Avatar src={user.profile.avatar} />
      </div>
      <div>
        <b>
          <p> {user.username} </p>
        </b>
        <div>
          <div style={{ position: "relative" }}>
            <small className="btn-upload-picture-profile">
              <b>Cambiar foto del perfil</b>
            </small>
            <input
              type="file"
              accept="image/*"
              className="inputfile__edit_profile"
              name="avatar"
              onChange={onChangeFile}
            />
          </div>
        </div>
      </div>
      {subiendoImagen && <>LOADING...</>}
    </div>
  );
}

function EditUser({ user, editUser, alertSms }) {
  const [userEdit, setUserEdit] = useState(user);

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    function verifiendModifiedUser() {
      if (user.username === userEdit.username) {
        setIsModified(false);
        if (user.first_name === userEdit.first_name) {
          setIsModified(false);
          if (user.last_name === userEdit.last_name) {
            setIsModified(false);
          } else {
            setIsModified(true);
          }
        } else {
          setIsModified(true);
        }
      } else {
        setIsModified(true);
      }
    }

    verifiendModifiedUser();
  }, [userEdit, user.first_name, user.last_name, user.username]);

  function handleInputChange(e) {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  }

  async function onSubmitUser(e) {
    e.preventDefault();
    try {
      await editUser(userEdit);
      alertSms("Datos actualizados. 😉", "success", true);
    } catch (error) {
      console.log(error);
      alertSms(
        "Ups.. hubo un error al actualizar tus datos. 😯",
        "error",
        true
      );
    }
  }

  return (
    <form className="form__edit-profile" onSubmit={onSubmitUser}>
      <Box
        sx={{
          "& > :not(style)": { margin: "10px 0" },
        }}
      >
        <TextField
          label="username"
          variant="outlined"
          fullWidth
          autoComplete="off"
          maxLength={50}
          name="username"
          required
          placeholder="username"
          onChange={handleInputChange}
          value={userEdit.username}
        />
        <TextField
          label="first name"
          variant="outlined"
          fullWidth
          autoComplete="off"
          maxLength={50}
          name="first_name"
          placeholder="fist name"
          required
          onChange={handleInputChange}
          value={userEdit.first_name}
        />
        <TextField
          label="last name"
          variant="outlined"
          fullWidth
          autoComplete="off"
          maxLength={50}
          name="last_name"
          required
          placeholder="last name"
          onChange={handleInputChange}
          value={userEdit.last_name}
        />

        {isModified ? (
          <Button type="submit" variant="contained" fullWidth size="large">
            Actualizar datos
          </Button>
        ) : (
          <Button
            type="submit"
            disabled
            variant="contained"
            fullWidth
            size="large"
          >
            Actualizar datos
          </Button>
        )}
      </Box>
    </form>
  );
}
