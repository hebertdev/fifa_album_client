import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { uruguay as uruguay_cromos } from "utils/cromos/uruguay_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import uruguay_wallpaper_right from "assets/album/argentina_right.png";
import uruguay_wallpaper_left from "assets/album/argentina_left.png";
import uruguay_flag from "assets/album/countries/URY.png";

export const UruguayLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"uruguay"}
        flag={uruguay_flag.src}
        wallpaper={uruguay_wallpaper_right.src}
        team_name={"Asociación Uruguaya de Fútbol"}
        default_cromos={uruguay_cromos}
      />
    </div>
  );
});

export const UruguayRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "H";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"uruguay"}
        wallpaper={uruguay_wallpaper_left.src}
        default_cromos={uruguay_cromos}
      />
    </div>
  );
});

UruguayLeft.displayName = "UruguayLeft";
UruguayRight.displayName = "UruguayRight";
