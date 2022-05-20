import { LinkIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { LottiePlayer } from "lottie-web";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/userContext";

export default function Auth() {

    const { signInWithGoogle, signInWithGithub }: any = useUserContext();

    const ghActionRef: string = "https://github.com/gigu-io/beerlist/releases/tag/" + process.env.NEXT_PUBLIC_APP_VERSION
    const refAnimation = useRef<HTMLDivElement>(null);
    const [lottie, setLottie] = useState<LottiePlayer | null>(null);

    useEffect(() => {
        import('lottie-web').then((Lottie) => setLottie(Lottie.default));
    }, []);

    useEffect(() => {
        if (lottie && refAnimation.current) {
            var animate = lottie.loadAnimation({
                container: refAnimation.current,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: require('./animations/beercan_opening_noloop.json')
            });
            animate.setSpeed(1);

            return () => lottie.destroy();
        }
    }, [lottie]);

    const animateLogo = () => {
        if (lottie && refAnimation.current) {
            lottie.play();
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div
                className="grid place-content-center"
            >
                <div className="hover:active:-rotate-12 transition-all duration-150 ease-in-out">
                    <div
                        onClick={
                            animateLogo
                        }
                        className="sm:max-w-sm"
                        ref={refAnimation}
                    />
                </div>


            </div>
            <h2 className="mt-2 text-center text-gray-600">
                made with
                <HeartIcon className="text-tertiary h-6 absolute m-auto left-0 right-0" />
                <HeartIcon className="text-tertiary h-6 absolute m-auto left-0 right-0 animate-ping" />
            </h2>

            <div className="sm:mx-auto w-4/6 mt-8 max-w-md">
                <div className="">
                    <div className="mt-2 grid sm:grid-cols-2 gap-3">
                        <div>
                            <span
                                onClick={signInWithGoogle}
                                className="hover:bg-tertiary hover:scale-105 cursor-pointer w-full inline-flex justify-center py-4 px-4 rounded-md shadow bg-secondary text-lg font-medium text-white transition-all duration-400 ease-in-out"
                            >
                                <span className="sr-only">Sign in with Google</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                            </span>
                        </div>

                        <div>
                            <span
                                onClick={signInWithGithub}
                                className="hover:bg-tertiary hover:scale-105 cursor-pointer w-full inline-flex justify-center py-4 px-4 rounded-md shadow-sm bg-secondary text-sm font-medium text-white transition-all duration-400 ease-in-out"
                            >
                                <span className="sr-only">Sign in with GitHub</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                    <a href={ghActionRef} target="_blank" rel="noreferrer">
                        <span className="font-bold">
                            Version:&nbsp;
                        </span>
                        {process.env.NEXT_PUBLIC_APP_VERSION}
                        &nbsp;
                        <LinkIcon className="inline h-4 m-auto left-0 right-0" />
                    </a>
                </p>
            </div>
        </div>
    )
}
