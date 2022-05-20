import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import type { LottiePlayer } from 'lottie-web';

export default function Loading() {
    const ref = useRef<HTMLDivElement>(null);
    const [lottie, setLottie] = useState<LottiePlayer | null>(null);

    useEffect(() => {
        import('lottie-web').then((Lottie) => setLottie(Lottie.default));
    }, []);

    useEffect(() => {
        if (lottie && ref.current) {
            var animate = lottie.loadAnimation({
                container: ref.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('./animations/beercan_opening.json')
            });
            animate.setSpeed(1.5);

            return () => lottie.destroy();
        }
    }, [lottie]);

    return (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="sm:max-w-sm h-auto w-80" ref={ref} />
            <p className="text-center -mt-4 text-gray-500 text-xl font-medium animate-pulse">
                Opening beer...
            </p>
        </div>
    );


}