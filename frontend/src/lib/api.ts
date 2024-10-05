import { apiUrl } from "@/lib/config";

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
