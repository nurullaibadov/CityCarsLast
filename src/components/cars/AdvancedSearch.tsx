import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterOptions {
    priceRange: [number, number];
    carTypes: string[];
    features: string[];
    transmission: string[];
    fuelType: string[];
}

interface AdvancedSearchProps {
    onSearch: (query: string, filters: FilterOptions) => void;
}

const carTypes = ['Sedan', 'SUV', 'Luxury', 'Economy', 'Sports', 'Van'];
const features = ['GPS', 'Bluetooth', 'Sunroof', 'Leather Seats', 'Backup Camera', 'Heated Seats'];
const transmissions = ['Automatic', 'Manual'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FilterOptions>({
        priceRange: [0, 500],
        carTypes: [],
        features: [],
        transmission: [],
        fuelType: [],
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleSearch = () => {
        onSearch(searchQuery, filters);
    };

    const handlePriceChange = (value: number[]) => {
        setFilters({ ...filters, priceRange: [value[0], value[1]] });
    };

    const toggleArrayFilter = (category: keyof FilterOptions, value: string) => {
        const currentArray = filters[category] as string[];
        const newArray = currentArray.includes(value)
            ? currentArray.filter(item => item !== value)
            : [...currentArray, value];
        setFilters({ ...filters, [category]: newArray });
    };

    const clearFilters = () => {
        setFilters({
            priceRange: [0, 500],
            carTypes: [],
            features: [],
            transmission: [],
            fuelType: [],
        });
    };

    const activeFilterCount =
        filters.carTypes.length +
        filters.features.length +
        filters.transmission.length +
        filters.fuelType.length;

    return (
        <div className="w-full">
            <div className="flex gap-2">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by car name, brand, or model..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-10 h-12 bg-background border-border"
                    />
                </div>

                {/* Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="h-12 px-4 relative">
                            <SlidersHorizontal className="w-5 h-5 mr-2" />
                            Filters
                            {activeFilterCount > 0 && (
                                <Badge className="ml-2 bg-accent text-accent-foreground">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Advanced Filters</SheetTitle>
                            <SheetDescription>
                                Refine your search with detailed filters
                            </SheetDescription>
                        </SheetHeader>

                        <div className="mt-6 space-y-6">
                            {/* Price Range */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <Label className="text-base font-semibold">Price Range (per day)</Label>
                                    <span className="text-sm text-muted-foreground">
                                        ${filters.priceRange[0]} - ${filters.priceRange[1]}
                                    </span>
                                </div>
                                <Slider
                                    min={0}
                                    max={500}
                                    step={10}
                                    value={filters.priceRange}
                                    onValueChange={handlePriceChange}
                                    className="mb-2"
                                />
                            </div>

                            {/* Car Types */}
                            <div>
                                <Label className="text-base font-semibold mb-3 block">Car Type</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {carTypes.map((type) => (
                                        <div key={type} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`type-${type}`}
                                                checked={filters.carTypes.includes(type)}
                                                onCheckedChange={() => toggleArrayFilter('carTypes', type)}
                                            />
                                            <label
                                                htmlFor={`type-${type}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Transmission */}
                            <div>
                                <Label className="text-base font-semibold mb-3 block">Transmission</Label>
                                <div className="space-y-2">
                                    {transmissions.map((trans) => (
                                        <div key={trans} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`trans-${trans}`}
                                                checked={filters.transmission.includes(trans)}
                                                onCheckedChange={() => toggleArrayFilter('transmission', trans)}
                                            />
                                            <label
                                                htmlFor={`trans-${trans}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {trans}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fuel Type */}
                            <div>
                                <Label className="text-base font-semibold mb-3 block">Fuel Type</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {fuelTypes.map((fuel) => (
                                        <div key={fuel} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`fuel-${fuel}`}
                                                checked={filters.fuelType.includes(fuel)}
                                                onCheckedChange={() => toggleArrayFilter('fuelType', fuel)}
                                            />
                                            <label
                                                htmlFor={`fuel-${fuel}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {fuel}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <Label className="text-base font-semibold mb-3 block">Features</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {features.map((feature) => (
                                        <div key={feature} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`feature-${feature}`}
                                                checked={filters.features.includes(feature)}
                                                onCheckedChange={() => toggleArrayFilter('features', feature)}
                                            />
                                            <label
                                                htmlFor={`feature-${feature}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {feature}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    onClick={clearFilters}
                                    className="flex-1"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Clear All
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleSearch();
                                        setIsFilterOpen(false);
                                    }}
                                    className="flex-1 accent-gradient text-accent-foreground"
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Search Button */}
                <Button onClick={handleSearch} className="h-12 px-6 accent-gradient text-accent-foreground">
                    Search
                </Button>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {filters.carTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="gap-1">
                            {type}
                            <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => toggleArrayFilter('carTypes', type)}
                            />
                        </Badge>
                    ))}
                    {filters.transmission.map((trans) => (
                        <Badge key={trans} variant="secondary" className="gap-1">
                            {trans}
                            <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => toggleArrayFilter('transmission', trans)}
                            />
                        </Badge>
                    ))}
                    {filters.fuelType.map((fuel) => (
                        <Badge key={fuel} variant="secondary" className="gap-1">
                            {fuel}
                            <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => toggleArrayFilter('fuelType', fuel)}
                            />
                        </Badge>
                    ))}
                    {filters.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="gap-1">
                            {feature}
                            <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => toggleArrayFilter('features', feature)}
                            />
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdvancedSearch;
