import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { mexico as mexico_cromos } from "utils/cromos/mexico_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import mexico_wallpaper_right from "assets/album/mexico_right.png";
import mexico_wallpaper_left from "assets/album/mexico_left.png";
import mexico_flag from "assets/album/countries/MEX.png";

export const MexicoLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"México"}
        flag={mexico_flag.src}
        wallpaper={mexico_wallpaper_right.src}
        team_name={"Federación Mexicana de Fútbol"}
        default_cromos={mexico_cromos}
      />
    </div>
  );
});

export const MexicoRight = forwardRef((props, ref) => {
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
        country_name={"México"}
        wallpaper={mexico_wallpaper_left.src}
        default_cromos={mexico_cromos}
      />
    </div>
  );
});

MexicoLeft.displayName = "MexicoLeft";
MexicoRight.displayName = "MexicoRight";
