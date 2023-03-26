import { Outlet } from 'react-router-dom';
import Header from '@src/components/Header';

const Root = () => {
  return (
    <>
      <Header />
      <div id="main">
        <Outlet />
      </div>
      <div>Footer</div>
    </>
  );
};
export default Root;
