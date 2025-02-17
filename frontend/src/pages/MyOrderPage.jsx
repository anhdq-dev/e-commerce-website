import { useEffect, useState } from "react";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //   Simulate fetching order
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createAt: new Date(),
          shippingAddress: { city: "New York", country: "United States" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/200?random=1",
            },
          ],
          totalPice: 100,
          isPaid: true,
        },
        {
          _id: "12346",
          createdAt: new Date(),
          shippingAddress: { city: "Los Angeles", country: "United States" },
          orderItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/200?random=2",
            },
          ],
          totalPrice: 150,
          isPaid: false,
        },
        {
          _id: "12347",
          createdAt: new Date(),
          shippingAddress: { city: "London", country: "United Kingdom" },
          orderItems: [
            {
              name: "Product 3",
              image: "https://picsum.photos/200?random=3",
            },
            {
              name: "Product 4",
              image: "https://picsum.photos/200?random=4",
            },
          ],
          totalPrice: 220,
          isPaid: true,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-green-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order Id</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Prices</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t cursor-pointer hover:bg-gray-100"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].image}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                    {" - "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    ${order.totalPrice}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "text-green-500 bg-green-100"
                          : "text-red-100 bg-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium block w-20 text-center`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
// {orders.length > 0 ? (
//     orders.map((order) => (
//       <tr
//         key={order._id}
//         className="border-b hover:border-gray-50 cursor-pointer"
//       >
//         <td className="py-2 px-2 sm:py-4 sm:px-4">
//           <img
//             src={order.orderItems[0].image}
//             alt={order.orderItems[0].image}
//             className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
//           />
//         </td>
//         <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
//           #{order._id}
//         </td>
//         <td className="py-2 px-2 sm:py-4 sm:px-4">
//           {new Date(order.createdAt).toLocaleDateString()}{" "}
//           {new Date(order.createdAt).toLocaleTimeString()}
//         </td>
//         <td className="py-2 px-2 sm:py-4 sm:px-4">
//           {order.shippingAddress
//             ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
//             : "N/A"}
//         </td>
//         <td className="py-2 px-2 sm:py-4 sm:px-4">
//           {order.orderItems.length}
//         </td>
//         <td className="py-2 px-2 sm:py-4 sm:px-4">
//           ${order.totalPrice.toFixed(2)}
//         </td>
//         <td className="py-2 px-2 sm:py-4 sm:px-4">
//           <span
//             className={`${
//               order.isPaid
//                 ? "text-green-500 bg-green-100"
//                 : "text-red-100 bg-red-700"
//             }`}
//           >
//             {order.isPaid ? "Paid" : "Pending"}
//           </span>
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
//         You have no orders
//       </td>
//     </tr>
//   )}
