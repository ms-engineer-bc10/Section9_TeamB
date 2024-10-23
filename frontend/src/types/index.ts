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

// Bookの型定義
export interface Book {
  id: number;
  user: number; // User model の id
  child: number; // Child model の id
  paid_service: number | null; // PaidService model の id、nullable
  story_prompt: number | null; // StoryPrompt model の id、nullable
  story_template: number | null; // StoryTemplate model の id、nullable
  title: string;
  cover_image_url: string;
  lead_message: string;
  pdf_file: Blob | null; // BinaryFieldはBlobとして扱う
  is_pdf_generated: boolean;
  pdf_generated_at: string | null; // DateTimeField、nullable
  last_downloaded_at: string | null; // DateTimeField、nullable
  pdf_download_count: number;
  created_at: string; // DateTimeField
  updated_at: string; // DateTimeField
  is_original: boolean;
}

// Pageの型定義
export interface Page {
  id: number;
  book: number; // Book model の id
  page_number: number;
  content: string;
  image_url: string;
}

// Telling-recordの型定義
export interface TellingRecord {
  id: number;
  user: number;
  child: number;
  book: number;
  telling_date: string;
  child_reaction: string;
  notes: string;
}
