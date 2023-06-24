import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/global.css';

export default function SmpPagesLayout({
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
