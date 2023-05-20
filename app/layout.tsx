import '@/styles/global.css';

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: any;
}) {

    return (
        <html lang="en">
            <head />
            <body>
                {children}
            </body>
        </html>
    );
}
