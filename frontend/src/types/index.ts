//型定義ファイル

// ユーザー情報
export type Inputs = {
  email: string;
  password: string;
};

// 子どもの情報
export type Gender = "boy" | "girl" | "no_answer";
export type BackgroundType =
  | "special_adoption"
  | "foster_regular_adoption"
  | "sperm_donation"
  | "egg_donation"
  | "step_family"
  | "other";

export const genderMap: Record<string, Gender> = {
  boy: "boy",
  girl: "girl",
  other: "no_answer",
};

export const backgroundTypeMap: Record<string, BackgroundType> = {
  special_adoption: "special_adoption",
  foster_regular_adoption: "foster_regular_adoption",
  sperm_donation: "sperm_donation",
  egg_donation: "egg_donation",
  step_family: "step_family",
  other: "other",
};

export interface ChildFormData {
  name: string;
  birthDate: string; // "YYYY-MM-DD" 形式の日付
  arrivalDate: string; // "YYYY-MM-DD" 形式の日付
  gender: Gender;
  interests: string;
  backgroundType: BackgroundType;
  backgroundOther?: string;
  originBackground: string;
  careBackground: string;
  familyStructure: string;
  fatherTitle: string;
  motherTitle: string;
}
