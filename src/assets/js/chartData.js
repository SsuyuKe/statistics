export const getPieChartData = (data) => {
  const districtMap = new Map()
  for (const item of data) {
    const {
      district,
      maleLarge,
      femaleLarge,
      maleMedium,
      femaleMedium,
      juvenile
    } = item
    const totalAmount =
      maleLarge + femaleLarge + maleMedium + femaleMedium + juvenile
    districtMap.set(district, (districtMap.get(district) || 0) + totalAmount)
  }

  return [...districtMap].map(([district, amount]) => ({
    district,
    amount
  }))
}

export const getBarChartDataForIguana = (data) => {
  const monthMap = new Map()
  data.forEach((item) => {
    if (!monthMap.has(item.month)) {
      monthMap.set(item.month, [0, 0, 0, 0, 0])
    }
    const monthData = monthMap.get(item.month)
    // 更新每個字段
    monthData[0] += item.maleLarge
    monthData[1] += item.femaleLarge
    monthData[2] += item.maleMedium
    monthData[3] += item.femaleMedium
    monthData[4] += item.juvenile
  })
  return Array.from(
    { length: 12 },
    (_, i) => monthMap.get(i + 1) || [0, 0, 0, 0, 0]
  )
}
export const getBarChartDataForLocation = (data1, data2) => {
  const districtMap = new Map()

  data1.forEach((item) => {
    if (!districtMap.has(item.district)) {
      districtMap.set(item.district, [0, 0])
    }
    const monthData = districtMap.get(item.district)
    monthData[0] += item.amount
  })

  data2.forEach((item) => {
    if (!districtMap.has(item.district)) {
      districtMap.set(item.district, [0, 0])
    }
    const monthData = districtMap.get(item.district)
    monthData[1] += item.amount
  })

  const districts = Array.from(districtMap.keys())

  const total = Array.from(districtMap.values())

  return { districts, total }
}

export const getBarChartDataAndSumByMonth = (data1, data2) => {
  const monthMap = new Map()
  const addToMonthMap = (data, index) => {
    data.forEach((item) => {
      const month = item.month
      if (!monthMap.has(month)) {
        monthMap.set(month, [0, 0])
      }
      const totals = monthMap.get(month)
      totals[index] += item.amount
    })
  }

  addToMonthMap(data1, 0)
  addToMonthMap(data2, 1)

  for (let month = 1; month <= 12; month++) {
    if (!monthMap.has(month)) {
      monthMap.set(month, [0, 0])
    }
  }

  return Array.from(monthMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, totals]) => totals)
}

export const getLineChartData = (data) => {
  const monthMap = new Map()

  data.forEach((item) => {
    if (!monthMap.has(item.month)) {
      monthMap.set(item.month, {
        maleLarge: 0,
        femaleLarge: 0,
        maleMedium: 0,
        femaleMedium: 0,
        juvenile: 0,
        total: 0
      })
    }
    const monthData = monthMap.get(item.month)

    monthData.maleLarge += item.maleLarge
    monthData.femaleLarge += item.femaleLarge
    monthData.maleMedium += item.maleMedium
    monthData.femaleMedium += item.femaleMedium
    monthData.juvenile += item.juvenile

    monthData.total =
      monthData.maleLarge +
      monthData.femaleLarge +
      monthData.maleMedium +
      monthData.femaleMedium +
      monthData.juvenile
  })

  return Array.from({ length: 12 }, (_, i) => monthMap.get(i + 1)?.total || 0)
}
