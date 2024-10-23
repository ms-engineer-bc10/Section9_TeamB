//日付フォーマットのヘルパー関数

// 年齢計算用の関数
export function calculateAge(birthDate: string, targetDate: string): string {
  const birth = new Date(birthDate);
  const target = new Date(targetDate);

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years}歳${months}ヶ月`;
}
