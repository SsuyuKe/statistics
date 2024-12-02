export const monthOptions = [
  { value: '目前', label: '目前' },
  { value: '八月', label: '八月' },
  { value: '七月', label: '七月' },
  { value: '六月', label: '六月' }
]
export const catchStatusOptions = [
  { value: '目前', label: '目前' },
  { value: '捕捉', label: '捕捉' },
  { value: '未捕捉', label: '未捕捉' }
]
export const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`)

export const yearOptions = [
  { label: 2024, value: 2024 },
  { label: 2023, value: 2023 },
  { label: 2022, value: 2022 },
  { label: 2021, value: 2021 }
]

export const districtOptions = [
  { label: '全部', value: '全部' },
  { label: '仁武區', value: '仁武區' },
  { label: '前金區', value: '前金區' },
  { label: '大樹區', value: '大樹區' }
]

export const watersOptions = [
  { label: '全部', value: '全部' },
  { label: '鳳山溪', value: '鳳山溪' },
  { label: '愛河', value: '愛河' },
  { label: '典寶溪', value: '典寶溪' }
]

export const iguanaCategories = [
  {
    label: '公-30cm以上',
    category: 'maleLarge',
    icon: 'iguana'
  },
  {
    label: '公-30cm以下',
    category: 'maleMedium',
    icon: 'iguana-purple'
  },
  {
    label: '母-30cm以上',
    category: 'femaleLarge',
    icon: 'iguana-orange'
  },
  {
    label: '母-19-29cm',
    category: 'femaleMedium',
    icon: 'iguana-red'
  },
  {
    label: '幼蜥',
    category: 'juvenile',
    icon: 'iguana-blue'
  }
]
