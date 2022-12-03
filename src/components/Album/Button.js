import { useState, useRef, useEffect } from "react";

//next
import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";

//services
import { getUserCromos } from "services/cromos";

//Hooks
import useIsMobile from "hooks/useIsMobile";

//components
import AlbumCover from "./AlbumCover";
import AlbumClosing from "./AlbumClosing";

//countries group A
import { QatarLeft, QatarRight } from "./countries/Qatar";
import { EcuadorLeft, EcuadorRight } from "./countries/Ecuador";
import { SenegalLeft, SenegalRight } from "./countries/Senegal";
import { NetherlandsLeft, NetherlandsRight } from "./countries/Netherlands";

//countries group B
import { InglaterraLeft, InglaterraRight } from "./countries/Inglaterra";
import { IranLeft, IranRight } from "./countries/Iran";
import { UsaLeft, UsaRight } from "./countries/Usa";
import { GalesLeft, GalesRight } from "./countries/Gales";

//countries group C
import { ArgentinaLeft, ArgentinaRight } from "./countries/Argentina";
import {
  ArabiaSauditaLeft,
  ArabiaSauditaRight,
} from "./countries/ArabiaSaudita";
import { MexicoLeft, MexicoRight } from "./countries/Mexico";
import { PoloniaLeft, PoloniaRight } from "./countries/Polonia";

//countries group D
import { FranciaLeft, FranciaRight } from "./countries/Francia";
import { AustraliaLeft, AustraliaRight } from "./countries/Australia";
import { DinamarcaLeft, DinamarcaRight } from "./countries/Dinamarca";
import { TunezLeft, TunezRight } from "./countries/Tunez";

//countries group E
import { SpainLeft, SpainRight } from "./countries/Spain";
import { CostaRicaLeft, CostaRicaRight } from "./countries/CostaRIca";
import { AlemaniaLeft, AlemaniaRight } from "./countries/Alemania";
import { JaponLeft, JaponRight } from "./countries/Japon";

//countries group F
import { BelgicaLeft, BelgicaRight } from "./countries/Belgica";
import { CanadaLeft, CanadaRight } from "./countries/Canada";
import { MarruecosLeft, MarruecosRight } from "./countries/Marruecos";
import { CroaciaLeft, CroaciaRight } from "./countries/Croacia";

//countries group G
import { BrasilLeft, BrasilRight } from "./countries/Brasil";
import { SerbiaLeft, SerbiaRight } from "./countries/Serbia";
import { SuizaLeft, SuizaRight } from "./countries/Suiza";
import { CamerunLeft, CamerunRight } from "./countries/Camerun";

//countries group H
import { PortugalLeft, PortugalRight } from "./countries/Portugal";
import { GhanaLeft, GhanaRight } from "./countries/Ghana";
import { UruguayLeft, UruguayRight } from "./countries/Uruguay";
import { KoreaLeft, KoreaRight } from "./countries/Korea";

//materail UI
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  DialogActions,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";

import HTMLFlipBook from "react-pageflip";

//assets
import wallpaper from "assets/doha_wallpaper.jpg";

export function ButtonAlbum({
  extraStyles,
  size,
  variant,
  user_cromos,
  alertSms,
  profileDetail,
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (profileDetail) {
      if (router.query.album === "true") {
        handleClickOpen();
      }
    }
  }, [profileDetail, router.query.album]);

  return (
    <>
      <Button
        variant={variant ? variant : "outlined"}
        onClick={handleClickOpen}
        size={size}
        sx={{
          border: "2px solid",
          fontWeight: "600",
          transition: "all 0.1s ease-in-out",
          "&:hover": {
            border: "2px solid",
            transform: "scale(1.05)",
          },
          "@media (max-width: 600px)": {
            width: "100%",
            marginTop: "10px",
          },
          ...extraStyles,
        }}
      >
        Ver álbum
      </Button>
      <ModalAlbum
        open={open}
        handleClose={handleClose}
        user_cromos={user_cromos}
        alertSms={alertSms}
        profileDetail={profileDetail}
      />
    </>
  );
}

function ModalAlbum({
  open,
  handleClose,
  user_cromos,
  alertSms,
  profileDetail,
}) {
  const [page, setPage] = useState(0);
  const [select, setSelect] = useState("");
  const [children, setChildren] = useState(null);
  const isMobile = useIsMobile();

  let flipBook = useRef(null);

  const handleClickNext = (e) => {
    e.preventDefault();
    //console.log(flipBook.current.pageFlip().setting.children);
    flipBook.current.pageFlip().flipController.render.setting.disableFlipByClick = false;
    flipBook.current?.pageFlip().flipNext();
    flipBook.current.pageFlip().flipController.render.setting.disableFlipByClick = true;
  };

  const handleClickPrev = (e) => {
    e.preventDefault();
    flipBook.current.pageFlip().flipController.render.setting.disableFlipByClick = false;
    flipBook.current?.pageFlip().flipPrev();
    flipBook.current.pageFlip().flipController.render.setting.disableFlipByClick = true;
  };

  const handlePushPage = (e) => {
    e.preventDefault();
    setSelect(parseInt(e.target.value));
    flipBook.current.pageFlip().turnToPage(parseInt(e.target.value));
  };

  const handleSetBook = () => {
    if (flipBook.current) {
      setChildren([...flipBook?.current?.pageFlip()?.setting?.children]);
    }
  };

  const { data } = useQuery(
    ["user_cromos", profileDetail?.user?.username],
    () => getUserCromos(profileDetail?.user?.username),
    {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      refetchInterval: 180000,
    }
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      sx={{ padding: "0" }}
    >
      <>
        <DialogContent
          sx={{
            background: "linear-gradient(to right, #8d0930, #330010)",
            background: "radial-gradient(#8d0930,  #330010)",
            backgroundImage: `url(${wallpaper.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            //before
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "radial-gradient(#8d0930ad,  #330010e3)",
            },

            overflow: "hidden",
            "@media (max-width: 600px)": {
              padding: "0",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HTMLFlipBook
              ref={flipBook}
              width={300}
              height={useIsMobile() ? 420 : 360}
              maxWidth={450}
              size={useIsMobile() ? "fixed" : "stretch"}
              mobileScrollSupport={true}
              maxShadowOpacity={0.5}
              showCover={true}
              animationDuration={500}
              perspective={1000}
              maxAngle={10}
              flipOnTouchZone={10}
              clickEventForward={false}
              disableFlipByClick={true}
              onFlip={(e) => {
                setPage(e.data);
              }}
            >
              <AlbumCover number={1} name={"Cover"} />
              <QatarLeft
                number={2}
                name={"Qatar"}
                user_cromos={data}
                alertSms={alertSms}
              />
              <QatarRight
                number={3}
                name={"Qatar"}
                user_cromos={data}
                alertSms={alertSms}
              />
              <EcuadorLeft number={4} name={"Ecuador"} />
              <EcuadorRight number={5} name={"Ecuador"} />
              <SenegalLeft number={6} name={"Senegal"} />
              <SenegalRight number={7} name={"Senegal"} />
              <NetherlandsLeft number={8} name={"Países bajos"} />
              <NetherlandsRight number={9} name={"Países bajos"} />
              <InglaterraLeft number={10} name={"Inglaterra"} />
              <InglaterraRight number={11} name={"Inglaterra"} />
              <IranLeft number={12} name={"Irán"} />
              <IranRight number={13} name={"Irán"} />
              <UsaLeft number={14} name={"Estados Unidos"} />
              <UsaRight number={15} name={"Estados Unidos"} />
              <GalesLeft number={16} name={"Gales"} />
              <GalesRight number={17} name={"Gales"} />
              <ArgentinaLeft number={18} name={"Argentina"} />
              <ArgentinaRight number={19} name={"Argentina"} />
              <ArabiaSauditaLeft number={20} name={"Arabia Saudita"} />
              <ArabiaSauditaRight number={21} name={"Arabia Saudita"} />
              <MexicoLeft number={22} name={"México"} />
              <MexicoRight number={23} name={"México"} />
              <PoloniaLeft number={24} name={"Polonia"} />
              <PoloniaRight number={25} name={"Polonia"} />
              <FranciaLeft number={26} name={"Francia"} />
              <FranciaRight number={27} name={"Francia"} />
              <AustraliaLeft number={28} name={"Australia"} />
              <AustraliaRight number={29} name={"Australia"} />
              <DinamarcaLeft number={30} name={"Dinamarca"} />
              <DinamarcaRight number={31} name={"Dinamarca"} />
              <TunezLeft number={32} name={"Túnez"} />
              <TunezRight number={33} name={"Túnez"} />
              <SpainLeft number={34} name={"España"} />
              <SpainRight number={35} name={"España"} />
              <CostaRicaLeft number={36} name={"Costa Rica"} />
              <CostaRicaRight number={37} name={"Costa Rica"} />
              <AlemaniaLeft number={38} name={"Alemania"} />
              <AlemaniaRight number={39} name={"Alemania"} />
              <JaponLeft number={40} name={"Japón"} />
              <JaponRight number={41} name={"Japón"} />
              <BelgicaLeft number={42} name={"Bélgica"} />
              <BelgicaRight number={43} name={"Bélgica"} />
              <CanadaLeft number={44} name={"Canada"} />
              <CanadaRight number={45} name={"Canada"} />
              <MarruecosLeft number={46} name={"Marruecos"} />
              <MarruecosRight number={47} name={"Marruecos"} />
              <CroaciaLeft number={48} name={"Croacia"} />
              <CroaciaRight number={49} name={"Croacia"} />
              <BrasilLeft number={50} name={"Brasil"} />
              <BrasilRight number={51} name={"Brasil"} />
              <SerbiaLeft number={52} name={"Serbia"} />
              <SerbiaRight number={53} name={"Serbia"} />
              <SuizaLeft number={54} name={"Suiza"} />
              <SuizaRight number={55} name={"Suiza"} />
              <CamerunLeft number={56} name={"Camerún"} />
              <CamerunRight number={57} name={"Camerún"} />
              <PortugalLeft number={58} name={"Portugal"} />
              <PortugalRight number={59} name={"Portugal"} />
              <GhanaLeft number={60} name={"Ghana"} />
              <GhanaRight number={61} name={"Ghana"} />
              <UruguayLeft number={62} name={"Uruguay"} />
              <UruguayRight number={63} name={"Uruguay"} />
              <KoreaLeft number={64} name={"República de Korea"} />
              <KoreaRight number={65} name={"República de Korea"} />
              <AlbumClosing number={66} name={"FIN"} />
            </HTMLFlipBook>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              position: "relative",
              alignItems: "center",
              margin: "auto",
              justifyContent: "center",
              color: "white",
            }}
          >
            <IconButton onClick={handleClickPrev} sx={{ color: "inherit" }}>
              <NavigateBeforeOutlinedIcon />
            </IconButton>
            <Typography
              sx={{
                display: "block",
                width: "100px",
                textAlign: "center",
                fontSize: "1rem",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {flipBook?.current?.pageFlip()?.setting?.children[page]?.props
                ?.name
                ? flipBook?.current?.pageFlip()?.setting?.children[page]?.props
                    ?.name
                : "Cover"}
            </Typography>
            <IconButton onClick={handleClickNext} sx={{ color: "inherit" }}>
              <NavigateNextOutlinedIcon />
            </IconButton>

            {flipBook?.current?.pageFlip()?.setting?.children.length > 0 ? (
              <>
                <FormControl>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ color: "inherit" }}
                  >
                    Ir a
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={select}
                    label="Ir a"
                    onChange={handlePushPage}
                    size="small"
                    sx={{ color: "inherit" }}
                  >
                    <MenuItem value={null}>None</MenuItem>
                    {flipBook?.current
                      ?.pageFlip()
                      ?.setting?.children.map((child, index) => (
                        <MenuItem key={index} value={index}>
                          <small>
                            {child.props?.name} {index}
                          </small>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </>
            ) : (
              <Button variant="outlined" size="small" onClick={handleSetBook}>
                Ir a
              </Button>
            )}
          </Box>
        </DialogActions>
      </>
    </Dialog>
  );
}
