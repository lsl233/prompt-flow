/**
 * 多语言字段类型
 */
export interface LocalizedField {
  zh: string;
  en: string;
}

/**
 * 根据 locale 获取多语言字段的值
 * 如果字段不是多语言格式，直接返回字段值
 * 如果当前语言缺失，尝试返回另一种语言
 */
export function getLocalizedField(
  field: string | LocalizedField,
  locale: string
): string {
  // 如果是字符串，直接返回
  if (typeof field === "string") {
    return field;
  }

  // 如果是多语言对象
  if (field && typeof field === "object") {
    // 优先返回当前语言的值
    if (field[locale as keyof LocalizedField]) {
      return field[locale as keyof LocalizedField];
    }
    // 如果没有当前语言，返回中文或英文
    if (field.zh) return field.zh;
    if (field.en) return field.en;
  }

  return "";
}
