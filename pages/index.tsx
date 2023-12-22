import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
    const [filters, setFilters] = useState({ type: '', medium: '', size: '' })
    const router = useRouter()
    const { photoId } = router.query
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
    const contentRef = useRef(null)

    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
    }

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
            setLastViewedPhoto(null)
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto])

    return (
        <>
            <Head>
                <title>MltArtStudio</title>
                <meta
                    property="og:image"
                    content="https://nextjsconf-pics.vercel.app/og-image.png"
                />
                <meta
                    name="twitter:image"
                    content="https://nextjsconf-pics.vercel.app/og-image.png"
                />
            </Head>
            {/*<Navbar filters={filters} setFilters={setFilters} />*/}
            <main className="mx-auto max-w-[1960px] pb-4">
                {photoId && (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId)
                        }}
                    />
                )}
                <div
                    className="hero min-h-screen"
                    style={{
                        backgroundImage:
                            'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)',
                    }}
                >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md flex flex-col items-center">
                            <h1 className="mb-5 text-5xl text-white font-bold font-kalam">
                                Mlt Art Studio
                            </h1>
                            <motion.div
                                onClick={() =>
                                    contentRef.current.scrollIntoView({
                                        behavior: 'smooth',
                                    })
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 1.25 }}
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <div className="text-white text-xl font-semibold">
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
                </div>
                <div
                    ref={contentRef}
                    className="pl-60 pr-60 columns-1 gap-4 sm:columns-2 xl:columns-2 2xl:columns-3 pt-10"
                >
                    <Sidebar />
                    {images && (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            {images
                                .filter((i) =>
                                    filters.medium
                                        ? i.tags?.some(
                                              (tag) =>
                                                  tag.toLowerCase() ===
                                                  filters.medium
                                          )
                                        : i
                                )
                                .map(
                                    ({
                                        id,
                                        public_id,
                                        format,
                                        blurDataUrl,
                                    }) => (
                                        <motion.div key={id} variants={item}>
                                            <Link
                                                href={`/?photoId=${id}`}
                                                as={`/p/${id}`}
                                                ref={
                                                    id ===
                                                    Number(lastViewedPhoto)
                                                        ? lastViewedPhotoRef
                                                        : null
                                                }
                                                shallow
                                                className="after:content group relative mb-5 block w-full cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                                            >
                                                <Image
                                                    alt="Mengling's art"
                                                    className="transform brightness-100 transition will-change-auto group-hover:brightness-110"
                                                    style={{
                                                        transform:
                                                            'translate3d(0, 0, 0)',
                                                        boxShadow:
                                                            '0px 0px 5px 0px rgba(0,0,0,0.35)',
                                                    }}
                                                    placeholder="blur"
                                                    blurDataURL={blurDataUrl}
                                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                                                    width={720}
                                                    height={480}
                                                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                                                />
                                            </Link>
                                        </motion.div>
                                    )
                                )}
                        </motion.div>
                    )}
                </div>
            </main>
        </>
    )
}

export default Home

export async function getStaticProps() {
    const results = await cloudinary.v2.search
        .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
        .with_field('tags')
        .with_field('context')
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()
    let reducedResults: ImageProps[] = []

    let i = 0
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
            tags: result.tags,
        })
        i++
    }

    const blurImagePromises = results.resources.map((image: ImageProps) => {
        return getBase64ImageUrl(image)
    })
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

    for (let i = 0; i < reducedResults.length; i++) {
        reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
    }

    return {
        props: {
            images: reducedResults,
        },
    }
}
