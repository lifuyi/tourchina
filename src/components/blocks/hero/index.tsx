import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HappyUsers from "./happy-users";
import HeroBg from "./bg";
import { Hero as HeroType } from "@/types/blocks/hero";
import Icon from "@/components/icon";
import { Link } from "@/i18n/navigation";

export default function Hero({ hero }: { hero: HeroType }) {
  if (hero.disabled) {
    return null;
  }

  const highlightText = hero.highlight_text;
  let texts = null;
  if (highlightText) {
    texts = hero.title?.split(highlightText, 2);
  }

  return (
    <>
      <HeroBg />
      <section className="py-24">
        <div className="container">
          {hero.show_badge && (
            <div className="flex items-center justify-center mb-8">
              <img
                src="/imgs/badges/phdaily.svg"
                alt="phdaily"
                className="h-10 object-cover"
              />
            </div>
          )}
          <div className="text-center">
            {hero.announcement && (
              <Link
                href={hero.announcement.url as any}
                className="mx-auto mb-3 inline-flex items-center gap-3 rounded-full border px-2 py-1 text-sm"
              >
                {hero.announcement.label && (
                  <Badge>{hero.announcement.label}</Badge>
                )}
                {hero.announcement.title}
              </Link>
            )}

            {texts && texts.length > 1 ? (
              <h1 className="mx-auto mb-3 mt-4 max-w-6xl text-balance text-4xl font-bold lg:mb-7 lg:text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {texts[0]}
                <span className="bg-linear-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
                  {highlightText}
                </span>
                {texts[1]}
              </h1>
            ) : (
              <h1 className="mx-auto mb-3 mt-4 max-w-6xl text-balance text-4xl font-bold lg:mb-7 lg:text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {hero.title}
              </h1>
            )}

            <p
              className="m mx-auto max-w-3xl text-muted-foreground lg:text-xl"
              dangerouslySetInnerHTML={{ __html: hero.description || "" }}
            />
            {hero.buttons && (
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                {hero.buttons.map((item, i) => {
                  return (
                    <Link
                      key={i}
                      href={item.url as any}
                      target={item.target || ""}
                      className="flex items-center"
                    >
                      <Button
                        className="w-full"
                        size="lg"
                        variant={item.variant || "default"}
                      >
                        {item.icon && <Icon name={item.icon} className="" />}
                        {item.title}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}
            {hero.tip && (
              <p className="mt-8 text-md text-muted-foreground">{hero.tip}</p>
            )}
            {hero.show_happy_users && <HappyUsers />}
            
            {/* Hero Images Grid - China Travel Showcase */}
            <div className="mt-16 lg:mt-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {/* Large featured image */}
                <div className="col-span-2 row-span-2">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl h-full">
                    <img
                      src="/imgs/showcases/1.png"
                      alt="China Travel - Great Wall"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Top right images */}
                <div className="col-span-1">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg h-32 md:h-48">
                    <img
                      src="/imgs/showcases/2.png"
                      alt="China Travel - Shanghai"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg h-32 md:h-48">
                    <img
                      src="/imgs/showcases/3.png"
                      alt="China Travel - Transportation"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Bottom right images */}
                <div className="col-span-1">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg h-32 md:h-48">
                    <img
                      src="/imgs/showcases/4.png"
                      alt="China Travel - Food"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg h-32 md:h-48">
                    <img
                      src="/imgs/showcases/5.png"
                      alt="China Travel - Culture"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              
              <p className="mt-8 text-sm text-muted-foreground">
                Real photos from our September 2024 trip to China
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
