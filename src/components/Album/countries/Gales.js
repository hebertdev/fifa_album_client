import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { gales as gales_cromos } from "utils/cromos/gales_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import gales_Wallpaper_right from "assets/album/iran_right.png";
import gales_wallpaper_left from "assets/album/iran_left.png";
import qatar_flag from "assets/album/countries/WAL.png";

export const GalesLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Gales"}
        flag={qatar_flag.src}
        wallpaper={gales_Wallpaper_right.src}
        team_name={"Asociación de Fútbol de Gales"}
        default_cromos={gales_cromos}
      />
    </div>
  );
});

export const GalesRight = forwardRef((props, ref) => {
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
        country_name={"Gales"}
        wallpaper={gales_wallpaper_left.src}
        default_cromos={gales_cromos}
      />
    </div>
  );
});

GalesLeft.displayName = "GalesLeft";
GalesRight.displayName = "GalesRight";
