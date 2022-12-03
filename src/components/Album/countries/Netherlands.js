import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//utils
import { netherlands as netherlands_cromos } from "utils/cromos/netherlands_cromos";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import netherlands_wallpaper_right from "assets/album/netherlands_right.png";
import netherlands_wallpaper_left from "assets/album/netherlands_left.png";
import netherlands_flag from "assets/album/countries/NLD.png";

export const NetherlandsLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Países Bajos"}
        flag={netherlands_flag.src}
        wallpaper={netherlands_wallpaper_right.src}
        team_name={"Real Asociación Neerlandesa de Fútbol"}
        default_cromos={netherlands_cromos}
      />
    </div>
  );
});

export const NetherlandsRight = forwardRef((props, ref) => {
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
        country_name={"Países Bajos"}
        wallpaper={netherlands_wallpaper_left.src}
        default_cromos={netherlands_cromos}
      />
    </div>
  );
});

NetherlandsLeft.displayName = "NetherlandsLeft";
NetherlandsRight.displayName = "NetherlandsRight";
