'use client';

import { useState } from 'react';
import { Search, Filter, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';

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
  userId: string;
}

async function fetchWorkflows(search: string, category: string, sortBy: string) {
  const params = new URLSearchParams({
    search,
    category,
    sortBy,
  });
  const response = await fetch(`/api/workflows/marketplace?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch workflows');
  }
  return response.json();
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const { data: workflows = [], isLoading, error } = useQuery({
    queryKey: ['workflows', searchQuery, category, sortBy],
    queryFn: () => fetchWorkflows(searchQuery, category, sortBy),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Workflow Marketplace</h1>
          <Button>List Your Workflow</Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Data">Data</SelectItem>
              <SelectItem value="Automation">Automation</SelectItem>
              <SelectItem value="Integration">Integration</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load workflows. Please try again later.
          </div>
        ) : workflows.length === 0 ? (
          <div className="text-center text-gray-500">
            No workflows found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow: MarketplaceWorkflow) => (
              <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{workflow.name}</CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{workflow.rating.toFixed(1)} ({workflow.reviewCount} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${workflow.price}</span>
                  <Button>Available for Purchase Soon</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
