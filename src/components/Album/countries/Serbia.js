import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { serbia as serbia_cromos } from "utils/cromos/serbia_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import serbia_wallpaper_right from "assets/album/dinamarca_right.png";
import serbia_wallpaper_left from "assets/album/dinamarca_left.png";
import serbia_flag from "assets/album/countries/SRB.png";

export const SerbiaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Serbia"}
        flag={serbia_flag.src}
        wallpaper={serbia_wallpaper_right.src}
        team_name={"Asociación de Fútbol de Serbia"}
        default_cromos={serbia_cromos}
      />
    </div>
  );
});

export const SerbiaRight = forwardRef((props, ref) => {
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
        country_name={"Serbia"}
        wallpaper={serbia_wallpaper_left.src}
        default_cromos={serbia_cromos}
      />
    </div>
  );
});

SerbiaLeft.displayName = "SerbiaLeft";
SerbiaRight.displayName = "SerbiaRight";
