//components
import { ButtonAlbum } from "components/Album/Button";

//materail UI
import { Box, Container, Typography, Hidden } from "@mui/material";

//assets
import wallpaper from "assets/doha_wallpaper.jpg";
import logo from "assets/logo_2.png";

export function Banner() {
  let banner = null;
  return (
    <Box
      sx={{
        height: "100vh",
        background: `${
          banner
            ? `url('${urlImageW1900(banner?.backdrop_path)}')`
            : `url('${wallpaper.src}')`
        } no-repeat center center fixed`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          background: "rgba(0,0,0,0.75)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          disableGutters
          sx={{
            "@media (max-width: 600px)": {
              padding: "0 10px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "@media (max-width: 600px)": {
                display: "block",
              },
            }}
          >
            <Box
              sx={{
                width: "50%",
                "@media (max-width: 600px)": {
                  width: "100%",
                  textAlign: "center",
                },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "600",
                  fontFamily: "QatarHeavy",
                }}
              >
                ¡Disfruta del Mundial!
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "600",
                  fontFamily: "QatarHeavy",
                }}
              >
                Qatar 2022 ya está aquí
              </Typography>
              <Typography sx={{ color: "white" }}>
                Juega, comparte y disfruta con tus amigos completando el álbum
                de fotos del mundial de fútbol. Conoce equipos, jugadores,
                estadios y mucho más.
              </Typography>
              <br />
              <Hidden smDown>
                <ButtonAlbum />
              </Hidden>
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "@media (max-width: 600px)": {
                  width: "100%",
                },
              }}
            >
              <Box>
                <picture>
                  <img
                    src={logo.src}
                    alt="qatar_logo"
                    style={{
                      width: "50%",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                </picture>
                <Hidden smUp>
                  <ButtonAlbum />
                </Hidden>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
