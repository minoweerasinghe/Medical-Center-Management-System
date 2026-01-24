"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface FeatureCardProps {
  title: string
  description: string
  buttonText: string
  imageSrc: string
  imageAlt: string
  href: string
}

export function FeatureCard({ title, description, buttonText, imageSrc, imageAlt, href }: FeatureCardProps) {
  const router = useRouter()

  return (
    <section className="w-full max-w-2xl mx-auto border-t border-border py-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Button
            variant="outline"
            className="rounded-md border-foreground text-foreground hover:bg-muted bg-transparent"
            onClick={() => router.push(href)}
          >
            {buttonText}
          </Button>
        </div>
        <div className="w-40 h-28 flex-shrink-0">
          <img src={imageSrc || "/placeholder.svg"} alt={imageAlt} className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
    </section>
  )
}
