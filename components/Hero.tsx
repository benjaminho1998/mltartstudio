import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { MutableRefObject } from 'react'

interface HeroProps {
    contentRef: MutableRefObject<HTMLDivElement>
}

export default function Hero(props: HeroProps) {
    const { contentRef } = props

    return (
        <motion.div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    'url(https://res.cloudinary.com/dnjhwnfjd/image/upload/v1703370612/MltCover_sfk3tg.jpg)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md flex flex-col items-center">
                    <h1 className="mb-5 text-5xl text-white font-bold font-kalam">
                        MLT Art Studio
                    </h1>
                    <motion.div
                        onClick={() =>
                            contentRef.current.scrollIntoView({
                                behavior: 'smooth',
                            })
                        }
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1.2 }}
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <div className="text-white text-lg font-semibold">
                            Explore
                        </div>
                        <ChevronDownIcon
                            className="-mt-1"
                            color="white"
                            height={30}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
