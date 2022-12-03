import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { argentina as argentina_cromos } from "utils/cromos/argentina_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import argentina_wallpaper_right from "assets/album/argentina_right.png";
import argentina_wallpaper_left from "assets/album/argentina_right.png";
import argentina_flag from "assets/album/countries/ARG.png";

export const ArgentinaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Argentina"}
        flag={argentina_flag.src}
        wallpaper={argentina_wallpaper_right.src}
        team_name={"Asociación del Fútbol Argentino"}
        default_cromos={argentina_cromos}
      />
    </div>
  );
});

export const ArgentinaRight = forwardRef((props, ref) => {
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
        country_name={"Argentina"}
        wallpaper={argentina_wallpaper_left.src}
        default_cromos={argentina_cromos}
      />
    </div>
  );
});

ArgentinaLeft.displayName = "ArgentinaLeft";
ArgentinaRight.displayName = "ArgentinaRight";
