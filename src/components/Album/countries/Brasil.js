import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { brasil as brasil_cromos } from "utils/cromos/brasil_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import brasil_wallpaper_right from "assets/album/iran-right.webp";
import brasil_wallpaper_left from "assets/album/iran-left.webp";
import brasil_flag from "assets/album/countries/BRA.png";

export const BrasilLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"brasil"}
        color="#6bbb76"
        flag={brasil_flag.src}
        wallpaper={brasil_wallpaper_right.src}
        team_name={"Confederación Brasileña de Fútbol"}
        default_cromos={brasil_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const BrasilRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "G";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Brasil"}
        color="#6bbb76"
        wallpaper={brasil_wallpaper_left.src}
        default_cromos={brasil_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

BrasilLeft.displayName = "BrasilLeft";
BrasilRight.displayName = "BrasilRight";
