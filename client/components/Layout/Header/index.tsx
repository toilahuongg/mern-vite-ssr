import Link from 'next/link';
import Navigation from './Navigation';
import ListSocial from '../Socials';

const Header = () => {
  return (
    <section className="sticky top-0 w-full p-3 backdrop-blur-sm header">
      <div className="container mx-auto flex justify-between">
        <h2 className="text-white text-2xl font-bold">
          <Link href="/">Hugon.</Link>
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
