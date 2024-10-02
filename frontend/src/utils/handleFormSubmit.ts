import { ChildFormData } from "@/types";
import { genderMap, backgroundTypeMap } from "@/types";
import { apiUrl } from "@/lib/config";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { auth } from "@/lib/firebase";

export const handleFormSubmit = async (
  data: ChildFormData,
  router: AppRouterInstance
) => {
  try {
    // Firebase Authenticationからトークンを取得
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("ユーザーがログインしていません");
      return;
    }

    // 認証トークンの取得
    const token = await currentUser.getIdToken(true);
    console.log(token);

    const postData = {
      name: data.name,
      birth_date: data.birthDate,
      arrival_date: data.arrivalDate || null,
      gender: genderMap[data.gender] || "no_answer",
      interests: data.interests,
      background_type: backgroundTypeMap[data.backgroundType] || null,
      background_other: data.backgroundOther || null,
      origin_background: data.originBackground || null,
      care_background: data.careBackground || null,
      family_structure: data.familyStructure || null,
      father_title: data.fatherTitle || null,
      mother_title: data.motherTitle || null,
    };

    console.log("送信するデータ:", postData);

    const response = await fetch(`${apiUrl}/api/children/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Bearer形式でトークンを送信
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      console.log("子供情報が正常に送信されました");
      const childData = await response.json();

      // 絵本生成リクエスト
      const bookResponse = await fetch(`${apiUrl}/api/books/create_book/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ child_id: childData.id }),
      });

      if (bookResponse.ok) {
        console.log("絵本生成リクエストが正常に送信されました");
        router.push("/home");
      } else {
        console.error("絵本生成リクエストに失敗しました");
      }
    } else {
      console.error("送信エラーが発生しました");
    }
  } catch (error) {
    console.error("APIリクエスト中にエラーが発生しました:", error);
  }
};
