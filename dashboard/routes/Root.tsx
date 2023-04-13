import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <header />
      <div id="main">
        <Outlet />
      </div>
      <footer />
    </>
  );
};
export default Root;
