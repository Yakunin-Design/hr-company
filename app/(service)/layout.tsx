import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/global.css';

export default function ServicePagesLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: any;
}) {

    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
        
    );
}
