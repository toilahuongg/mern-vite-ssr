import { NAVIGATE_MENU } from 'client/constants/common';
import NavItem from './Item';

const Navigation = () => {
  return (
    <ul className="flex gap-10">
      {NAVIGATE_MENU.map((item) => (
        <NavItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Navigation;
