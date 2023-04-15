import { TMenuItem } from '@client/types/common';
import Link from 'next/link';
import { useRouter } from 'next/router';

type TProps = {
  item: TMenuItem;
};
const NavItem: React.FC<TProps> = ({ item: { url, urlMatch, label } }) => {
  const router = useRouter();
  const match = router.asPath === urlMatch;
  return (
    <li data-active={match} className="nav-item">
      <Link href={url}>
        <span className="text-primary">#</span>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
