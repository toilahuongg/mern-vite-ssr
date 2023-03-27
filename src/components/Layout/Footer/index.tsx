import Button from '../Button';
import ListSocial from '../Socials';

const Footer = () => {
  return (
    <div className="border-gray border-t border-solid">
      <div className="container mx-auto my-8">
        <div className="flex justify-between">
          <div>
            <h4 className="text-white font-bold">Hugon.</h4>
            <p className="text-white mt-4">Backend developer and Front-end developer</p>
          </div>
          <div>
            <h4 className="text-white text-2xl font-medium">Social</h4>
            <div className="flex gap-2 mt-4">
              <ListSocial />
            </div>
          </div>
        </div>
        <div className="mt-8 text-gray text-center"> © Copyright 2022. Made by Hugon </div>
      </div>
    </div>
  );
};

export default Footer;
