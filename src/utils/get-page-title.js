import defaultSettings from '@/settings'

const title = '尤尼科系统' || defaultSettings.title
// const title = '尤尼科系统'


export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
