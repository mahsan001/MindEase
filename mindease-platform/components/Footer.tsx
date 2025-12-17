import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8 px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-10">
                <div>
                    <h3 className="font-heading text-xl mb-5 text-primary font-medium">About MindEase</h3>
                    <p className="text-light leading-relaxed">
                        Making mental health support accessible, affordable, and private for everyone who needs it.
                    </p>
                </div>

                <div>
                    <h3 className="font-heading text-xl mb-5 text-primary font-medium">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><Link href="#features" className="text-light hover:text-primary transition-colors">Features</Link></li>
                        <li><Link href="#about" className="text-light hover:text-primary transition-colors">About Us</Link></li>
                        <li><span className="text-light hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></li>
                        <li><span className="text-light hover:text-primary transition-colors cursor-pointer">Terms of Service</span></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading text-xl mb-5 text-primary font-medium">Resources</h3>
                    <ul className="space-y-3">
                        <li><span className="text-light hover:text-primary transition-colors cursor-pointer">Mental Health Tips</span></li>
                        <li><span className="text-light hover:text-primary transition-colors cursor-pointer">Crisis Helplines</span></li>
                        <li><span className="text-light hover:text-primary transition-colors cursor-pointer">FAQs</span></li>
                        <li><span className="text-light hover:text-primary transition-colors cursor-pointer">Contact Us</span></li>
                    </ul>
                </div>
            </div>

            <div className="text-center pt-8 border-t border-gray-600 text-light">
                © 2025 MindEase. All rights reserved. | Built with care for your well-being.
            </div>
        </footer>
    );
}
