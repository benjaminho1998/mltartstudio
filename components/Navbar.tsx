import { TbFilter } from 'react-icons/tb'
import { FilterOptionProps, NavbarProps } from '../utils/types'
import FilterCategory from './FilterCategory'

export default function Navbar(props: NavbarProps) {
    const { filters, setFilters } = props

    return (
        <div className="navbar bg-white pl-5 pr-5">
            <div className="navbar-start" />
            <div className="navbar-center text-xl text-black font-bold">
                MLTARTSTUDIO
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <button className="btn btn-ghost">
                        <span className="text-black">Filter</span>
                        <TbFilter size={20} color="black" />
                    </button>
                    <div
                        tabIndex={0}
                        className="flex flex-col gap-2 dropdown-content z-[1] p-4 shadow rounded-md bg-white w-72 text-black mt-4 pb-4"
                    >
                        <div className="font-semibold w-full flex justify-center">
                            Filter by
                        </div>
                        <div className="flex flex-col gap-4">
                            <FilterCategory
                                category="type"
                                title="Type"
                                filters={filters}
                                setFilters={setFilters}
                                options={FILTER_TYPE_OPTIONS}
                            />
                            <FilterCategory
                                category="medium"
                                title="Medium"
                                filters={filters}
                                setFilters={setFilters}
                                options={FILTER_MEDIUM_OPTIONS}
                            />
                            <div>
                                <div className="font-semibold text-sm">
                                    Size
                                </div>
                                <div className="divider m-0 mb-1"></div>
                                <div className="flex gap-2 flex-wrap">
                                    <div className="bg-gray-100 pr-2 pl-2 pt-1 pb-1 flex justify-center items-center rounded cursor-pointer hover:bg-gray-300">
                                        5x8
                                    </div>
                                    <div className="bg-gray-100 pr-2 pl-2 pt-1 pb-1 flex justify-center items-center rounded cursor-pointer hover:bg-gray-300">
                                        8x10
                                    </div>
                                    <div className="bg-gray-100 pr-2 pl-2 pt-1 pb-1 flex justify-center items-center rounded cursor-pointer hover:bg-gray-300">
                                        16x24
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FILTER_MEDIUM_OPTIONS: FilterOptionProps[] = [
    { id: 'watercolor', label: 'Watercolor' },
    { id: 'oil', label: 'Oil' },
    { id: 'printed', label: 'Printed' },
]

const FILTER_TYPE_OPTIONS: FilterOptionProps[] = [
    { id: 'landscape', label: 'Landscape' },
    { id: 'portrait', label: 'Portrait' },
    { id: 'custom', label: 'Custom' },
]
