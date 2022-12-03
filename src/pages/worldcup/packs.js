import { useState, useEffect, useContext } from "react";

//next modified
import RouterLink from "components/Next/Link";

//react confetti
import Confetti from "react-confetti";

//services
import { openPack } from "services/packs";

//context
import UserContext from "contexts/UserContext";

//components
import StickerCard from "components/StickerCard";

//materail
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Toolbar,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";

//assets
import cover_min from "assets/sobre.webp";

export default function Packs() {
  const { totalPacks, setTotalPacks } = useContext(UserContext);
  const [arrayPacks, setArrayPacks] = useState([]);

  useEffect(() => {
    setTotalPacks(totalPacks);
    //generar array de packs
    setArrayPacks(new Array(totalPacks).fill(0));
  }, [totalPacks, setTotalPacks]);

  //remove pack from index
  const removePack = (index) => {
    let newArray = arrayPacks;
    newArray.splice(index, 1);
    setArrayPacks([...newArray]);
    setTotalPacks(totalPacks - 1);
  };
  return (
    <>
      <Toolbar />
      <Container
        disableGutters
        sx={{
          padding: "15px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Tienes {totalPacks} {totalPacks === 1 ? "sobre " : "sobres "}
          {totalPacks === 1 ? "disponible " : "disponibles "} para abrir
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {arrayPacks?.map((_, index) => (
            <CardPack key={index} removePack={removePack} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

function CardPack({ removePack, index }) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPack, setIsOpenPack] = useState(false);
  const [cromos, setCromos] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    if (isOpenPack) {
      removePack(index);
      setIsOpenPack(false);
    }
  };

  const handleOpenPack = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      setIsOpenPack(true);
      const data = await openPack();
      setCromos(data);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Grid item xs={6} sm={6} md={2}>
        <Card sx={{ height: "100%" }}>
          <CardActionArea onClick={handleClickOpen}>
            <CardMedia
              component="img"
              image={cover_min.src}
              alt="cover"
              sx={{ height: "100%" }}
            />
          </CardActionArea>
        </Card>
      </Grid>
      {isOpenPack && open && <Confetti />}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={isOpenPack ? true : false}
        maxWidth="md"
      >
        <DialogContent>
          {isLoading && (
            <>
              <Typography sx={{ textAlign: "center" }}>
                Abriendo Sobre...
              </Typography>
            </>
          )}
          {isOpenPack ? (
            <>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {cromos?.map((cromo, index) => (
                  <Grid item xs={6} sm={6} md={2} key={index}>
                    <StickerCard sticker={cromo} />
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                sx={{
                  display: "block",
                  margin: "auto",
                  mt: 2,
                  maxWidth: "200px",
                  textAlign: "center",
                }}
                component={RouterLink}
                href={`/${user?.username}?album=true`}
              >
                Ver álbum
              </Button>
            </>
          ) : (
            <>
              <Card sx={{ height: "100%" }}>
                <CardActionArea onClick={handleClickOpen}>
                  <CardMedia
                    component="img"
                    image={cover_min.src}
                    alt="cover"
                    sx={{ height: "100%", maxWidth: "300PX" }}
                  />
                </CardActionArea>
              </Card>
              <Button
                variant="contained"
                size="small"
                onClick={handleOpenPack}
                sx={{
                  margin: "auto",
                  mt: 2,
                  display: "block",
                }}
              >
                Abrir sobre
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
