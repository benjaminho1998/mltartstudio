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
                        className="flex flex-col gap-2 dropdown-content z-[1] p-4 shadow-2xl rounded-md bg-white w-72 text-black mt-4 pb-4"
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
                            <FilterCategory
                                category="size"
                                title="Size"
                                filters={filters}
                                setFilters={setFilters}
                                options={FILTER_SIZE_OPTIONS}
                            />
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

const FILTER_SIZE_OPTIONS: FilterOptionProps[] = [
    { id: '5x8', label: '5x8' },
    { id: '8x10', label: '8x10' },
    { id: '16x24', label: '16x24' },
]
