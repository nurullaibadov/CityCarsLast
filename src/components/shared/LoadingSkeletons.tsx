import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const CarCardSkeleton: React.FC = () => {
    return (
        <Card className="card-gradient border-border overflow-hidden">
            <CardContent className="p-0">
                {/* Image Skeleton */}
                <div className="h-48 bg-secondary/50 animate-pulse"></div>

                {/* Content Skeleton */}
                <div className="p-6 space-y-4">
                    {/* Badge */}
                    <div className="h-5 w-20 bg-secondary/50 rounded animate-pulse"></div>

                    {/* Title */}
                    <div className="h-6 w-3/4 bg-secondary/50 rounded animate-pulse"></div>

                    {/* Features */}
                    <div className="flex gap-4">
                        <div className="h-4 w-16 bg-secondary/50 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-secondary/50 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-secondary/50 rounded animate-pulse"></div>
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="h-8 w-24 bg-secondary/50 rounded animate-pulse"></div>
                        <div className="h-10 w-28 bg-secondary/50 rounded animate-pulse"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const ProfileSkeleton: React.FC = () => {
    return (
        <Card className="card-gradient border-border">
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-secondary/50 animate-pulse"></div>

                    <div className="flex-1 space-y-2">
                        {/* Name */}
                        <div className="h-5 w-32 bg-secondary/50 rounded animate-pulse"></div>
                        {/* Email */}
                        <div className="h-4 w-48 bg-secondary/50 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                    <div className="h-4 w-full bg-secondary/50 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-secondary/50 rounded animate-pulse"></div>
                    <div className="h-4 w-4/6 bg-secondary/50 rounded animate-pulse"></div>
                </div>
            </CardContent>
        </Card>
    );
};

export const TableSkeleton: React.FC = () => {
    return (
        <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="w-12 h-12 rounded bg-secondary/50 animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 bg-secondary/50 rounded animate-pulse"></div>
                        <div className="h-3 w-1/2 bg-secondary/50 rounded animate-pulse"></div>
                    </div>
                    <div className="h-8 w-20 bg-secondary/50 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    );
};

export const DetailPageSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
                <div className="h-8 w-48 bg-secondary/50 rounded animate-pulse"></div>
                <div className="h-6 w-96 bg-secondary/50 rounded animate-pulse"></div>
            </div>

            {/* Main Image */}
            <div className="h-96 bg-secondary/50 rounded-lg animate-pulse"></div>

            {/* Thumbnails */}
            <div className="flex gap-2">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-20 h-20 bg-secondary/50 rounded animate-pulse"></div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-32 bg-secondary/50 rounded-lg animate-pulse"></div>
                    ))}
                </div>
                <div className="h-64 bg-secondary/50 rounded-lg animate-pulse"></div>
            </div>
        </div>
    );
};

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
    return (
        <div className="space-y-4">
            {[...Array(count)].map((_, index) => (
                <div key={index} className="h-24 bg-secondary/50 rounded-lg animate-pulse"></div>
            ))}
        </div>
    );
};

export const FormSkeleton: React.FC = () => {
    return (
        <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-2">
                    <div className="h-4 w-24 bg-secondary/50 rounded animate-pulse"></div>
                    <div className="h-10 w-full bg-secondary/50 rounded animate-pulse"></div>
                </div>
            ))}
            <div className="h-10 w-32 bg-secondary/50 rounded animate-pulse"></div>
        </div>
    );
};
