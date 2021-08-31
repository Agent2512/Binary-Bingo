import { AppProps } from 'next/app'

import "../public/scss/style.scss"

export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Component {...pageProps} />
    )
}