import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import AdminRoot from '@admin/Root';
import ClientRoot from '@client/Root';
import '@admin/styles/admin.scss';
import '@client/styles/app.scss';

export default function App(props: AppProps) {
  const router = useRouter();
  if (router.pathname.startsWith('/admin')) {
    return AdminRoot(props);
  }
  return ClientRoot(props);
}
