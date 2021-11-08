/*
 * @Author: lcl
 * @Description: 动态修改网页标题
 * @FilePath: \vue-cli4.x-project-template\src\utils\get-page-title.js
 */
import defaultConfigs from '@/config'

export default function getPageTitle(pageTitle) {
  const title = defaultConfigs.title
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return title
}
