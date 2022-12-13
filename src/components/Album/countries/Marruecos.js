import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { marruecos as marruecos_cromos } from "utils/cromos/marruecos_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import marruecos_wallpaper_right from "assets/album/netherlands-right.webp";
import marruecos_wallpaper_left from "assets/album/netherlands-left.webp";
import marruecos_flag from "assets/album/countries/MAR.png";

export const MarruecosLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Marruecos"}
        color="orange"
        flag={marruecos_flag.src}
        wallpaper={marruecos_wallpaper_right.src}
        team_name={"Real Federación de Fútbol de Marruecos"}
        default_cromos={marruecos_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const MarruecosRight = forwardRef((props, ref) => {
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
        country_name={"Marruecos"}
        color="orange"
        wallpaper={marruecos_wallpaper_left.src}
        default_cromos={marruecos_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

MarruecosLeft.displayName = "MarruecosLeft";
MarruecosRight.displayName = "MarruecosRight";
