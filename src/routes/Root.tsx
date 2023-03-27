import { Outlet } from 'react-router-dom';
import Header from '@src/components/Layout/Header';
import Footer from '@src/components/Layout/Footer';

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
