import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({ children, navbarTheme }) {
  return (
    <>
      <Navbar variant={navbarTheme} />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
