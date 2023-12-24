import { BiLogoInstagram } from 'react-icons/bi'
import { openUrl } from '../utils/openUrl'
import Image from 'next/image'
import { FaEtsy } from 'react-icons/fa'

export default function Bio() {
    return (
        <div className="flex items-center justify-center mt-20 gap-6 sm:gap-12 flex-col md:flex-row">
            <div className="flex flex-col gap-3 items-center">
                <Image
                    alt="Mengling's headshot"
                    className="rounded-full"
                    style={{
                        transform: 'translate3d(0, 0, 0)',
                        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.35)',
                    }}
                    src="https://res.cloudinary.com/dnjhwnfjd/image/upload/v1703371173/mom_pgtfzl.jpg"
                    width={200}
                    height={200}
                />
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
                        <button className="btn btn-circle bg-white cursor-pointer z-10 hover:bg-orange-400 border-black border">
                            <BiLogoInstagram color="black" size={25} />
                        </button>
                    </div>
                    <div
                        onClick={() =>
                            openUrl(
                                'https://www.instagram.com/mltartstudio/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=='
                            )
                        }
                        className="tooltip tooltip-bottom"
                        data-tip="Etsy"
                    >
                        <button className="btn btn-circle cursor-pointer z-10 bg-white hover:bg-orange-400 border-black border">
                            <FaEtsy color="black" size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <p className="z-0 max-w-[100ch] text-black/75 sm:max-w-[60ch] text-left mb-4">
                Welcome to my art studio! <br />
                <br />
                I'm Mengling, the brush behind the canvas and the heart behind
                the art. Nestled in the vibrant Bay Area, I've been on a
                creative journey, capturing the beauty of life through the
                delicate strokes of watercolor and the rich hues of oil paints.{' '}
                <br />
                <br />
                Your support means the world to me, and I'm excited to share my
                passion with you. <br />
                <br />
                With gratitude and artful wishes, <br />
                Mengling <br />
                <br />
                P.S. You can find all of my creations and more on my{' '}
                <a
                    className="pointer underline z-10 hover:text-orange-400"
                    href="https://www.etsy.com/shop/MltArtStudio"
                    target="_blank"
                    rel="noreferrer"
                >
                    Etsy
                </a>
                .
            </p>
        </div>
    )
}
