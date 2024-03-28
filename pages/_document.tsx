import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" className="bg-white">
                <Head>
                    <link rel="icon" href="/MltLogo.jpg" />
                    <meta
                        name="description"
                        content="Mengling Tsai's art portfolio"
                    />
                    <meta property="og:site_name" content="mltartstudio.com" />
                    <meta
                        property="og:description"
                        content="Mengling Tsai's art portfolio"
                    />
                    <meta property="og:title" content="MLT Art Studio" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="MLT Art Studio" />
                    <meta
                        name="twitter:description"
                        content="Mengling Tsai's art portfolio"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Parisienne&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="antialiased h-screen">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
