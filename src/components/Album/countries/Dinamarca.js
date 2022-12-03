import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { dinamarca as dinamarca_cromos } from "utils/cromos/dinamarca_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import dinamarca_wallpaper_right from "assets/album/dinamarca_right.png";
import dinamarca_wallpaper_left from "assets/album/dinamarca_left.png";
import dinamarca_flag from "assets/album/countries/DNK.png";

export const DinamarcaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Dinamarca"}
        flag={dinamarca_flag.src}
        wallpaper={dinamarca_wallpaper_right.src}
        team_name={"Unión Danesa de Fútbol"}
        default_cromos={dinamarca_cromos}
      />
    </div>
  );
});

export const DinamarcaRight = forwardRef((props, ref) => {
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
        country_name={"Dinamarca"}
        wallpaper={dinamarca_wallpaper_left.src}
        default_cromos={dinamarca_cromos}
      />
    </div>
  );
});

DinamarcaLeft.displayName = "DinamarcaLeft";
DinamarcaRight.displayName = "DinamarcaRight";
