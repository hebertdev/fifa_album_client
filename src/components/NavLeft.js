import React from "react";
//import { NavLink } from "react-router-dom";

import { NavLink } from "components/Next/NavLink";

export default function NavLeft() {
  return (
    <>
      <ul className="container__nav_edit">
        <li>
          <NavLink href="/accounts/edit" exact addedclass={"navLinkactive"}>
            Editar perfil
          </NavLink>
        </li>
        <li>
          <NavLink
            href="/accounts/changepassword"
            exact
            addedclass={"navLinkactive"}
          >
            Cambiar contraseña
          </NavLink>
        </li>
      </ul>
    </>
  );
}
