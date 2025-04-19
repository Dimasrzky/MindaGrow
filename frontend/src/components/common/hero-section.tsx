import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  imageUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Personalized Learning for Every Child",
  subtitle = "MindaGrow combines AI-powered education with gamification to adapt to your child's unique abilities and learning style.",
  primaryButtonText = "Get Started",
  primaryButtonLink = "/register",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "/about",
  imageUrl = "/images/hero.png",
}) => {
  return (
    <div className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="container relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div className="lg:py-24">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl">
                <span className="block">{title}</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg">
                {subtitle}
              </p>
              <div className="mt-8 sm:mt-12 space-x-4">
                <Button asChild size="lg">
                  <Link href={primaryButtonLink}>{primaryButtonText}</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <div className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none">
                <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-full">
                  <Image
                    src={imageUrl}
                    alt="Children learning with MindaGrow"
                    fill
                    className="object-cover rounded-xl shadow-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};