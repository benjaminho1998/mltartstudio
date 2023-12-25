/* eslint-disable no-unused-vars */
export interface ImageProps {
    id: number
    height: string
    width: string
    public_id: string
    format: string
    blurDataUrl?: string
    tags?: string[]
}

export interface SharedModalProps {
    index: number
    images?: ImageProps[]
    currentPhoto?: ImageProps
    changePhotoId: (newVal: number) => void
    closeModal: () => void
    navigation: boolean
    direction?: number
}

export interface FilterProps {
    filters: FiltersProps
    setFilters: (filters: FiltersProps) => void
}

interface FiltersProps {
    medium: string
    type: string
    size: string
}

export interface FilterOptionProps {
    id: string
    label: string
}

export interface FilterCategoryProps {
    category: string
    title: string
    filters: FiltersProps
    setFilters: (filters: FiltersProps) => void
    options: FilterOptionProps[]
}
