//components
import Header from "components/Header/index.js";

//nextui

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
