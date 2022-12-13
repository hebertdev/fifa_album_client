import { useState, useEffect, useContext } from "react";

//react query
import { useMutation, useQueryClient } from "@tanstack/react-query";

//context
import UserContext from "contexts/UserContext";
import AlertContext from "contexts/AlertContext";

//services
import { pickedSticker, unpickedSticker } from "services/cromos";

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

import none_player from "assets/none_player.jpg";
import normal from "assets/normal-anonimous.webp";
import legendario from "assets/legendario-anonimous.webp";
import mitico from "assets/mitico-anonimous.webp";

export function CardCromo({ cromo, user_cromos }) {
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
          String(cromo.code)
      );

      setCromos([...cromos]);
    }
  }, [user_cromos, cromo.code]);

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
      <CardActionArea sx={{ position: "relative" }} onClick={handleClickOpen}>
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
                    ? normal.src
                    : pickedCromo.sticker_variant.variant === "Legendary"
                    ? legendario.src
                    : pickedCromo.sticker_variant.variant === "Mithical"
                    ? mitico.src
                    : none_player.src
                  : none_player.src
              }
              alt={cromo.name}
              style={{
                width: "100%",
                boxShadow: "5px 5px 4px 2px rgba(0,0,0,0.3)",
                WebkitBoxShadow: "5px 5px 4px 2px rgba(0,0,0,0.3)",
                MozBoxShadow: "5px 5px 4px 2px rgba(0,0,0,0.3)",
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
                    {cromo.name}
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
                <br />
                <br />
              </>
            )}

            {cromo.name}
            <br />
            <small style={{ fontSize: ".6rem" }}>{cromo.type}</small>
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
                            ? normal.src
                            : pickedCromo.sticker_variant.variant ===
                              "Legendary"
                            ? legendario.src
                            : pickedCromo.sticker_variant.variant === "Mithical"
                            ? mitico.src
                            : none_player.src
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
                            ? normal.src
                            : cromo.sticker_variant.variant === "Legendary"
                            ? legendario.src
                            : mitico.src
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
