// TellingRecord用の年齢を計算する関数
export const calculateAge = (birthDate: Date, tellingDate: Date): number => {
  let age = tellingDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = tellingDate.getMonth() - birthDate.getMonth();
  const dayDiff = tellingDate.getDate() - birthDate.getDate();

  // 告知日が誕生日より前の場合、年齢を1引く
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

// APIから受け取った日時文字列をYYYY-MM-DD形式に変換
export const formatDateFromAPI = (dateTimeString: string): string => {
  try {
    const date = new Date(dateTimeString);
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
};

// YYYY-MM-DD形式の日付をAPI送信用のISO文字列に変換
export const formatDateForAPI = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch (error) {
    console.error("API date formatting error:", error);
    return dateString;
  }
};
