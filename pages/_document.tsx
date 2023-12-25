import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" className="bg-white">
                <Head>
                    <link rel="icon" href="/MltLogo.jpg" />
                    <meta
                        name="description"
                        content="See pictures from Next.js Conf and the After Party."
                    />
                    <meta
                        property="og:site_name"
                        content="nextjsconf-pics.vercel.app"
                    />
                    <meta
                        property="og:description"
                        content="See pictures from Next.js Conf and the After Party."
                    />
                    <meta
                        property="og:title"
                        content="Next.js Conf 2022 Pictures"
                    />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        name="twitter:title"
                        content="Next.js Conf 2022 Pictures"
                    />
                    <meta
                        name="twitter:description"
                        content="See pictures from Next.js Conf and the After Party."
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
