import { useState } from "react";

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

export default function ButtonFriend({
  user,
  profileDetail,
  setProfileDetail,
}) {
  return (
    <>
      {profileDetail.are_friends ? (
        <ButtonAreFriends
          user={user}
          profileDetail={profileDetail}
          setProfileDetail={setProfileDetail}
        />
      ) : profileDetail.friend_request ? (
        <ButtonFriendRequest
          user={user}
          profileDetail={profileDetail}
          setProfileDetail={setProfileDetail}
        />
      ) : profileDetail.sending_friend_request ? (
        <ButtonSendingFriendRequest
          user={user}
          profileDetail={profileDetail}
          setProfileDetail={setProfileDetail}
        />
      ) : (
        <ButtonAddFriend
          user={user}
          profileDetail={profileDetail}
          setProfileDetail={setProfileDetail}
        />
      )}
    </>
  );
}

function ButtonAreFriends({ user, profileDetail, setProfileDetail }) {
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
      await delete_friend(user.username, profileDetail.username);
      setProfileDetail({
        ...profileDetail,

        are_friends: false,
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
        fullWidth
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

function ButtonFriendRequest({ user, profileDetail, setProfileDetail }) {
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
      await accept_friend_request(user.username, profileDetail.username);
      setProfileDetail({
        ...profileDetail,
        friend_request: false,
        are_friends: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleCancelFriendRequest = async () => {
    try {
      await cancel_friend_request(user.username, profileDetail.username);
      setProfileDetail({
        ...profileDetail,
        friend_request: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        startIcon={<PersonAddIcon />}
        onClick={handleClick}
        fullWidth
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

function ButtonSendingFriendRequest({ user, profileDetail, setProfileDetail }) {
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
      await cancel_friend_request(user.username, profileDetail.username);
      setProfileDetail({
        ...profileDetail,
        sending_friend_request: false,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PersonAddIcon />}
        onClick={handleClick}
        fullWidth
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

function ButtonAddFriend({ user, profileDetail, setProfileDetail }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFriend = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await friend_request(user.username, profileDetail.username);
      let profile = { ...profileDetail };
      profile.sending_friend_request = true;
      setProfileDetail(profile);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        size="small"
        startIcon={<PersonAddIcon />}
        onClick={handleAddFriend}
        fullWidth
      >
        agregar
      </Button>
    </>
  );
}
