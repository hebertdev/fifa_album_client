import { useState, useEffect, useCallback, useContext } from "react";

//next modified
import RouterLink from "components/Next/Link";

//helpers
import { getToken } from "helpers/auth";

//services
import { whoami } from "services/accounts";

//context
import UserContext from "contexts/UserContext";

//components
import ButtoAuth from "./ButtonAuth";
import MenuButton from "./MenuButton";
import { ButtonFriends } from "./ButtonFriends";
import { SearchFriend } from "components/Pages/Friends/SearchFriend";

//Materil UI
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Divider,
  IconButton,
  Badge,
  Hidden,
} from "@mui/material";

import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";

//asets
import LogoDark from "assets/qatar_logo_dev_dark.png";
import LogoLight from "assets/qatar_logo_dev_light.png";

export default function Header({ mode, colorMode, theme, alertSms }) {
  const { setTotalPacks, user, setUser, logout, totalPacks } =
    useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(true);
  const [headerStyles, setHeaderStyle] = useState({
    background: "#090909",
    color: "white",
  });
  const [logoStyler, setLogoStyler] = useState({
    display: "block !important",
    height: "41px",
    background: `${
      theme.palette.mode === "dark"
        ? `url(${LogoDark.src}) no-repeat`
        : `url(${LogoLight.src}) no-repeat`
    }`,
    backgroundSize: "contain",
  });

  useEffect(() => {
    setHeaderStyle({
      background: `${theme.palette.mode === "dark" ? "#090909" : "white"}`,
      color: "#090909",
    });
    setLogoStyler({
      display: "block !important",
      height: "41px",
      background: `${
        theme.palette.mode === "dark"
          ? `url(${LogoDark.src}) no-repeat`
          : `url(${LogoLight.src}) no-repeat`
      }`,
      backgroundSize: "contain",
    });
  }, [theme.palette.mode]);

  const cargarUsuario = useCallback(async () => {
    if (!getToken()) {
      return;
    }

    setLoadingUser(false);
    try {
      setLoadingUser(true);
      const data = await whoami();
      let $usuario = { ...data };
      setUser($usuario.user);
      setTotalPacks($usuario.total_packs);
      setLoadingUser(false);
    } catch (error) {
      console.log(error);
      setLoadingUser(false);
    }
  }, [setUser, setLoadingUser, setTotalPacks]);

  useEffect(() => {
    if (!getToken()) {
      setLoadingUser(false);
    } else {
      cargarUsuario();
    }
  }, [cargarUsuario, setLoadingUser]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" elevation={0} sx={headerStyles}>
          <Container
            disableGutters
            sx={{
              "@media (max-width: 600px)": {
                padding: "0 10px",
              },
            }}
          >
            <Toolbar disableGutters variant="dense">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: "600" }}>
                  <Typography
                    component={RouterLink}
                    href="/"
                    sx={logoStyler}
                  ></Typography>
                </Typography>
              </Box>
              {/*<Button variant="text" sx={{ color: "white", margin: "0 10px" }}>
                Acerca de esta app
              </Button>*/}

              <Hidden smDown>
                <Box sx={{ display: "flex", padding: "5px" }}>
                  <SearchFriend />
                </Box>
              </Hidden>

              {user?.username && (
                <>
                  <ButtonFriends user={user} />
                  <IconButton component={RouterLink} href="/worldcup/packs">
                    <Badge badgeContent={totalPacks} color="error">
                      <MarkAsUnreadOutlinedIcon />
                    </Badge>
                  </IconButton>
                </>
              )}
              {!user && (
                <ButtoAuth alertSms={alertSms} user={user} setUser={setUser} />
              )}
              <MenuButton user={user} />
            </Toolbar>
          </Container>
          {theme.palette.mode === "light" && <Divider />}
        </AppBar>
      </Box>
    </>
  );
}
