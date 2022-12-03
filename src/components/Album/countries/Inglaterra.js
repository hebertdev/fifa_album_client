import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//utils
import { inglaterra as inglaterra_cromos } from "utils/cromos/inglaterra_cromos";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import inglaterra_wallpaper_right from "assets/album/inglaterra_right.png";
import inglaterra_wallpaper_left from "assets/album/inglaterra_left.png";
import inglaterra_flag from "assets/album/countries/ING.png";

export const InglaterraLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Inglaterra"}
        flag={inglaterra_flag.src}
        wallpaper={inglaterra_wallpaper_right.src}
        team_name={"La Asociación del Fútbol"}
        default_cromos={inglaterra_cromos}
      />
    </div>
  );
});

export const InglaterraRight = forwardRef((props, ref) => {
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
        country_name={"Inglaterra"}
        wallpaper={inglaterra_wallpaper_left.src}
        default_cromos={inglaterra_cromos}
      />
    </div>
  );
});

InglaterraLeft.displayName = "InglaterraLeft";
InglaterraRight.displayName = "InglaterraRight";
