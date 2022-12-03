import { useContext, useState, useEffect } from "react";

//next modified
import RouterLink from "components/Next/Link";

//context
import UserContext from "contexts/UserContext";

//components
import ButtonFriend from "./ButtonFriend";

//materail
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Avatar,
} from "@mui/material";

export default function UserCard({ profile }) {
  const [profileDetail, setProfileDetail] = useState(null);

  useEffect(() => {
    setProfileDetail(profile);
  }, [profile]);

  const { user } = useContext(UserContext);
  return (
    <>
      <Grid item xs={6} sm={6} md={2}>
        <Card sx={{ height: "100%" }}>
          <CardActionArea
            component={RouterLink}
            href={`/${profileDetail?.username}`}
          >
            {profileDetail?.profile?.avatar ? (
              <CardMedia
                component="img"
                image={profileDetail?.profile?.avatar}
                alt="cover"
                sx={{ height: "170px" }}
              />
            ) : (
              <Avatar
                sx={{
                  width: "100%",
                  height: "170px",
                  margin: "auto",
                  borderRadius: "0",
                }}
              />
            )}
          </CardActionArea>
          <CardContent
            sx={{
              paddingTop: "5px",
              padding: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {profileDetail?.first_name} {profileDetail?.last_name}
            </Typography>
            {user && (
              <>
                {profileDetail && (
                  <ButtonFriend
                    user={user}
                    profileDetail={profileDetail}
                    setProfileDetail={setProfileDetail}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
