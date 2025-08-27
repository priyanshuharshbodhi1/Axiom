'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';

interface PurchaseDetails {
  id: string;
  workflowId: string;
  price: number;
  paymentToken: string;
  paymentAmount: string;
  status: string;
  workflow: {
    name: string;
    description: string;
  };
}

export default function PaymentPage({ params }: { params: { purchaseId: string } }) {
  const router = useRouter();
  const [purchase, setPurchase] = useState<PurchaseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await fetch(`/api/marketplace/purchases/${params.purchaseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch purchase details');
        }
        const data = await response.json();
        setPurchase(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchase();
  }, [params.purchaseId]);

  const handleCopyAddress = () => {
    if (purchase) {
      navigator.clipboard.writeText('0x...'); // Replace with actual payment address
    }
  };

  const handleConfirmPayment = async () => {
    try {
      const response = await fetch(`/api/marketplace/purchases/${params.purchaseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'COMPLETED',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }

      router.push('/marketplace/purchase/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to confirm payment');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error || !purchase) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error || 'Purchase not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <CardDescription>
              Send {purchase.paymentAmount} {purchase.paymentToken} to complete your purchase of {purchase.workflow.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Payment Address</Label>
              <div className="flex gap-2">
                <Input
                  value="0x..." // Replace with actual payment address
                  readOnly
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyAddress}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                value={`${purchase.paymentAmount} ${purchase.paymentToken}`}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label>Workflow</Label>
              <Input
                value={purchase.workflow.name}
                readOnly
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleConfirmPayment}>
              I have Sent the Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 