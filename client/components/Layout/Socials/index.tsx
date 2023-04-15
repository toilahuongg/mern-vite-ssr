import { LIST_SOCIAL } from '@client/constants/common';
import Link from 'next/link';

const ListSocial = () => {
  return (
    <>
      {LIST_SOCIAL.map(({ id, Icon, link }) => (
        <div key={id} className="header-social__icon flex-center">
          <Link href={link}>
            <Icon className="fill-gray hover:fill-white cursor-pointer" />
          </Link>
        </div>
      ))}
    </>
  );
};

export default ListSocial;
