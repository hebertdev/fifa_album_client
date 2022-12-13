import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { polonia as polonia_cromos } from "utils/cromos/polonia_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import polonia_wallpaper_right from "assets/album/polonia-right.webp";
import polonia_wallpaper_left from "assets/album/polonia-left.webp";
import polonia_flag from "assets/album/countries/POL.png";

export const PoloniaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Polonia"}
        color="#bc2921"
        flag={polonia_flag.src}
        wallpaper={polonia_wallpaper_right.src}
        team_name={"Asociación Polaca de Fútbol "}
        default_cromos={polonia_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const PoloniaRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "C";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"polonia"}
        color="#bc2921"
        wallpaper={polonia_wallpaper_left.src}
        default_cromos={polonia_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

PoloniaLeft.displayName = "PoloniaLeft";
PoloniaRight.displayName = "PoloniaRight";
