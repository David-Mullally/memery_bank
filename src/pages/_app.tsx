// ./pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import styles from '../styles/OffCanvasNavbar.module.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
