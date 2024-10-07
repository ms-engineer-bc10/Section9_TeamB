import { apiUrl } from "@/lib/config";

// 子ども情報をGETするAPIリクエスト
export const getChild = async (token: string) => {
  const response = await fetch(`${apiUrl}/api/children/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // トークンをヘッダーに追加
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch child data");
  }

  return response.json();
};

// 子供情報をPOSTするAPIリクエスト
export const createChild = async (token: string, postData: any) => {
  const response = await fetch(`${apiUrl}/api/children/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Bearer形式でトークンを送信
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("子供情報の送信に失敗しました");
  }

  return response.json();
};

// 子ども情報[id]をGETするAPIリクエスト
export const getChildId = async (id: string) => {
  const response = await fetch(`${apiUrl}/api/children/${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch child data");
  }
  return response.json();
};

// 子ども情報[id]のPUTをするAPIリクエスト
export const updateChild = async (id: string, formData: any) => {
  const response = await fetch(`${apiUrl}/api/children/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  return response;
};

// 絵本生成リクエストのAPIリクエスト
export const createBook = async (token: string, childId: number) => {
  const response = await fetch(`${apiUrl}/api/books/create_book/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ child_id: childId }),
  });

  if (!response.ok) {
    throw new Error("絵本生成リクエストに失敗しました");
  }

  return response.json();
};
