import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
import { toast } from "react-hot-toast";

const Payments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  const InvoicePDF = ({ payment }) => (
    <Document>
      <Page style={styles.page}>
        <Text>Invoice ID: {payment._id}</Text>
        <Text>User: {payment.userName}</Text>
        <Text>Amount: {payment.amount} TK</Text>
        <Text>Date: {new Date(payment.date).toLocaleString()}</Text>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: { padding: 20 },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Payments</h1>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">{p.userName}</td>
              <td className="border p-2">{p.amount}</td>
              <td className="border p-2">{new Date(p.date).toLocaleString()}</td>
              <td className="border p-2">
                <PDFDownloadLink
                  document={<InvoicePDF payment={p} />}
                  fileName={`invoice-${p._id}.pdf`}
                >
                  {({ loading }) => (loading ? "Loading..." : "Download")}
                </PDFDownloadLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
