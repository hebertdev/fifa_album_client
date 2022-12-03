import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { ghana as ghana_cromos } from "utils/cromos/ghana_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import ghana_wallpaper_right from "assets/album/inglaterra_right.png";
import ghana_wallpaper_left from "assets/album/inglaterra_left.png";
import ghana_flag from "assets/album/countries/GHA.png";

export const GhanaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"ghana"}
        flag={ghana_flag.src}
        wallpaper={ghana_wallpaper_right.src}
        team_name={"Asociación de Fútbol de Ghana"}
        default_cromos={ghana_cromos}
      />
    </div>
  );
});

export const GhanaRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "H";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"ghana"}
        wallpaper={ghana_wallpaper_left.src}
        default_cromos={ghana_cromos}
      />
    </div>
  );
});

GhanaLeft.displayName = "GhanaLeft";
GhanaRight.displayName = "GhanaRight";
