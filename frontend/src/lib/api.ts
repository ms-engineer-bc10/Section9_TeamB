export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

// ユーザ－情報をPOSTするAPIリクエスト
export const createUserInDjango = async (
  email: string,
  firebase_uid: string
) => {
  const response = await fetch(`${apiUrl}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      firebase_uid,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Django APIへのリクエストに失敗しました");
  }
};

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

// 絵本生成のAPIリクエスト
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

// 非同期処理のタスクの状態を確認するAPIリクエスト
export const checkTaskStatus = async (token: string, taskId: string) => {
  const response = await fetch(
    `${apiUrl}/api/books/check_task_status/?task_id=${taskId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("タスク状態の確認に失敗しました");
  }

  return response.json();
};

// ユーザーに紐づく絵本をGETするリクエスト
export const getUserBooks = async (token: string) => {
  const response = await fetch(`${apiUrl}/api/books/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user books");
  }

  return response.json();
};

// 特定の{id}の絵本のPDFをGET（ダウンロード）するリクエスト
export const downloadBookPDF = async (token: string, bookId: number) => {
  const response = await fetch(`${apiUrl}/api/books/${bookId}/download-pdf/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to download PDF");
  }

  return response.blob();
};

// Stripe決済機能に遷移するAPIリクエスト
export const createCheckoutSession = async (token: string) => {
  try {
    const response = await fetch(`${apiUrl}/stripe/create-checkout-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("リクエストが失敗しました:", error);
    throw error;
  }
};

// payments、paid_service情報をPOSTするAPIリクエスト
export const postPayment = async (idToken: string) => {
  try {
    const response = await fetch(`${apiUrl}/api/payments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to post payment");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message || error);
    throw error;
  }
};

// PaidServiceをGETするAPIリクエスト
export const getPaidServices = async (token: string) => {
  try {
    const response = await fetch(`${apiUrl}/api/paid-services/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch paid services: ${response.statusText}`);
    }

    const paidServices = await response.json();
    return paidServices;
  } catch (error) {
    console.error("Error fetching paid services:", error);
    return null;
  }
};

// 会員ステータスの確認リクエスト
export const fetchMembershipStatus = async (idToken: string) => {
  try {
    const response = await fetch(`${apiUrl}/stripe/membership-status/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch membership status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching membership status:", error);
    throw error;
  }
};
