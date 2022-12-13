//nnext modified
import NextLink from "components/Next/Link";

//components
import { ButtonAlbum } from "components/Album";
import { FriendsButton } from "./FriendsButton";

//material UI
import { Box, Avatar, Typography, Button } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export function Info({
  user,
  profileDetail,
  setProfileDetail,
  cromos,
  alertSms,
}) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          "@media (max-width: 600px)": {
            display: "block",
          },
        }}
      >
        <Box
          sx={{
            marginRight: "100px",
            "@media (max-width: 600px)": {
              marginRight: "0px",
            },
          }}
        >
          <Avatar
            sx={{
              width: "150px ",
              height: "150px",
              margin: "auto",
              "@media (max-width: 600px)": {
                width: "100px ",
                height: "100px",
              },
            }}
            alt={profileDetail.user.username}
            src={profileDetail.user.profile?.avatar}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                "@media (max-width: 600px)": {
                  display: "block",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "25px",
                  marginRight: "10px",
                  "@media (max-width: 600px)": {
                    textAlign: "center",
                    marginTop: "10px",
                  },
                }}
              >
                {profileDetail.user.username.length > 15
                  ? profileDetail.user.username.slice(0, 15) + "..."
                  : profileDetail.user.username}
              </Typography>

              {user?.username === profileDetail.user.username ? (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditOutlinedIcon />}
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
                  component={NextLink}
                  href="/accounts/edit"
                >
                  Editar perfil
                </Button>
              ) : (
                <FriendsButton
                  user={user}
                  profileDetail={profileDetail}
                  setProfileDetail={setProfileDetail}
                />
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "15px", marginRight: "10px" }}>
                <b>{profileDetail.total_friends}</b>{" "}
                {profileDetail.total_friends === 1 ? "amigo" : "amigos"}
              </Typography>
              <Typography sx={{ fontSize: "15px", marginRight: "10px" }}>
                <b>{profileDetail.percentage.toFixed(2)}%</b> álbum
              </Typography>
              <Typography sx={{ fontSize: "15px", marginRight: "10px" }}>
                <b>{profileDetail.total_cromos}</b> cromos
              </Typography>
            </Box>
            <Box sx={{}}>
              <Typography
                sx={{
                  fontSize: "17px",
                  marginRight: "10px",
                  textTransform: "capitalize",
                }}
              >
                <b> {profileDetail.user.first_name} </b>
                <b> {profileDetail.user.last_name} </b>
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  marginRight: "10px",
                  wordBreak: "overflow-wrap",
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{
                  __html: profileDetail.user.profile?.bio,
                }}
              ></Typography>
              <Typography sx={{ fontSize: "15px", marginRight: "10px" }}>
                <b>
                  <a
                    href={profileDetail.user.profile?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileDetail.user.profile?.link}
                  </a>
                </b>
              </Typography>
            </Box>
            <ButtonAlbum
              size={"small"}
              extraStyles={{
                border: "1px solid ",
                fontWeight: "0",
                marginTop: "10px",
                border: "none",
                "&:hover": {
                  border: "none",
                },
              }}
              variant={"contained"}
              user_cromos={cromos}
              alertSms={alertSms}
              profileDetail={profileDetail}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
