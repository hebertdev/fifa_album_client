import { useRouter } from "next/router";

//material UI
import { Container, Typography, Box, Divider, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";

import codealo from "assets/codealo.png";
import donweb from "assets/donweb.webp";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <br />
      <Divider sx={{ border: "1px solid rgba(255,255,255,.05)" }} />
      <Container
        sx={{ padding: "30px ", display: { xs: "block", sm: "flex" } }}
      >
        <Box
          flexGrow={1}
          sx={{
            display: { xs: "flex", sm: "block" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "inherit" }}>
              Hebertdev Álbum
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "inherit" }}
            >
              Open source project
            </Typography>
            <br />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "inherit" }}
            >
              Esta aplicación es un proyecto personal, no tiene fines de lucro.
            </Typography>
            <br />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: "inherit",
                textDecoration: "underline",
              }}
              component="a"
              href="https://www.codealo.dev/concurso-hackandgol"
              target="_blank"
            >
              Con esta aplicación estoy participando en el concurso de
              programación de codealo.dev y donweb cloud.
            </Typography>
            <br />
            <picture>
              <img
                src={codealo.src}
                alt={"codealo"}
                style={{
                  width: "100px",
                  background: "white",
                }}
              />
            </picture>
            <br />
            <picture>
              <img
                src={donweb.src}
                alt={"donweb"}
                style={{
                  width: "100px",
                  background: "white",
                }}
              />
            </picture>
            <br />
            <br />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: "inherit",
                textDecoration: "underline",
              }}
              component="a"
              href="https://www.codealo.dev/concurso-hackandgol"
              target="_blank"
            >
              Más información sobre los recursos utilizados en este proyecto
              <br />
              Imágenes , fuentes y más.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", height: "40px" }}>
          <Box sx={{ marginTop: "15px" }}>
            <IconButton
              component="a"
              href="https://hebertdev.netlify.app"
              target="_blank"
            >
              <LanguageIcon color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/hebertdev"
              target="_blank"
            >
              <GitHubIcon color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/hebertdev/"
              target="_blank"
            >
              <LinkedInIcon color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/hebertdev1/"
              target="_blank"
            >
              <InstagramIcon color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.youtube.com/@hebertdev"
              target="_blank"
            >
              <YouTubeIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}
