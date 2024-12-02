import { useRef, useLayoutEffect } from 'react'

const useScrollRestore = (isExpanded) => {
  const previousScrollPosition = useRef(0)
  const shouldScrollRef = useRef(false)

  useLayoutEffect(() => {
    if (!isExpanded && shouldScrollRef.current) {
      // 恢復滾動位置
      window.scrollTo({
        top: previousScrollPosition.current,
        behavior: 'smooth'
      })
      shouldScrollRef.current = false // 重置
    }
  }, [isExpanded])

  const handleExpandChange = (expanded) => {
    if (expanded) {
      // 紀錄當前滾動位置
      previousScrollPosition.current = window.scrollY
    } else {
      // 標記需要滾動
      shouldScrollRef.current = true
    }
  }

  return handleExpandChange
}

export default useScrollRestore
