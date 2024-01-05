import {
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { variants } from '../utils/animationVariants'
import type { SharedModalProps } from '../utils/types'
import useKeypress from 'react-use-keypress'

export default function SharedModal({
    index,
    images,
    changePhotoId,
    closeModal,
    navigation,
    currentPhoto,
    direction,
}: SharedModalProps) {
    const [loaded, setLoaded] = useState(false)

    // let filteredImages = images?.filter((img: ImageProps) =>
    //     range(index - 15, index + 15).includes(img.id)
    // )

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (index < images?.length - 1) {
                setLoaded(false)
                changePhotoId(index + 1)
            }
        },
        onSwipedRight: () => {
            if (index > 0) {
                setLoaded(false)
                changePhotoId(index - 1)
            }
        },
        trackMouse: true,
    })

    let currentImage = images ? images[index] : currentPhoto

    useKeypress('ArrowRight', () => {
        if (index + 1 < images.length) {
            setLoaded(false)
            changePhotoId(index + 1)
        }
    })

    useKeypress('ArrowLeft', () => {
        if (index > 0) {
            setLoaded(false)
            changePhotoId(index - 1)
        }
    })

    return (
        <MotionConfig
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div
                className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
                {...handlers}
            >
                {/* Main image */}
                <div className="w-full">
                    <div className="relative flex aspect-[3/2] items-center justify-center">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute w-screen h-[calc(100vh-100px)]"
                            >
                                <div className="absolute z-100 w-full -top-10 left-3">
                                    <button
                                        onClick={closeModal}
                                        className="rounded-full bg-black/50 p-2 z-100 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                                <Image
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage.public_id}.${currentImage.format}`}
                                    fill
                                    className="object-contain"
                                    priority
                                    alt="Mengling's art"
                                    onLoad={() => setLoaded(true)}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                {!loaded && (
                    <div className="absolute w-full flex justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {/* Buttons + bottom nav bar */}
                <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
                    {/* Buttons */}
                    {loaded && (
                        <div className="relative aspect-[3/2] max-h-full w-full">
                            {navigation && (
                                <>
                                    {index > 0 && (
                                        <button
                                            className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                                            style={{
                                                transform:
                                                    'translate3d(0, 0, 0)',
                                            }}
                                            onClick={() => {
                                                setLoaded(false)
                                                changePhotoId(index - 1)
                                            }}
                                        >
                                            <ChevronLeftIcon className="h-6 w-6" />
                                        </button>
                                    )}
                                    {index + 1 < images.length && (
                                        <button
                                            className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                                            style={{
                                                transform:
                                                    'translate3d(0, 0, 0)',
                                            }}
                                            onClick={() => {
                                                setLoaded(false)
                                                changePhotoId(index + 1)
                                            }}
                                        >
                                            <ChevronRightIcon className="h-6 w-6" />
                                        </button>
                                    )}
                                </>
                            )}
                            <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                                {/*{currentImage.tags.map((tag) => (*/}
                                {/*    <div className="pt-1 pb-1 pl-2 pr-2 bg-gray-100 text-black rounded">*/}
                                {/*        {tag}*/}
                                {/*    </div>*/}
                                {/*))}*/}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MotionConfig>
    )
}
