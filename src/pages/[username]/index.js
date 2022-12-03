import { useState, useEffect } from "react";

//next
import { useRouter } from "next/router";

//helpers
import axiosInstance from "helpers/axios";

//components
import { Info, Feed } from "components/Pages/ProfileDetail";

//material UI
import {
  Toolbar,
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Tab,
  Tabs,
} from "@mui/material";

export default function ProfileDetailPage({ user, profile, alertSms }) {
  const router = useRouter();

  return (
    <>
      {profile && (
        <ProfileDetail user={user} alertSms={alertSms} profile={profile} />
      )}
    </>
  );
}

function ProfileDetail({ user, profile, alertSms }) {
  const [profileDetail, setProfileDetail] = useState(null);
  useEffect(() => {
    setProfileDetail(profile);
  }, [profile]);

  return (
    <>
      <Toolbar />
      {profileDetail && (
        <Container disableGutters>
          <Box sx={{ maxWidth: "800px", margin: "auto", padding: "10px" }}>
            <Info
              user={user}
              profileDetail={profileDetail}
              setProfileDetail={setProfileDetail}
              alertSms={alertSms}
            />
            <br />
            <Feed user={user} profileDetail={profileDetail} />
          </Box>
        </Container>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  var profile = null;
  var headers = {};
  console.log(context.query.username);
  try {
    if (context.req.cookies.id) {
      headers = {
        Authorization: `token ${context.req.cookies.id}`,
      };
    }
    const { data } = await axiosInstance.get(
      `/users/${context.query.username}/`,
      {
        headers,
      }
    );
    profile = data;
  } catch (error) {
    console.log("hoxla");
  }

  return {
    props: {
      profile,
    },
  };
}
