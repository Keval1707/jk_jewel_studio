import React from "react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

const InvoicePrint = ({ order }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "", "width=900,height=650");

    const htmlContent = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2, h3 { margin-bottom: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .totals td { font-weight: bold; }
            .header { display: flex; justify-content: space-between; align-items: center; }
            .company-details { text-align: right; }
            .company-name { font-size: 1.4em; font-weight: bold; }
            .address, .info { margin-top: 20px; }
            .footer { margin-top: 40px; text-align: center; font-size: 0.9em; color: #777; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>Invoice</h1>
              <div><strong>Invoice No.:</strong> ${order._id}</div>
              <div><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="company-details">
              <div class="company-name">jk jewel studio Pvt. Ltd.</div>
              <div>Nikol, Ahmedabad</div>
              <div>Gujrat- 380001</div>
              <div>GSTIN: 29ABCDE1234F2Z5</div>
              <div>Phone: +91-9876543210</div>
              <div>Email: support@jkjewelstudio.in</div>
            </div>
          </div>

          <div class="info">
            <strong>Billed To:</strong><br />
            ${order.user?.name}<br />
            ${order.user?.phone || ""}<br />
            ${order.user?.email || ""}
          </div>

          <div class="address">
            <strong>Shipping Address:</strong><br />
            ${order.user?.address?.street},<br/>
            ${order.user?.address?.city}, ${order.user?.address?.postalCode},<br/>
            ${order.user?.address?.country}
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.product?.name || "Product Deleted"}</td>
                  <td>${item.product?.sku || "N/A"}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.discountedPrice)}</td>
                  <td>${formatCurrency(item.discountedPrice * item.quantity)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr class="totals">
                <td colspan="5" style="text-align:right;">Order Total</td>
                <td>${formatCurrency(order.totalAmount)}</td>
              </tr>
              <tr class="totals">
                <td colspan="5" style="text-align:right;">Delivery Fee</td>
                <td>${formatCurrency(order.deliveryFee)}</td>
              </tr>
              <tr class="totals">
                <td colspan="5" style="text-align:right;">GST (18%)</td>
                <td>${formatCurrency(order.gstAmount)}</td>
              </tr>
              <tr class="totals">
                <td colspan="5" style="text-align:right;">Grand Total</td>
                <td>${formatCurrency(order.grandTotal)}</td>
              </tr>
            </tfoot>
          </table>

          <div class="footer">
            Thank you for your purchase!<br/>
            This is a system-generated invoice.
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <button
      onClick={handlePrint}
      style={{
        backgroundColor: "#2ecc71",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "10px",
      }}
    >
      Print Invoice
    </button>
  );
};

export default InvoicePrint;
