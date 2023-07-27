// ./pages/_app.tsx
import "normalize.css"; // or import the CSS reset package you prefer
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <Component {...pageProps}/>
  );
};

export default MyApp;
