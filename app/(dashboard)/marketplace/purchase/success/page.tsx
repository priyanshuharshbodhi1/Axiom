'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function PurchaseSuccessPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle>Purchase Successful!</CardTitle>
            <CardDescription>
              Thank you for your purchase. Your workflow has been added to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You can now access your purchased workflow from your dashboard.
            </p>
            <p className="text-gray-600">
              If you have any questions or need assistance, please contact our support team.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={() => router.push('/dashboard')}>
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push('/marketplace')}>
              Browse More Workflows
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 