import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { costa_rica as costa_rica_cromos } from "utils/cromos/costa_rica_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import costarica_wallpaper_right from "assets/album/netherlands-right.webp";
import costarica_wallpaper_left from "assets/album/netherlands-left.webp";
import qatar_flag from "assets/album/countries/CRI.png";

export const CostaRicaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Costa Rica"}
        color="orange"
        flag={qatar_flag.src}
        wallpaper={costarica_wallpaper_right.src}
        team_name={"Federación Costarricense de Fútbol"}
        default_cromos={costa_rica_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const CostaRicaRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "E";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Costa Rica"}
        color="orange"
        wallpaper={costarica_wallpaper_left.src}
        default_cromos={costa_rica_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

CostaRicaLeft.displayName = "CostaRicaLeft";
CostaRicaRight.displayName = "CostaRicaRight";
