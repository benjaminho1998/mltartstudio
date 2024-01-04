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
import Bio from '../components/Bio'
import Filter from '../components/Filter'
import Bridge from '../components/Icons/Bridge'
import Hero from '../components/Hero'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
    const [filters, setFilters] = useState({ type: '', medium: '', size: '' })
    const router = useRouter()
    const { photoId } = router.query
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

    const contentRef = useRef<HTMLDivElement>(null)
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

    const filteredImages = images.filter((i) =>
        filters.medium
            ? i.tags?.some((tag) => tag.toLowerCase() === filters.medium)
            : i
    )

    const filterActive = filters.medium || filters.size

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
            {photoId && (
                <Modal
                    images={images}
                    onClose={() => {
                        setLastViewedPhoto(photoId)
                    }}
                />
            )}
            <main className="mx-auto max-w-[1960px] pb-10 flex flex-col">
                <Hero contentRef={contentRef} />
                <div ref={contentRef} className="pl-4 pr-4 xl:pl-52 xl:pr-52">
                    <Bio />
                    <div className="pt-16 w-full flex justify-end pb-3 items-center">
                        <div className="flex gap-6 items-center">
                            {/*{filterActive && (*/}
                            {/*    <div className="flex gap-1 items-center">*/}
                            {/*        {filters.medium && (*/}
                            {/*            <div className="pt-1 pb-1 pl-2 pr-2 bg-gray-100 text-black rounded cursor-pointer">*/}
                            {/*                {filters.medium}*/}
                            {/*            </div>*/}
                            {/*        )}*/}
                            {/*        {filters.size && (*/}
                            {/*            <div className="pt-1 pb-1 pl-2 pr-2 bg-gray-100 text-black rounded cursor-pointer">*/}
                            {/*                {filters.size}*/}
                            {/*            </div>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*)}*/}
                            <Filter filters={filters} setFilters={setFilters} />
                        </div>
                    </div>
                    <div className="columns-1 gap-4 sm:columns-2 xl:columns-2 2xl:columns-3">
                        {images && filteredImages && (
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                            >
                                {filteredImages.map(
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
                                                scroll={false}
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
                    {filteredImages.length === 0 && (
                        <div className="flex flex-col items-center mt-6">
                            <h1 className="text-black text-xl font-kalam">
                                No images match your filters
                            </h1>
                            <div className="flex items-center justify-center opacity-80">
                                <span className="flex h-[650px] w-[450px] items-center justify-center opacity-90">
                                    <Bridge />
                                </span>
                                <span className="h-[300px] bg-gradient-to-b from-black/0 via-black to-black"></span>
                            </div>
                        </div>
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
