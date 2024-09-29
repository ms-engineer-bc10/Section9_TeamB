import { ChildFormData } from "@/types/index";
import { genderMap, backgroundTypeMap } from "@/types/index";
import { apiUrl } from "@/lib/config";

export const handleFormSubmit = async (data: ChildFormData) => {
  try {
    const postData = {
      name: data.name,
      birth_date: data.birthDate,
      arrival_date: data.arrivalDate,
      gender: genderMap[data.gender] || "no_answer",
      interests: data.interests,
      background_type: backgroundTypeMap[data.backgroundType] || null,
      background_other: data.backgroundOther || null,
      origin_background: data.originBackground,
      care_background: data.careBackground,
      family_structure: data.familyStructure,
      father_title: data.fatherTitle,
      mother_title: data.motherTitle,
      user: 1,
    };

    console.log("送信するデータ:", postData);

    const response = await fetch(`${apiUrl}/api/children/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      console.log("子供情報が正常に送信されました");
      //   router.push("/home");
    } else {
      console.error("送信エラーが発生しました");
    }
  } catch (error) {
    console.error("APIリクエスト中にエラーが発生しました:", error);
  }
};
