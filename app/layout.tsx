import '@/styles/global.css';
import Head from './head';

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: any;
}) {

    return (
        <html lang="en">
            <head>
                <Head/>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
