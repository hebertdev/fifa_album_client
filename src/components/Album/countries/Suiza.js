import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { suiza as suiza_cromos } from "utils/cromos/suiza_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import suiza_wallpaper_right from "assets/album/polonia_right.png";
import suiza_wallpaper_left from "assets/album/polonia_left.png";
import suiza_flag from "assets/album/countries/CHE.png";

export const SuizaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"suiza"}
        flag={suiza_flag.src}
        wallpaper={suiza_wallpaper_right.src}
        team_name={"Asociación Suiza de Fútbol"}
        default_cromos={suiza_cromos}
      />
    </div>
  );
});

export const SuizaRight = forwardRef((props, ref) => {
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
        country_name={"Suiza"}
        wallpaper={suiza_wallpaper_left.src}
        default_cromos={suiza_cromos}
      />
    </div>
  );
});

SuizaLeft.displayName = "SuizaLeft";
SuizaRight.displayName = "SuizaRight";
