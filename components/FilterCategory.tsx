import { FilterCategoryProps } from '../utils/types'

export default function FilterCategory(props: FilterCategoryProps) {
    const { title, setFilters, filters, category, options } = props

    return (
        <div>
            <div className="font-semibold text-sm">{title}</div>
            <div className="divider m-0 mb-1"></div>
            <div className="flex gap-2 flex-wrap">
                {options.map((option) => (
                    <div
                        onClick={() =>
                            setFilters({
                                ...filters,
                                [category]:
                                    filters[category] === option.id
                                        ? ''
                                        : option.id,
                            })
                        }
                        className={`${
                            filters[category] === option.id
                                ? 'bg-orange-300'
                                : 'bg-gray-100'
                        } pr-2 pl-2 pt-1 pb-1 flex justify-center items-center rounded cursor-pointer ${
                            filters[category] === option.id
                                ? 'hover:bg-orange-400'
                                : 'hover:bg-gray-300'
                        }`}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    )
}
