import { GithubIcon, InstagramIcon, LinkedIn } from '@src/svgs';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <section className="sticky w-full p-3 bg-background backdrop-blur-sm header">
      <div className="container mx-auto flex justify-between">
        <h2 className="text-white text-2xl font-bold">
          <Link to="/">Hugon.</Link>
        </h2>
        <ul className="flex gap-10">
          <li
            data-active="true"
            className="text-gray cursor-pointer hover:text-while data-[active=true]:text-while data-[active=true]:font-medium"
          >
            <span className="text-primary">#</span>
            home
          </li>
          <li className="text-gray cursor-pointer hover:text-while data-[active=true]:text-while data-[active=true]:font-medium">
            <span className="text-primary">#</span>
            about-me
          </li>
          <li className="text-gray cursor-pointer hover:text-while data-[active=true]:text-while data-[active=true]:font-medium">
            <span className="text-primary">#</span>
            projects
          </li>
          <li className="text-gray cursor-pointer hover:text-while data-[active=true]:text-while data-[active=true]:font-medium">
            <span className="text-primary">#</span>
            contacts
          </li>
        </ul>
      </div>
      <div className="fixed flex flex-col gap-2 items-center header-social">
        <div className="header-social__line bg-gray" />
        <div className="header-social__icon flex justify-center items-center">
          <GithubIcon className="fill-gray hover:fill-white cursor-pointer" />
        </div>
        <div className="header-social__icon flex justify-center items-center">
          <InstagramIcon className="fill-gray hover:fill-white cursor-pointer" />
        </div>
        <div className="header-social__icon flex justify-center items-center">
          <LinkedIn className="fill-gray hover:fill-white cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default Header;
