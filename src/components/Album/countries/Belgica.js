import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { belgica as belgica_cromos } from "utils/cromos/belgica_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import belgica_wallpaper_right from "assets/album/polonia-right.webp";
import belgica_wallpaper_left from "assets/album/polonia-left.webp";
import belgica_flag from "assets/album/countries/BEL.png";

export const BelgicaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Bélgica"}
        color="red"
        flag={belgica_flag.src}
        wallpaper={belgica_wallpaper_right.src}
        team_name={"Real Asociación Belga de Fútbol"}
        default_cromos={belgica_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const BelgicaRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "F";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Bélgica"}
        color="red"
        wallpaper={belgica_wallpaper_left.src}
        default_cromos={belgica_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

BelgicaLeft.displayName = "BelgicaLeft";
BelgicaRight.displayName = "BelgicaRight";
