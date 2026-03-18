import Payjp from "payjp-js";

export default function BuyButton() {
  const handlePay = async () => {
    const payjp = Payjp("公開キー入れる");

    const token = await payjp.createToken({
      number: "4242424242424242",
      cvc: "123",
      exp_month: 12,
      exp_year: 2026,
    });

    console.log("トークン👇", token);
  };

  return (
    <button onClick={handlePay}>
      課金する
    </button>
  );
}