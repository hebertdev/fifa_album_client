import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//utils
import { senegal as senegal_cromos } from "utils/cromos/senegal_cromos";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import senegal_wallpaper_right from "assets/album/senegal_right.png";
import senegal_wallpaper_left from "assets/album/senegal_left.png";
import senegal_flag from "assets/album/countries/SEN.png";

export const SenegalLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Senegal"}
        flag={senegal_flag.src}
        wallpaper={senegal_wallpaper_right.src}
        team_name={"Federación Senegalesa de Fútbol"}
        default_cromos={senegal_cromos}
      />
    </div>
  );
});

export const SenegalRight = forwardRef((props, ref) => {
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
        country_name={"Senegal"}
        wallpaper={senegal_wallpaper_left.src}
        default_cromos={senegal_cromos}
      />
    </div>
  );
});

SenegalLeft.displayName = "SenegalLeft";
SenegalRight.displayName = "SenegalRight";
