import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { alemania as alemania_cromos } from "utils/cromos/alemania_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import alemania_wallpaper_right from "assets/album/alemania-right.webp";
import alemania_wallpaper_left from "assets/album/alemania-left.webp";
import alemania_flag from "assets/album/countries/DEU.png";

export const AlemaniaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Alemania"}
        color="#050505"
        flag={alemania_flag.src}
        wallpaper={alemania_wallpaper_right.src}
        team_name={"Federación Alemana de Fútbol"}
        default_cromos={alemania_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const AlemaniaRight = forwardRef((props, ref) => {
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
        country_name={"Alemania"}
        color="#050505"
        wallpaper={alemania_wallpaper_left.src}
        default_cromos={alemania_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

AlemaniaLeft.displayName = "AlemaniaLeft";
AlemaniaRight.displayName = "AlemaniaRight";
