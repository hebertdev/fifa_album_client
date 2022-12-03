import { useState, useEffect } from "react";

//next
import { useRouter } from "next/router";

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

export function TabFriends() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (router.pathname === "/friends/requests") {
      setValue(0);
    } else if (router.pathname === "/friends/list") {
      setValue(1);
    }
  }, [router.pathname]);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      router.push("/friends/requests");
    }
    if (newValue === 1) {
      router.push("/friends/list");
    }

    setValue(newValue);
  };
  return (
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
        <Tab label="Solicitudes" />
        <Tab label="Amigos" />
      </Tabs>
    </Box>
  );
}
