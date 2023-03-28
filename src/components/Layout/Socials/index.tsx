import { LIST_SOCIAL } from '@src/constants/common';
import { Link } from 'react-router-dom';

const ListSocial = () => {
  return (
    <>
      {LIST_SOCIAL.map(({ id, Icon, link }) => (
        <div key={id} className="header-social__icon flex-center">
          <Link to={link}>
            <Icon className="fill-gray hover:fill-white cursor-pointer" />
          </Link>
        </div>
      ))}
    </>
  );
};

export default ListSocial;
