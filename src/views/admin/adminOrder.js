// document.addEventListener('DOMContentLoaded', () => {
//   const orderBody = document.getElementById('orderBody');
//   const search = document.getElementById('search');
//   let orderData = [
//     {
//       orderNumber: '1',
//       status: '주문완료',
//       orderDate: '2023-10-03 12:02:11',
//       phoneNumber: '010-0000-0000',
//       amount: '30,000',
//       deliveryStatus: '배송완료',
//     },
//     {
//       orderNumber: '2',
//       status: '배송중',
//       orderDate: '2023-10-04 12:03:11',
//       phoneNumber: '010-1111-1111',
//       amount: '40,000',
//       deliveryStatus: '배송중',
//     },
//   ];

//   function loadTable(data) {
//     console.log(orderData);
//     console.log(orderBody);
//     orderBody.innerHTML = data
//       .map(
//         (order, index) => `
//       <tr ${index % 2 === 0 ? 'class="even"' : ''}>
//         <td>${order.orderNumber}</td>
//         <td>${order.status}</td>
//         <td>${order.orderDate}</td>
//         <td>${order.phoneNumber}</td>
//         <td>${order.amount}</td>
//         <td>
//           <select onchange="updateDeliveryStatus('${
//             order.orderNumber
//           }', this.value)">
//             <option value="배송중" ${
//               order.deliveryStatus === '배송중' ? 'selected' : ''
//             }>배송중</option>
//             <option value="배송완료" ${
//               order.deliveryStatus === '배송완료' ? 'selected' : ''
//             }>배송완료</option>
//           </select>
//         </td>
//         <td>
//           <button onclick="cancelOrder('${order.orderNumber}')">X</button>
//         </td>
//       </tr>
//     `
//       )
//       .join('');

//     console.log(orderBody);
//   }

//   function updateDeliveryStatus(orderNumber, status) {
//     // Your logic for updating the delivery status goes here
//   }

//   window.cancelOrder = function (orderNumber) {
//     if (confirm('판매를 취소하시겠습니까?')) {
//       orderData = orderData.map((order) =>
//         order.orderNumber === orderNumber
//           ? { ...order, status: '판매취소' }
//           : order
//       );
//       loadTable(orderData);
//     }
//   };

//   search.addEventListener('input', (e) => {
//     const filteredData = orderData.filter((order) =>
//       order.orderNumber.includes(e.target.value)
//     );
//     loadTable(filteredData);
//   });

//   loadTable(orderData);
// });

let orderDataArray;
const orderBody = document.getElementById('orderBody');
const search = document.getElementById('search');

document.addEventListener('DOMContentLoaded', () => {
  orderDataArray = [
    {
      orderNumber: '1',
      status: '주문완료',
      orderDate: '2023-10-03 12:02:11',
      phoneNumber: '010-0000-0000',
      amount: '30,000',
      deliveryStatus: '배송완료',
    },
    {
      orderNumber: '2',
      status: '배송중',
      orderDate: '2023-10-04 12:03:11',
      phoneNumber: '010-1111-1111',
      amount: '40,000',
      deliveryStatus: '배송중',
    },
  ];
  renderOrderData();
});

function renderOrderData() {
  orderBody.innerHTML = ''; // Clear the existing rows
  console.log(orderDataArray);
  orderDataArray.forEach((order, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    ${index % 2 === 0 ? 'class="even"' : ''}>
      <td>${order.orderNumber}</td>
      <td>${order.status}</td>
      <td>${order.orderDate}</td>
      <td>${order.phoneNumber}</td>
      <td>${order.amount}</td>
      <td>
        <select onchange="updateDeliveryStatus('${
          order.orderNumber
        }', this.value)">
          <option value="배송중" ${
            order.deliveryStatus === '배송중' ? 'selected' : ''
          }>배송중</option>
          <option value="배송완료" ${
            order.deliveryStatus === '배송완료' ? 'selected' : ''
          }>배송완료</option>
        </select>
      </td>
      <td>
        <button onclick="cancelOrder('${order.orderNumber}')">X</button>
      </td>
    `;
    orderBody.appendChild(row);
  });
}
