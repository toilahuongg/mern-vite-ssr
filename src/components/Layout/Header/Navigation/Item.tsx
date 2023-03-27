import { TMenuItem } from '@src/types/common';
import { Link, useMatch } from 'react-router-dom';

type TProps = {
  item: TMenuItem;
};
const NavItem: React.FC<TProps> = ({ item: { url, urlMatch, label } }) => {
  const match = useMatch(urlMatch);
  return (
    <li
      data-active={match}
      className="text-gray cursor-pointer hover:text-white data-[active=true]:text-white data-[active=true]:font-medium"
    >
      <Link to={url}>
        <span className="text-primary">#</span>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
