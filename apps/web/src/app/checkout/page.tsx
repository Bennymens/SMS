import { redirect } from 'next/navigation';

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  return redirect('/payout');
}
