//日付フォーマットのヘルパー関数

// TellingReordの年齢計算用の関数
export function calculateAge(birthDate: string, targetDate: string): string {
  try {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    // 日付が無効な場合はエラーをスロー
    if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
      throw new Error("Invalid date");
    }

    const years =
      target.getFullYear() -
      birth.getFullYear() -
      ((target.getMonth(), target.getDate()) <
      (birth.getMonth(), birth.getDate())
        ? 1
        : 0);

    // 計算結果が負の数になる場合は0を返す
    if (years < 0) {
      return "0歳";
    }

    return `${years}歳`;
  } catch (error) {
    console.error("Age calculation error:", error);
    return "計算できません";
  }
}
