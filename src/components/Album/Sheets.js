import { useState, useEffect, useContext } from "react";

//react query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

//services
import { pickedSticker, unpickedSticker } from "services/cromos";

//hooks
import useIsMobile from "hooks/useIsMobile";

//context
import UserContext from "contexts/UserContext";
import AlertContext from "contexts/AlertContext";

//components
import { CardCromo } from "./CardCromo";

//Material UI
import {
  Box,
  Typography,
  Grid,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
} from "@mui/material";

import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";

import emblema_normal from "assets/none-emblema-normal.webp";
import emblema_legendario from "assets/none-emblema-legendario.webp";
import emblema_mitico from "assets/none-emblema-mitico.webp";

//assets
import none_team from "assets/none_team.jpg";
import logo_fifa_qatar from "assets/logo_2.png";
import GroupOfCountries from "./GroupOfCountries";

export function SheetLeft({
  flag,
  wallpaper,
  country_name,
  team_name,
  default_cromos,
  user_cromos,
  color,
}) {
  return (
    <>
      <div
        style={{
          background: "blue",
          width: "100%",
          height: "100%",
          backgroundColor: color,
          background: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          position: "relative",
          fontFamily: "QatarHeavy",
          boxShadow: " -19px 2px 20px -16px rgba(0,0,0,0.6) inset",
          WebkitBoxShadow: " -19px 2px 20px -16px rgba(0,0,0,0.6) inset",
          MozBoxShadow: " -19px 2px 20px -16px rgba(0,0,0,0.6) inset",
          textShadow:
            "-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)",
          color: "white",
        }}
      >
        <br />
        <picture>
          <img
            src={flag}
            alt="qatar flag"
            style={{
              margin: "auto",
              display: "block",
              border: "2px solid white",
              width: "50px",
              height: "30px",
              background: "white",
              borderRadius: "5px",
            }}
          />
        </picture>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "QatarHeavy",
            marginTop: "10px",
            fontSize: ".9rem",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        >
          {country_name.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "QatarHeavy",
            fontSize: ".8rem",
            marginBottom: "5px",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
          }}
        >
          {team_name}
        </Typography>

        <Figuritas
          cromos_text={default_cromos?.sheetLeft.cromos}
          user_cromos={user_cromos}
          country_code={default_cromos?.code}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            padding: "3px",
            background: "linear-gradient(to right,  #330010 , #8d0930)",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Typography
            sx={{ fontFamily: "inherit", width: "150px", fontSize: ".7rem" }}
          >
            Camino a la <br /> Copa Mundial de la FIFA <br /> Qatar 2022
          </Typography>
        </Box>
      </div>
    </>
  );
}

export function SheetRight({
  wallpaper,
  country_name,
  group,
  default_cromos,
  user_cromos,
  color,
}) {
  return (
    <>
      <div
        style={{
          background: "blue",
          width: "100%",
          height: "100%",
          backgroundColor: color,
          background: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          position: "relative",
          fontFamily: "QatarHeavy",
          textShadow:
            " -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            padding: "5px",
            background: "linear-gradient(to right,  #330010 , #8d0930)",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            right: "20px",
          }}
        >
          <picture>
            <img
              src={logo_fifa_qatar.src}
              alt="logo fifa qatar"
              style={{ width: `${useIsMobile() ? "50px" : "70px"}` }}
            />
          </picture>
        </Box>
        <br />
        <EmblemCard default_cromos={default_cromos} user_cromos={user_cromos} />
        <Figuritas
          country_code={default_cromos?.code}
          cromos_text={default_cromos?.sheetRight.cromos}
          user_cromos={user_cromos}
        />

        <GroupOfCountries group={group} />
      </div>
    </>
  );
}

function Figuritas({ cromos_text, user_cromos }) {
  return (
    <>
      <Box sx={{ width: "85%", margin: "auto" }}>
        <Grid container spacing={4}>
          {cromos_text?.map((cromo, index) => (
            <Grid item xs={4} md={4} key={index}>
              <CardCromo cromo={cromo} user_cromos={user_cromos} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

function EmblemCard({ default_cromos, user_cromos }) {
  const [open, setOpen] = useState(false);
  const [cromos, setCromos] = useState([]);
  const [pickedCromo, setPickedCromo] = useState(null);
  const [gallery, setGallery] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user_cromos) {
      const cromos = user_cromos.filter(
        (cromito) =>
          String(cromito.sticker_variant.sticker.unique_code) ===
          String(default_cromos.logo.code)
      );

      setCromos([...cromos]);
    }
  }, [user_cromos, default_cromos.logo.code]);

  useEffect(() => {
    if (cromos.length > 0) {
      const checkedCromo = cromos.find((cromo) => cromo.picked === true);
      setPickedCromo(checkedCromo);
    }
  }, [cromos]);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGallery(false);
  };
  return (
    <>
      <CardActionArea
        sx={{
          width: "70px",
          height: "70px",
          margin: "auto",
          marginBottom: "15px",
          position: "relative",
        }}
        onClick={handleClickOpen}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <picture>
            <img
              src={
                pickedCromo
                  ? pickedCromo.sticker_variant.picture
                    ? pickedCromo.sticker_variant.picture
                    : pickedCromo.sticker_variant.variant === "Common"
                    ? emblema_normal.src
                    : pickedCromo.sticker_variant.variant === "Legendary"
                    ? emblema_legendario.src
                    : pickedCromo.sticker_variant.variant === "Mithical"
                    ? emblema_mitico.src
                    : none_team.src
                  : none_team.src
              }
              alt={""}
              style={{
                width: "100%",
                display: "block",
                margin: "auto",
                marginBottom: "25px",
                boxShadow: "5px 5px 4px 2px rgba(0,0,0,0.2)",
                WebkitBoxShadow: "5px 5px 4px 2px rgba(0,0,0,0.2)",
                MozBoxShadow: "5px 5px 4px 2px rgba(0,0,0,0.2)",
              }}
            />
          </picture>
          {pickedCromo && (
            <>
              {!pickedCromo.sticker_variant.picture && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    width: "100%",
                    textAlign: "center",
                    minHeight: "40px",
                    maxHeight: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                    }}
                  >
                    {pickedCromo.sticker_variant.sticker.name}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>

        {!pickedCromo && (
          <Box
            sx={{
              position: "absolute",
              bottom: "5px",
              color: "black",
              textAlign: "center",
              fontSize: "13px",
              padding: "5px",
              left: "0",
              right: "0",
              fontSize: "0.8rem",
              margin: "auto",
              "@media (max-width: 600px)": {
                fontSize: ".6rem",
              },
            }}
          >
            {cromos.length > 0 && !pickedCromo && (
              <>
                <Tooltip
                  title={
                    user?.id === cromos[0].user
                      ? "Tienes la figurita"
                      : "Existe la figurita"
                  }
                >
                  <PhotoLibraryOutlinedIcon />
                </Tooltip>
              </>
            )}

            <small>{default_cromos?.logo.name}</small>
          </Box>
        )}
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        scroll="paper"
      >
        <>
          {!pickedCromo && cromos.length === 0 && (
            <DialogContent>
              <> No disponible para ver la información </>
            </DialogContent>
          )}
          {!pickedCromo && cromos.length > 0 && (
            <Gallery
              cromos={cromos}
              setPickedCromo={setPickedCromo}
              pickedCromo={pickedCromo}
              setGallery={setGallery}
            />
          )}
          {pickedCromo && (
            <>
              {gallery ? (
                <Gallery
                  cromos={cromos}
                  setPickedCromo={setPickedCromo}
                  pickedCromo={pickedCromo}
                  setGallery={setGallery}
                />
              ) : (
                <>
                  <DialogTitle>
                    {pickedCromo.sticker_variant.sticker.name}
                  </DialogTitle>

                  <DialogContent>
                    <picture>
                      <img
                        src={
                          pickedCromo.sticker_variant.picture
                            ? pickedCromo.sticker_variant.picture
                            : pickedCromo.sticker_variant.variant === "Common"
                            ? emblema_normal.src
                            : pickedCromo.sticker_variant.variant ===
                              "Legendary"
                            ? emblema_legendario.src
                            : pickedCromo.sticker_variant.variant === "Mithical"
                            ? emblema_mitico.src
                            : none_team.src
                        }
                        alt="picture"
                        style={{ width: "100%" }}
                      />
                    </picture>

                    {user?.id === cromos[0].user && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setGallery(true)}
                      >
                        cambiar figurita
                      </Button>
                    )}

                    {pickedCromo && (
                      <>
                        <br />
                        <br />
                        <Typography>Info by wikipedia</Typography>
                        <Box
                          sx={{
                            width: "100%",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              pickedCromo.sticker_variant.sticker.description,
                          }}
                        ></Box>
                      </>
                    )}
                  </DialogContent>
                </>
              )}
            </>
          )}
        </>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Gallery({ cromos, pickedCromo, setPickedCromo, setGallery }) {
  const [value, setValue] = useState(null);
  const { user } = useContext(UserContext);
  const { alertSms } = useContext(AlertContext);
  const queryClient = useQueryClient();
  const {
    mutate: handlePickedSticker,
    error,
    isLoading,
  } = useMutation(pickedSticker, {
    onSuccess: (data) => {
      setPickedCromo(data);
      alertSms("Figurita cambiada con exito", "success", true);
      setGallery(false);
      queryClient.invalidateQueries("user_cromos");
    },
    onError: () => {
      alertSms("Error al cambiar la figurita", "error", true);
    },
  });

  useEffect(() => {
    if (pickedCromo) {
      setValue(pickedCromo.slug);
    }
  }, [pickedCromo]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangePickedCromo = async () => {
    if (isLoading) return;
    const cromo = cromos.find((cromo) => cromo.slug === value);
    handlePickedSticker({ username: user.username, slug: cromo.slug });
  };

  const handleCancel = () => {
    setValue("");
    setGallery(false);
  };

  const { mutate: handleRemoveSticker } = useMutation(unpickedSticker, {
    onSuccess: (data) => {
      setPickedCromo(null);
      setGallery(false);
      alertSms("Figurita quitada", "success", true);
      queryClient.invalidateQueries("user_cromos");
    },
    onError: () => {
      alertSms("Error al quitar la figurita", "error", true);
    },
  });

  const handleUnpickedSticker = async () => {
    if (isLoading) return;
    handleRemoveSticker({ username: user.username, slug: pickedCromo.slug });
  };

  return (
    <>
      {user?.id !== cromos[0].user ? (
        <DialogTitle>
          <Typography>El usuario no a colocado la figurita</Typography>
        </DialogTitle>
      ) : (
        <>
          <DialogTitle>
            {pickedCromo && (
              <IconButton onClick={() => setGallery(false)}>
                <NavigateBeforeOutlinedIcon />
              </IconButton>
            )}
            Selecciona una figurita
          </DialogTitle>
          <DialogContent>
            <RadioGroup value={value} onChange={handleChange}>
              <Grid container spacing="2">
                {cromos?.map((cromo, index) => (
                  <Grid item xs={4} key={index}>
                    <picture>
                      <img
                        src={
                          cromo.sticker_variant.picture
                            ? cromo.sticker_variant.picture
                            : cromo.sticker_variant.variant === "Common"
                            ? emblema_normal.src
                            : cromo.sticker_variant.variant === "Legendary"
                            ? emblema_legendario.src
                            : emblema_mitico.src
                        }
                        alt={cromo.sticker_variant.sticker.name}
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                        onClick={() => setValue(cromo.slug)}
                      />
                    </picture>

                    <FormControl>
                      <FormControlLabel
                        value={cromo.slug}
                        control={<Radio />}
                        label={
                          <Typography variant="caption">
                            {cromo.sticker_variant.sticker.name}
                            <br />
                            <small>{cromo.sticker_variant.variant}</small>
                          </Typography>
                        }
                      />
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            {value && (
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  marginTop: "10px",
                }}
                color="info"
                onClick={handleChangePickedCromo}
              >
                Guardar
              </Button>
            )}

            {value === pickedCromo?.slug ? (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                sx={{
                  marginTop: "10px",
                }}
                onClick={handleUnpickedSticker}
              >
                quitar selección
              </Button>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                sx={{
                  marginTop: "10px",
                }}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            )}
          </DialogActions>
        </>
      )}
    </>
  );
}
