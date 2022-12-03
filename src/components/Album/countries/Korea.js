import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { korea as korea_cromos } from "utils/cromos/korea_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import korean_wallpaper_right from "assets/album/francia_right.png";
import korean_wallpaper_left from "assets/album/francia_left.png";
import korea_flag from "assets/album/countries/KOREA.png";

export const KoreaLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"La República de Corea"}
        flag={korea_flag.src}
        wallpaper={korean_wallpaper_right.src}
        team_name={"Asociación de Fútbol de Corea del Sur"}
        default_cromos={korea_cromos}
      />
    </div>
  );
});

export const KoreaRight = forwardRef((props, ref) => {
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
        country_name={"La República de Corea"}
        wallpaper={korean_wallpaper_left.src}
        default_cromos={korea_cromos}
      />
    </div>
  );
});

KoreaLeft.displayName = "KoreaLeft";
KoreaRight.displayName = "KoreaRight";
