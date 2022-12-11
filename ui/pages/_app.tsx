import "../styles/globals.css";
import type { AppProps } from "next/app";
import AmazingLayout from "../components/AmazingLayout/AmazingLayout";
import "flexboxgrid2";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AmazingLayout>
            <Component {...pageProps} />
        </AmazingLayout>
    );
}
