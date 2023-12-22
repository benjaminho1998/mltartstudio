import { BiLogoEtsy, BiLogoInstagram } from 'react-icons/bi'
import { MdOutlineEmail } from 'react-icons/md'
import { openUrl } from '../utils/openUrl'

export default function Sidebar() {
    return (
        <div
            style={{ boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.35)' }}
            className="after:content relative mb-5 flex h-auto flex-col items-center justify-end gap-4 overflow-hidden px-6 pb-10 pt-64 text-center text-black after:pointer-events-none after:absolute after:inset-0 lg:pt-0"
        >
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
                        openUrl('https://www.etsy.com/shop/MltArtStudio')
                    }
                    className="btn btn-wide cursor-pointer z-10 bg-orange-300 hover:bg-orange-400 border-black border-2"
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
                        <button className="btn btn-circle bg-white cursor-pointer z-10 hover:bg-orange-500 border-black border-2">
                            <BiLogoInstagram color="black" size={25} />
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Email">
                        <button
                            onClick={() =>
                                window.open('mailto:menglingtsai55@gmail.com')
                            }
                            className="btn btn-circle bg-white cursor-pointer z-10 hover:bg-orange-500 border-black border-2"
                        >
                            <MdOutlineEmail color="black" size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
