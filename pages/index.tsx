import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Modal from '../components/Modal'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import { BiLogoEtsy, BiLogoInstagram } from 'react-icons/bi'
import { MdOutlineEmail } from 'react-icons/md'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
    const router = useRouter()
    const { photoId } = router.query
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

    const openUrl = (url: string) =>
        window.open(url, '_blank', 'noopener, noreferrer')

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
            <main className="mx-auto max-w-[1960px] p-4">
                {photoId && (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId)
                        }}
                    />
                )}
                <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                    <div className="after:content relative mb-5 flex h-auto flex-col items-center justify-end gap-4 overflow-hidden rounded-lg border-2 border-black px-6 pb-10 pt-64 text-center text-black shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            {/*<span className="flex max-h-full max-w-full items-center justify-center opacity-50">*/}
                            {/*  <Bridge />*/}
                            {/*</span>*/}
                            {/*<span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>*/}
                        </div>
                        <h1 className="mt-8 text-base font-bold uppercase tracking-widest">
                            MltArtStudio
                        </h1>
                        <p className="z-0 max-w-[40ch] text-black/75 sm:max-w-[32ch] text-left mb-4">
                            Welcome to my art studio! <br />
                            <br />
                            I'm Mengling, the brush behind the canvas and the
                            heart behind the art. Nestled in the vibrant Bay
                            Area, I've been on a creative journey, capturing the
                            beauty of life through the delicate strokes of
                            watercolor and the rich hues of oil paints. <br />
                            <br />
                            Your support means the world to me, and I'm excited
                            to share my passion with you. <br />
                            <br />
                            With gratitude and artful wishes, <br />
                            Mengling <br />
                            <br />
                            P.S. You can find more of my creations on my{' '}
                            <a
                                className="pointer underline z-10"
                                href="https://www.etsy.com/shop/MltArtStudio"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Etsy
                            </a>
                            .
                        </p>
                        <div className="flex flex-col gap-4 items-center">
                            <button
                                onClick={() =>
                                    openUrl(
                                        'https://www.etsy.com/shop/MltArtStudio'
                                    )
                                }
                                className="btn btn-outline btn-wide cursor-pointer z-10 bg-orange-400 hover:bg-orange-500 border-black border-2"
                            >
                                <BiLogoEtsy color="black" size={40} />
                            </button>
                            <div className="flex gap-2">
                                <div
                                    onClick={() =>
                                        openUrl(
                                            'https://www.instagram.com/mltartstudio/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=='
                                        )
                                    }
                                    className="tooltip tooltip-bottom"
                                    data-tip="Instagram"
                                >
                                    <button className="btn btn-outline btn-circle bg-white cursor-pointer z-10 hover:bg-orange-500 border-black border-2">
                                        <BiLogoInstagram
                                            color="black"
                                            size={25}
                                        />
                                    </button>
                                </div>
                                <div
                                    className="tooltip tooltip-bottom"
                                    data-tip="Email"
                                >
                                    <button
                                        onClick={() =>
                                            window.open(
                                                'mailto:menglingtsai55@gmail.com'
                                            )
                                        }
                                        className="btn btn-outline btn-circle bg-white cursor-pointer z-10 hover:bg-orange-500 border-black border-2"
                                    >
                                        <MdOutlineEmail
                                            color="black"
                                            size={25}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {images.map(({ id, public_id, format, blurDataUrl }) => (
                        <Link
                            key={id}
                            href={`/?photoId=${id}`}
                            as={`/p/${id}`}
                            ref={
                                id === Number(lastViewedPhoto)
                                    ? lastViewedPhotoRef
                                    : null
                            }
                            shallow
                            className="after:content group relative mb-5 block w-full cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                        >
                            <Image
                                alt="Mengling's art"
                                className="transform rounded-lg brightness-100 transition will-change-auto group-hover:brightness-110"
                                style={{ transform: 'translate3d(0, 0, 0)' }}
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
                    ))}
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
        console.log('qwerqwer', result.tags, result.context)
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
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
