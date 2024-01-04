import { TbFilter } from 'react-icons/tb'
import { FilterOptionProps, FilterProps } from '../utils/types'
import FilterCategory from './FilterCategory'

export default function Filter(props: FilterProps) {
    const { filters, setFilters } = props

    const getNumActiveFilters = () => {
        if (filters.medium && filters.size) return 2
        if (filters.medium || filters.size) return 1
        return 0
    }

    const filterActive = filters.medium || filters.size

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn bg-white indicator border border-black hover:bg-orange-400"
            >
                {filterActive && (
                    <span className="indicator-item badge bg-orange-400 rounded-full text-black h-[20px] w-[20px]">
                        {getNumActiveFilters()}
                    </span>
                )}
                <span className="text-black">Filter</span>
                <TbFilter size={20} color="black" />
            </div>
            <div
                tabIndex={0}
                className="flex flex-col gap-2 dropdown-content z-[50] p-4 shadow-2xl rounded-md bg-white mt-2 w-72 text-black pb-4"
            >
                <div className="font-semibold w-full flex justify-center">
                    Filter by
                </div>
                <div className="flex flex-col gap-4">
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
    )
}

const FILTER_MEDIUM_OPTIONS: FilterOptionProps[] = [
    { id: 'watercolor', label: 'Watercolor' },
    { id: 'oil', label: 'Oil' },
    { id: 'printed', label: 'Printed' },
]

const FILTER_SIZE_OPTIONS: FilterOptionProps[] = [
    { id: '5x8', label: '5x8' },
    { id: '8x10', label: '8x10' },
    { id: '16x24', label: '16x24' },
]
