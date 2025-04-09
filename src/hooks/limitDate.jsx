const limitDate = (limit) => {
  if (!limit) return null

  const now = new Date()
  const deadline = new Date(limit)
  const diffMs = deadline - now
  const diffMinutes = Math.floor(diffMs / 1000 / 60)

  if (diffMinutes < 0) return '期限切れ'

  const days = Math.floor(diffMinutes / (60 * 24))
  const hours = Math.floor((diffMinutes % (60 * 24)) / 60)
  const minutes = diffMinutes % 60

  let result = ''
  if (days > 0) result += `${days}日`
  if (hours > 0) result += `${hours}時間`
  if (minutes > 0) result += `${minutes}分`
  if (result === '') result = '1分以内'

  return `${result}後`
}

export default limitDate
