'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface MarketplaceWorkflow {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  screenshots: string[];
  reviews: Review[];
  userId: string;
  userName: string;
  userAvatar: string;
}

export default function WorkflowDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Mock data - replace with actual data fetching
  const workflow: MarketplaceWorkflow = {
    id: params.id,
    name: 'Automated Data Processing',
    description: 'A powerful workflow for processing and analyzing large datasets. This workflow helps you automate your data processing tasks, saving you hours of manual work.',
    price: 29.99,
    category: 'Data',
    tags: ['data', 'automation', 'analysis'],
    rating: 4.5,
    reviewCount: 12,
    screenshots: ['/screenshots/workflow1.png'],
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        rating: 5,
        comment: 'This workflow saved me so much time! Highly recommended.',
        createdAt: '2024-03-15',
      },
    ],
    userId: 'user1',
    userName: 'Jane Smith',
    userAvatar: '/avatars/user1.png',
  };

  const handlePurchase = async () => {
    if (status !== 'authenticated') {
      router.push('/auth/signin');
      return;
    }

    setIsPurchasing(true);
    try {
      // Create a pending purchase record
      const response = await fetch('/api/marketplace/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowId: workflow.id,
          paymentToken: selectedToken,
          paymentAmount: workflow.price.toString(),
        }),
      });

      const { purchaseId } = await response.json();

      // Redirect to payment page with purchase details
      router.push(`/marketplace/payment/${purchaseId}`);
    } catch (error) {
      console.error('Purchase failed:', error);
      // Handle error appropriately
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{workflow.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{workflow.rating} ({workflow.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {workflow.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {workflow.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-48 object-cover rounded"
                />
              ))}
            </div>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-gray-600">{workflow.description}</p>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  {workflow.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={`/avatars/${review.userId}.png`} />
                            <AvatarFallback>{review.userName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.userName}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span>{review.rating}</span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-600">{review.comment}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>${workflow.price}</CardTitle>
              <CardDescription>One-time purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={workflow.userAvatar} />
                    <AvatarFallback>{workflow.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Created by</div>
                    <div>{workflow.userName}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Payment Token</Label>
                  <Select
                    value={selectedToken}
                    onValueChange={setSelectedToken}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handlePurchase}
                disabled={isPurchasing}
              >
                {status === 'authenticated'
                  ? isPurchasing
                    ? 'Processing...'
                    : 'Purchase Workflow'
                  : 'Sign in to Purchase'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 