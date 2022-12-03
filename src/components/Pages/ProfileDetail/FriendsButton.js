import { useState, useContext } from "react";

//context
import AlertContext from "contexts/AlertContext";

//services
import {
  friend_request,
  cancel_friend_request,
  accept_friend_request,
  delete_friend,
} from "services/friends";

//MUI
import { Button, Menu, MenuItem } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

export function FriendsButton({ user, profileDetail, setProfileDetail }) {
  const { alertSms } = useContext(AlertContext);
  return (
    <>
      {profileDetail.user.are_friends ? (
        <ButtonAreFriends
          user={user}
          profileDetail={profileDetail}
          setProfileDetail={setProfileDetail}
          alertSms={alertSms}
        />
      ) : profileDetail.user.friend_request ? (
        <ButtonFriendRequest
          user={user}
          profileDetail={profileDetail}
          setProfileDetail={setProfileDetail}
          alertSms={alertSms}
        />
      ) : profileDetail.user.sending_friend_request ? (
        <ButtonSendingFriendRequest
          user={user}
          profileDetail={profileDetail}
          setProfileDetail={setProfileDetail}
          alertSms={alertSms}
        />
      ) : (
        <ButtonAddFriend
          user={user}
          profileDetail={profileDetail}
          setProfileDetail={setProfileDetail}
          alertSms={alertSms}
        />
      )}
    </>
  );
}

function ButtonAreFriends({ user, profileDetail, setProfileDetail, alertSms }) {
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteFriend = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await delete_friend(user.username, profileDetail.user.username);
      setProfileDetail({
        ...profileDetail,
        user: {
          ...profileDetail.user,
          are_friends: false,
        },
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PeopleOutlineOutlinedIcon />}
        onClick={handleClick}
        sx={{
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "auto",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          },
        }}
      >
        amigos
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDeleteFriend}>Eliminar amigo</MenuItem>
      </Menu>
    </>
  );
}

function ButtonFriendRequest({
  user,
  profileDetail,
  setProfileDetail,
  alertSms,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAcceptFriendRequest = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await accept_friend_request(user.username, profileDetail.user.username);
      setProfileDetail({
        ...profileDetail,
        user: {
          ...profileDetail.user,
          friend_request: false,
          are_friends: true,
        },
      });
      setIsLoading(false);
    } catch (error) {
      alertSms("Hubo un error", "error", true);
      setIsLoading(false);
    }
  };
  const handleCancelFriendRequest = async () => {
    try {
      await cancel_friend_request(user.username, profileDetail.user.username);
      setProfileDetail({
        ...profileDetail,
        user: {
          ...profileDetail.user,
          friend_request: false,
        },
      });
    } catch (error) {
      alertSms("Hubo un error", "error", true);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        startIcon={<PersonAddIcon />}
        sx={{
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "auto",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          },
        }}
        onClick={handleClick}
      >
        Responder
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleAcceptFriendRequest}>
          Aceptar solicitud
        </MenuItem>
        <MenuItem onClick={handleCancelFriendRequest}>Rechazar </MenuItem>
      </Menu>
    </>
  );
}

function ButtonSendingFriendRequest({
  user,
  profileDetail,
  setProfileDetail,
  alertSms,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelFriendRequest = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await cancel_friend_request(user.username, profileDetail.user.username);
      setProfileDetail({
        ...profileDetail,
        user: {
          ...profileDetail.user,
          sending_friend_request: false,
        },
      });
      setIsLoading(false);
    } catch (error) {
      alertSms("Hubo un error", "error", true);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PersonAddIcon />}
        sx={{
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "auto",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          },
        }}
        onClick={handleClick}
      >
        cancelar
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCancelFriendRequest}>
          Cancelar solicitud
        </MenuItem>
      </Menu>
    </>
  );
}

function ButtonAddFriend({ user, profileDetail, setProfileDetail, alertSms }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFriend = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await friend_request(user.username, profileDetail.user.username);
      let profile = { ...profileDetail };
      profile.user.sending_friend_request = true;
      setProfileDetail(profile);
      setIsLoading(false);
    } catch (error) {
      alertSms("Hubo un error", "error", true);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        startIcon={<PersonAddIcon />}
        sx={{
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "auto",
            alignItems: "center",
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          },
        }}
        onClick={handleAddFriend}
      >
        agregar
      </Button>
    </>
  );
}
