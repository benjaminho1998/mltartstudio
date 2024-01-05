import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { MutableRefObject } from 'react'
import Image from 'next/image'

interface HeroProps {
    contentRef: MutableRefObject<HTMLDivElement>
}

export default function Hero(props: HeroProps) {
    const { contentRef } = props

    return (
        <>
            <motion.div
                className="min-h-screen relative z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Image
                    src="https://res.cloudinary.com/dnjhwnfjd/image/upload/v1703370612/cover.jpg"
                    alt="hero"
                    fill
                    className="object-cover"
                />
            </motion.div>
            <div className="min-h-screen w-full absolute bg-black bg-opacity-20" />
            <div className="min-h-screen w-full absolute flex justify-center items-center">
                <div className="max-w-md flex flex-col items-center">
                    <h1 className="mb-5 text-3xl sm:text-5xl text-white font-bold font-kalam">
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
        </>
    )
}
