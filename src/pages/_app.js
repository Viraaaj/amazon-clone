import { Provider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";
import { store } from "../app/store";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;

// Giving entire application next-auth: AuthProvider
// authentication can be used throughout the app
