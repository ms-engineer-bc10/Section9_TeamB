// TellingRecord用の年齢を計算する関数
export const calculateAge = (
  birthDate: string,
  tellingDate: string
): number => {
  try {
    // 日付文字列の形式が正しいか確認
    if (
      !birthDate ||
      !tellingDate ||
      !/^\d{4}-\d{2}-\d{2}$/.test(birthDate) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(tellingDate)
    ) {
      return 0;
    }

    const [bYear, bMonth, bDay] = birthDate.split("-").map(Number);
    const [tYear, tMonth, tDay] = tellingDate.split("-").map(Number);

    let age = tYear - bYear;

    // 月と日で誕生日が来ているかチェック
    if (tMonth < bMonth || (tMonth === bMonth && tDay < bDay)) {
      age--;
    }

    return age;
  } catch (error) {
    console.error("Age calculation error:", error);
    return 0;
  }
};
