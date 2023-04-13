import { Outlet } from 'react-router-dom';
import Header from 'client/components/Layout/Header';
import Footer from 'client/components/Layout/Footer';

const Root = () => {
  return (
    <>
      <Header />
      <div id="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Root;
