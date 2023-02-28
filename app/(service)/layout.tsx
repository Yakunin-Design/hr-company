import Footer from '@/components/Footer';
import '@/styles/global.css';
import Header from '@/components/Header';

export default function ServicePagesLayout({
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
                <Header/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}
