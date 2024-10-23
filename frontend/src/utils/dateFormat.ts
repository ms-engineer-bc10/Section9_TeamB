// TellingRecord用の年齢計算
export function calculateAge(birthDate: string, targetDate: string): string {
  try {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    // 生年月日から年齢を計算
    let age = target.getFullYear() - birth.getFullYear();

    // 誕生日がまだ来ていない場合は1歳引く
    const thisYearBirthday = new Date(
      target.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (target < thisYearBirthday) {
      age--;
    }

    return age >= 0 ? `${age}歳` : "計算できません";
  } catch (error) {
    console.error("Age calculation error:", error, { birthDate, targetDate });
    return "計算できません";
  }
}
