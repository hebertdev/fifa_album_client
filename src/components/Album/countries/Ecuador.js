import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//utils
import { ecuador as ecuador_cromos } from "utils/cromos/ecuador_cromos";

//assets
import ecuador_wallpaper_right from "assets/album/ecuador-right.webp";
import eucador_wallpaper_left from "assets/album/ecuador-left.webp";
import ecuador_flag from "assets/album/countries/ECU.png";

export const EcuadorLeft = forwardRef((props, ref) => {
  //console.log(user_cromos[0].sticker_variant.sticker.unique_code);
  return (
    <div ref={ref}>
      <SheetLeft
        country_name={"Ecuador"}
        flag={ecuador_flag.src}
        wallpaper={ecuador_wallpaper_right.src}
        color="#d3c042"
        team_name={"Federación Ecuatoriana de Fútbol"}
        default_cromos={ecuador_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const EcuadorRight = forwardRef((props, ref) => {
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
        country_name={"Ecuador"}
        color="#d3c042"
        wallpaper={eucador_wallpaper_left.src}
        default_cromos={ecuador_cromos}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

EcuadorLeft.displayName = "EcuadorLeft";
EcuadorRight.displayName = "EcuadorRight";
