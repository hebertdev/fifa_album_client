import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { francia as francia_cromos } from "utils/cromos/francia_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import francia_wallpaper_right from "assets/album/francia_right.png";
import francia_wallpaper_left from "assets/album/francia_left.png";
import francia_flag from "assets/album/countries/FRA.png";

export const FranciaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Francia"}
        flag={francia_flag.src}
        wallpaper={francia_wallpaper_right.src}
        team_name={"Federación Francesa de Fútbol"}
        default_cromos={francia_cromos}
      />
    </div>
  );
});

export const FranciaRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "D";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Francia"}
        wallpaper={francia_wallpaper_left.src}
        default_cromos={francia_cromos}
      />
    </div>
  );
});

FranciaLeft.displayName = "FranciaLeft";
FranciaRight.displayName = "FranciaRight";
