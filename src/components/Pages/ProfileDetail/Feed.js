import { useState, useEffect } from "react";

//helpers
import axiosInstance from "helpers/axios";

//components
import { Cromos } from "./Cromos";
import { Trades } from "./Trades";

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

export function Feed({ user, profileDetail }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
          >
            <Tab label="Cromos" />
            <Tab label="Intercambios" />
          </Tabs>
        </Box>
        {!user ? (
          <NoUser profileDetail={profileDetail} />
        ) : (
          <>
            {value === 0 && (
              <>
                {profileDetail && (
                  <Cromos user={user} profileDetail={profileDetail} />
                )}
              </>
            )}
            {value === 1 && (
              <>
                {profileDetail && (
                  <Trades user={user} profileDetail={profileDetail} />
                )}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
}

function NoUser({ profileDetail }) {
  return (
    <>
      <br />
      <Typography sx={{ textAlign: "center" }}>
        <b>Inicia sesión o registrate</b>
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        Inicia sesión para ver el Álbum y el perfil completo de{" "}
        {profileDetail.user.username}
      </Typography>
    </>
  );
}
