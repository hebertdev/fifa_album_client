import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//utils
import { usa as usa_cromos } from "utils/cromos/usa_cromos";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import usa_wallpaper_right from "assets/album/inglaterra-right.webp";
import usa_wallpaper_left from "assets/album/inglaterra-left.webp";
import usa_flag from "assets/album/countries/USA.png";

export const UsaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Estados Unidos"}
        color="#e0dedc"
        flag={usa_flag.src}
        wallpaper={usa_wallpaper_right.src}
        team_name={"Federación de Fútbol de los Estados Unidos"}
        default_cromos={usa_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const UsaRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "B";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Estados Unidos"}
        color="#e0dedc"
        wallpaper={usa_wallpaper_left.src}
        default_cromos={usa_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

UsaLeft.displayName = "UsaLeft";
UsaRight.displayName = "UsaRight";
