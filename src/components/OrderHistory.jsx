import i18n from "../components/common/components/LangConfig";
import useOrderHistory from "../hooks/useOrderHistory";

const OrderHistory = () => {
  const { data } = useOrderHistory();

  const handleOrderClick = (orderId) => {
    // navigate(`/order/${orderId}`);
  };

  return (
    <div className="w-full md:w-2/3">
      <h2 className="text-2xl font-semibold mb-6">注文履歴</h2>
      {data && data.length === 0 ? (
        <p className="text-gray-500">注文履歴がありません</p>
      ) : (
        <div className="space-y-4">
          {data &&
            data.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm cursor-pointer"
                onClick={() => handleOrderClick(order.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">注文 No#{order.id}</span>
                  <span className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span>合計</span>
                      <span>${order.totalAmount}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      注文の状態: {order.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
