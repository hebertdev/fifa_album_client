import { useState, useContext } from "react";

//Next modified
import Link from "components/Next/Link";

//context
import DarkModeContext from "contexts/DarkModeContext";

//components
import { SearchFriend } from "components/Pages/Friends";

//material UI
import {
  Box,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

import LogoutIcon from "@mui/icons-material/Logout";
import UserContext from "contexts/UserContext";

export default function MenuButton({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {user ? (
        <Button
          sx={{ marginLeft: "15px" }}
          onClick={() => setOpen(!open)}
          startIcon={
            <Avatar
              color="inherit"
              sx={{ width: "30px", height: "30px" }}
              src={user.profile.avatar}
            />
          }
          endIcon={<MenuIcon />}
        ></Button>
      ) : (
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      )}
      <SwipeableDrawer
        disableSwipeToOpen={true}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        anchor="right"
        sx={{
          overflowX: "hidden",
        }}
      >
        <MenuContent user={user} setOpen={setOpen} />
      </SwipeableDrawer>
    </>
  );
}

function MenuContent({ user, setOpen }) {
  const { color, mode, colorMode, theme } = useContext(DarkModeContext);
  const { logout } = useContext(UserContext);
  function handleClickButtonDarkMode() {
    colorMode.toggleColorMode();
    setOpen(false);
  }
  return (
    <Box>
      <Toolbar>
        <Typography
          sx={{
            color: "inherit",
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
            width: "100%",
            fontFamily: "inherit",
          }}
        >
          MENU
        </Typography>
      </Toolbar>
      <Box
        sx={{
          flexGrow: 1,
          margin: "auto",
          padding: "0 10px ",
          userSelect: "none",
          overflowX: "hidden",
        }}
      >
        <SearchFriend />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          margin: "auto",
          padding: "0 10px ",
          userSelect: "none",
          overflowX: "hidden",
        }}
      >
        {user && (
          <Accordion sx={{ minWidth: "260px" }} expanded={false}>
            <AccordionSummary
              component={Link}
              href={`/${user.username}`}
              onClick={() => setOpen(false)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ width: "30px", height: "30px" }}
                  src={user.profile.avatar}
                />
                <Typography sx={{ marginLeft: "10px", fontFamily: "inherit" }}>
                  Perfil
                </Typography>
              </Box>
            </AccordionSummary>
          </Accordion>
        )}
        <Accordion sx={{ minWidth: "260px" }} expanded={false}>
          <AccordionSummary
            component={Link}
            href={`/`}
            onClick={() => setOpen(false)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: "30px", height: "30px" }}>
                <HomeOutlinedIcon />
              </Avatar>
              <Typography sx={{ marginLeft: "10px", fontFamily: "inherit" }}>
                Inicio
              </Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{ minWidth: "260px" }} expanded={false}>
          <AccordionSummary
            component={Link}
            href={`/worldcup/quizzes`}
            onClick={() => setOpen(false)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: "30px", height: "30px" }}>
                <QuizOutlinedIcon />
              </Avatar>
              <Typography sx={{ marginLeft: "10px", fontFamily: "inherit" }}>
                Quiz
                <br />
                <small>gana sobres para tu álbum</small>
              </Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{ minWidth: "260px" }} expanded={false}>
          <AccordionSummary onClick={handleClickButtonDarkMode}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: "30px", height: "30px" }}>
                {theme.palette.mode === "dark" ? (
                  <Brightness5OutlinedIcon />
                ) : (
                  <Brightness4OutlinedIcon />
                )}
              </Avatar>
              <Typography sx={{ marginLeft: "10px" }}>
                <>
                  {theme.palette.mode === "dark" ? `Modo claro` : `Modo oscuro`}
                </>
              </Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
        {user && (
          <Accordion sx={{ minWidth: "260px" }} expanded={false}>
            <AccordionSummary onClick={logout}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ width: "30px", height: "30px" }}>
                  <LogoutIcon />
                </Avatar>
                <Typography sx={{ marginLeft: "10px" }}>
                  Cerrar sesión
                </Typography>
              </Box>
            </AccordionSummary>
          </Accordion>
        )}
      </Box>
    </Box>
  );
}
