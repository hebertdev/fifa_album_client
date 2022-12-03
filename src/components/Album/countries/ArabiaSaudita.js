import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { arabia_saudita as arabia_saudita_cromos } from "utils/cromos/arabia_saudita_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import arabia_wallpaper_right from "assets/album/arabia_saudi_right.png";
import arabia_wallpaper_left from "assets/album/arabia_saudi_left.png";
import arabia_saudita_flag from "assets/album/countries/SAU.png";

export const ArabiaSauditaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Arabia Saudita"}
        flag={arabia_saudita_flag.src}
        wallpaper={arabia_wallpaper_right.src}
        team_name={"Federación de Fútbol de Arabia Saudita"}
        default_cromos={arabia_saudita_cromos}
      />
    </div>
  );
});

export const ArabiaSauditaRight = forwardRef((props, ref) => {
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
        country_name={"Arabia Saudita"}
        wallpaper={arabia_wallpaper_left.src}
        default_cromos={arabia_saudita_cromos}
      />
    </div>
  );
});

ArabiaSauditaLeft.displayName = "ArabiaSauditaLeft";
ArabiaSauditaRight.displayName = "ArabiaSauditaRight";
