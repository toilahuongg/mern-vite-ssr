import { Link } from 'react-router-dom';
import ListSocial from '../Socials';
import Navigation from './Navigation';
const Header = () => {
  return (
    <section className="sticky w-full p-3 bg-background backdrop-blur-sm header">
      <div className="container mx-auto flex justify-between">
        <h2 className="text-white text-2xl font-bold">
          <Link to="/">Hugon.</Link>
        </h2>
        <Navigation />
      </div>
      <div className="fixed flex flex-col gap-2 items-center header-social">
        <div className="header-social__line bg-gray" />
        <ListSocial />
      </div>
    </section>
  );
};

export default Header;
