import { useEffect, useState } from "react";

//services
import { friend_request_list } from "services/friends";

//components
import { TabFriends } from "components/Pages/Friends";
import UserCard from "components/UserCard";

//materail
import { Container, Grid, Typography, Toolbar } from "@mui/material";

export default function FriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState([]);

  useEffect(() => {
    const getFriendRequestList = async () => {
      try {
        const data = await friend_request_list("username");
        setFriendRequestList(data);
      } catch {
        console.log("error");
      }
    };
    getFriendRequestList();
  }, []);

  return (
    <>
      <Toolbar />
      <Container
        disableGutters
        sx={{
          padding: "15px",
        }}
      >
        <TabFriends />
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Solicitudes de amistad
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {friendRequestList?.map((friend_request, index) => (
            <UserCard key={index} profile={friend_request.sender} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
