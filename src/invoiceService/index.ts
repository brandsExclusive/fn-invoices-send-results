import fetch from "node-fetch";
import { getToken } from "../authService";
import { API_HOST } from "../config";
import { ProcessedResult } from "../types";

class InvoiceServiceHTTPError extends Error {}

export async function sendInvoiceData(
  invoiceData: ProcessedResult,
  vendorDomain: string
): Promise<void> {
  const token = await getToken();

  const options = {
    method: "POST",
    body: JSON.stringify(invoiceData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  const destination = `${API_HOST}/api/invoices/flights/${vendorDomain}`;

  console.log(`Sending processed data of ${vendorDomain} to svc-invoice`);
  const response = await fetch(destination, options);

  if (!response.ok) {
    throw new InvoiceServiceHTTPError(
      `${response.status} ${response.statusText} error fetching ${destination}`
    );
  }
}
