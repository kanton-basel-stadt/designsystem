import { ICON_PATH, ICON_PATH_ALIAS } from './consts'

export function transformIconId(id: string) {
  return id.replace(ICON_PATH_ALIAS, ICON_PATH)
}
