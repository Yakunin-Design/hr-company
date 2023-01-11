import Footer from '@/components/Footer';
import '@/styles/global.css';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {name: string};
}) {

    return (
        <html lang="en">
            <head />
            <body>
                <Sidebar name={params.name}/>
                {children}
                <Footer lk/>
            </body>
        </html>
    );
}
