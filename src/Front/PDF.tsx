import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type {
  InvoiceDetails,
  InvoiceItems,
} from "./context/RecuderTypes/InvoiceReduce";
import type { Client } from "./context/RecuderTypes/ClientsReduce";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "1px solid #000",
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 1,
  },

  invoiceId: {
    fontSize: 9,
    color: "#666",
    marginTop: 4,
  },

  grid2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  box: {
    width: "48%",
    padding: 8,
    border: "1px solid #ddd",
  },

  boxTitle: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 6,
  },

  text: {
    fontSize: 8,
    marginBottom: 2,
  },

  tableHeader: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    paddingBottom: 6,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    paddingVertical: 5,
  },

  colProduct: {
    flex: 4,
    fontSize: 8,
  },

  colQty: {
    flex: 1,
    fontSize: 8,
    textAlign: "right",
  },

  colPrice: {
    flex: 2,
    fontSize: 8,
    textAlign: "right",
  },

  colTotal: {
    flex: 2,
    fontSize: 8,
    textAlign: "right",
    fontWeight: 700,
  },

  totals: {
    marginTop: 20,
    padding: 10,
    border: "1px solid #ddd",
    backgroundColor: "#F7F9FC",
    width: "50%",
    marginLeft: "50%",
  },

  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    fontSize: 9,
  },

  totalFinal: {
    marginTop: 6,
    paddingTop: 6,
    borderTop: "1px solid #000",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    fontWeight: 700,
  },
});
type Props = {
  invoiceDetails: InvoiceDetails;
  client: Client
};

export function InvoiceDocument({ invoiceDetails, client }: Props) {
  const calculateTotal = (arr: InvoiceItems[]) =>
    arr.reduce((acc, item) => acc + item.quantity * item.sales_price, 0);

  const subtotal = calculateTotal(invoiceDetails.itemsList);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>FACTURA</Text>
            <Text style={styles.invoiceId}>
              Numero de factura: {invoiceDetails.id}
            </Text>
          </View>
        </View>

        {/* CLIENTE / EMPRESA */}
        <View style={styles.grid2}>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>CLIENTE</Text>
            <Text style={styles.text}>{client.name || 'Nombre'}</Text>
            <Text style={styles.text}>{client.emailAddress || 'Correo Electronico'}</Text>
            <Text style={styles.text}>{client.phoneNumber || 'Telefono Movil'}</Text>
            <Text style={styles.text}>{client.address || 'Dirrección'}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>EMPRESA</Text>
            <Text style={styles.text}>Nombre</Text>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.text}>Teléfono</Text>
            <Text style={styles.text}>Dirección</Text>
          </View>
        </View>

        {/* TABLE HEADER */}
        <View style={styles.tableHeader}>
          <Text style={styles.colProduct}>Producto</Text>
          <Text style={styles.colQty}>Cant.</Text>
          <Text style={styles.colPrice}>Precio</Text>
          <Text style={styles.colTotal}>Total</Text>
        </View>

        {/* ITEMS */}
        {invoiceDetails.itemsList.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.colProduct}>{item.name}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>{item.sales_price}</Text>
            <Text style={styles.colTotal}>
              {item.quantity * item.sales_price}
            </Text>
          </View>
        ))}

        {/* TOTALES */}
        <View style={styles.totals}>
          <View style={styles.totalLine}>
            <Text>Subtotal</Text>
            <Text>{subtotal.toFixed(2)} €</Text>
          </View>

          <View style={styles.totalLine}>
            <Text>IVA (21%)</Text>
            <Text>{iva.toFixed(2)} €</Text>
          </View>

          <View style={styles.totalFinal}>
            <Text>TOTAL: {total.toFixed(2)} €</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
