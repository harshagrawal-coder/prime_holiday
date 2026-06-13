import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import useScrollToTop from "../hooks/useScrollToTop";

const MainLayout = ({ children }) => {
  useScrollToTop();

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
