import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { australia as australia_cromos } from "utils/cromos/australia_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import australia_wallpaper_right from "assets/album/australia_right.png";
import australia_wallpaper_left from "assets/album/australia_left.png";
import australia_flag from "assets/album/countries/AUS.png";

export const AustraliaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Australia"}
        flag={australia_flag.src}
        wallpaper={australia_wallpaper_right.src}
        team_name={"Federación de Fútbol de Australia"}
        default_cromos={australia_cromos}
      />
    </div>
  );
});

export const AustraliaRight = forwardRef((props, ref) => {
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
        country_name={"Australia"}
        wallpaper={australia_wallpaper_left.src}
        default_cromos={australia_cromos}
      />
    </div>
  );
});

AustraliaLeft.displayName = "AustraliaLeft";
AustraliaRight.displayName = "AustraliaRight";
