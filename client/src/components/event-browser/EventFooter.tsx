import FooterBg from '@/assets/footer-bg.png';
import Button from '@/components/Button';
import { FaArrowRightLong } from "react-icons/fa6";

export function EventFooter() {
    return (
        <footer className="w-full min-h-72 py-10 px-4 md:px-8 lg:px-16 mt-8">
            <div
                className="h-full text-white rounded-2xl flex items-center justify-center"
                style={{ backgroundImage: `url(${FooterBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="w-full h-full bg-black/70 flex flex-col justify-center gap-4 rounded-2xl px-4 sm:px-8 py-8">
                    <p className="text-md text-gray-300 uppercase">Don't Miss Out</p>
                    <h2 className="text-2xl sm:text-3xl font-medium max-w-sm">Find something worth showing up for.</h2>
                    <Button bgColorClass="bg-brand-red" className="w-fit flex items-center gap-2 py-2 px-4 rounded-md">
                        Browse All Events
                        <FaArrowRightLong size={12} />
                    </Button>
                </div>
            </div>
        </footer>
    );
}