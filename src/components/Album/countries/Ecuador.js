import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//utils
import { ecuador as ecuador_cromos } from "utils/cromos/ecuador_cromos";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import ecuador_wallpaper_right from "assets/album/ecuador_right.png";
import eucador_wallpaper_left from "assets/album/ecuador_left.png";
import ecuador_flag from "assets/album/countries/ECU.png";

export const EcuadorLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Ecuador"}
        flag={ecuador_flag.src}
        wallpaper={ecuador_wallpaper_right.src}
        team_name={"Federación Ecuatoriana de Fútbol"}
        default_cromos={ecuador_cromos}
      />
    </div>
  );
});

export const EcuadorRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "A";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Ecuador"}
        wallpaper={eucador_wallpaper_left.src}
        default_cromos={ecuador_cromos}
      />
    </div>
  );
});

EcuadorLeft.displayName = "EcuadorLeft";
EcuadorRight.displayName = "EcuadorRight";
