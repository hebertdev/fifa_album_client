import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";
import { camerun as camerun_cromos } from "utils/cromos/camerun_cromos";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//Material UI
import { Box, Grid, CardActionArea, Dialog } from "@mui/material";

//assets
import camerun_wallpaper_right from "assets/album/senegal-right.webp";
import camerun_wallpaper_left from "assets/album/senegal-left.webp";
import camerun_flag from "assets/album/countries/CMR.png";

export const CamerunLeft = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Camerún"}
        color="#6bbb76"
        flag={camerun_flag.src}
        wallpaper={camerun_wallpaper_right.src}
        team_name={"Federación Camerunesa de Fútbol"}
        default_cromos={camerun_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const CamerunRight = forwardRef((props, ref) => {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    //FILTER GROUP A
    const group_a = group_of_countries.filter((country) => {
      return country.group === "G";
    });
    setGroup(group_a[0]);
  }, []);

  return (
    <div ref={ref}>
      <SheetRight
        group={group}
        country_name={"Camerún"}
        color="#6bbb76"
        wallpaper={camerun_wallpaper_left.src}
        default_cromos={camerun_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

CamerunLeft.displayName = "CamerunLeft";
CamerunRight.displayName = "CamerunRight";
