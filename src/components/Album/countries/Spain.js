import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { spain as spain_cromos } from "utils/cromos/spain_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import spain_wallpaper_right from "assets/album/dinamarca-right.webp";
import spain_wallpaper_left from "assets/album/dinamarca-left.webp";
import spain_flag from "assets/album/countries/ESP.png";

export const SpainLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"España"}
        color="#a32b2e"
        flag={spain_flag.src}
        wallpaper={spain_wallpaper_right.src}
        team_name={"Real Federación Española de Fútbol"}
        default_cromos={spain_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const SpainRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "E";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"España"}
        color="#a32b2e"
        wallpaper={spain_wallpaper_left.src}
        default_cromos={spain_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

SpainLeft.displayName = "SpainLeft";
SpainRight.displayName = "SpainRight";
