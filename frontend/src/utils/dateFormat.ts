// TellingRecord用の年齢を計算する関数
/**
 * @param birthDate - 子どもの誕生日
 * @param notificationDate - 告知日
 * @returns {number} 年齢
 */
export const calculateAge = (
  birthDate: Date,
  notificationDate: Date
): number => {
  let age = notificationDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = notificationDate.getMonth() - birthDate.getMonth();
  const dayDiff = notificationDate.getDate() - birthDate.getDate();

  // 告知月が誕生月より前、または同じ月でも告知日が誕生日より前の場合、1歳引く
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};
