import Script from "next/script";

export default function PaddleLoader() {
    return (
        <Script
        src="https://cdn.paddle.com/paddle/paddle.js"
        onLoad={() => {
            if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
                Paddle.Environment.set("sandbox");
            }

            Paddle.Setup({
                vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
            });

            Paddle.Checkout.open({
                method: 'inline',
                product: 806852,     
                allowQuantity: false,
                disableLogout: true,
                frameTarget: 'checkout-container', 
                frameInitialHeight: 416,
                frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;' 
            });
        }}
        />
    );
}