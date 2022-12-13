import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { croacia as croacia_cromos } from "utils/cromos/croacia_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import croacia_wallpaper_right from "assets/album/dinamarca-right.webp";
import croacia_wallpaper_left from "assets/album/dinamarca-left.webp";
import croacia_flag from "assets/album/countries/HRV.png";

export const CroaciaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Croacia"}
        color="#a32b2e"
        flag={croacia_flag.src}
        wallpaper={croacia_wallpaper_right.src}
        team_name={"Federación Croata de Fútbol"}
        default_cromos={croacia_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const CroaciaRight = forwardRef((props, ref) => {
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
        country_name={"Croacia"}
        color="#a32b2e"
        wallpaper={croacia_wallpaper_left.src}
        default_cromos={croacia_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

CroaciaLeft.displayName = "CroaciaLeft";
CroaciaRight.displayName = "CroaciaRight";
