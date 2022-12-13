import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { canada as canada_cromos } from "utils/cromos/canada_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import canada_wallpaper_right from "assets/album/dinamarca-right.webp";
import canada_wallpaper_left from "assets/album/dinamarca-left.webp";
import canada_flag from "assets/album/countries/CAN.png";

export const CanadaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Canadá"}
        color="#a32b2e"
        flag={canada_flag.src}
        wallpaper={canada_wallpaper_right.src}
        team_name={"Asociación Canadiense de Fútbol"}
        default_cromos={canada_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const CanadaRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "F";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Canadá"}
        color="#a32b2e"
        wallpaper={canada_wallpaper_left.src}
        default_cromos={canada_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

CanadaLeft.displayName = "CanadaLeft";
CanadaRight.displayName = "CanadaRight";
