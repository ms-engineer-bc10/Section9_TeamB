import Link from "next/link";
import CheckoutButton from "../../components/stripe/CheckoutButton";

const Plan = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-8">プラン選択</h1>

      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 border border-black rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold">有料プラン</h2>
          <p>有料プランの詳細説明がここに入ります。</p>
          <CheckoutButton />
        </div>

        <div className="p-4 border border-black rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold">無料プラン</h2>
          <p>無料プランの詳細説明がここに入ります。</p>
          <Link href="/message">
            <p className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded">
              無料プランへ
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Plan;
