import Footer from '@/components/Footer';
import '@/styles/global.css';
import Sidebar from '@/components/Sidebar';

export default function LkLayout({
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
                <Sidebar active_page="profile" />
                {children}
                <Footer lk/>
            </body>
        </html>
    );
}
