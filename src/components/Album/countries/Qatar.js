import { useState, useEffect, forwardRef } from "react";

//utils
import group_of_countries from "utils/group_of_countries";

//Componentes
import { SheetLeft, SheetRight } from "../Sheets";

//utils
import { qatar as qatar_cromos } from "utils/cromos/qatar_cromos";

//assets
import qatar_fondo_right from "assets/album/qatar-right.webp";
import qatar_fondo_left from "assets/album/qatar-left.webp";
import qatar_flag from "assets/album/countries/QAT.png";

export const QatarLeft = forwardRef((props, ref) => {
  //console.log(user_cromos[0].sticker_variant.sticker.unique_code);
  return (
    <div ref={ref}>
      <SheetLeft
        default_cromos={qatar_cromos}
        country_name={"qatar"}
        flag={qatar_flag.src}
        color={"#90213a"}
        wallpaper={qatar_fondo_right.src}
        team_name={"Asociación de Fútbol de Catar"}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

export const QatarRight = forwardRef((props, ref) => {
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
        default_cromos={qatar_cromos}
        group={group}
        country_name={"qatar"}
        color={"#90213a"}
        wallpaper={qatar_fondo_left.src}
        user_cromos={props.user_cromos}
      />
    </div>
  );
});

QatarLeft.displayName = "QatarLeft";
QatarRight.displayName = "QatarRight";
