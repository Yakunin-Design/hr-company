import Footer from '@/components/Footer';
import '@/styles/global.css';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {active_page: string};
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <Sidebar active_page={params.active_page}/>
                {children}
                <Footer lk/>
            </body>
        </html>
    );
}
