import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { demoCopy, useLocale } from '@/shared/lib/i18n';

export const Footer: React.FC = () => {
  const locale = useLocale();
  const copy = demoCopy[locale].footer;

  return (
    <footer className="mt-auto border-t border-stone-300 bg-[#f7f5f0] py-12 pb-24 md:pb-12">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Social Links */}
        <div className="mb-10 flex justify-center gap-4">
          <a href="#" className="flex h-10 w-10 items-center justify-center border border-stone-300 bg-white text-stone-600 transition-colors hover:border-stone-950 hover:text-stone-950">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="flex h-10 w-10 items-center justify-center border border-stone-300 bg-white text-stone-600 transition-colors hover:border-stone-950 hover:text-stone-950">
            <Youtube className="h-5 w-5" />
          </a>
          <a href="#" className="flex h-10 w-10 items-center justify-center border border-stone-300 bg-white text-stone-600 transition-colors hover:border-stone-950 hover:text-stone-950">
            <Facebook className="h-5 w-5" />
          </a>
        </div>

        {/* Links */}
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {copy.sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold text-stone-950">{section.title}</h3>
              <ul className="space-y-2 text-sm text-stone-500">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-stone-950">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-stone-950">{copy.helpTitle}</h3>
            <p className="mb-2 font-serif text-3xl text-stone-950">1588-0000</p>
            <p className="text-xs leading-5 text-stone-500">
              {copy.helpHours.split('\n').map((line) => (
                <React.Fragment key={line}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="border-t border-stone-300 pt-8">
          <div className="mb-5 space-y-1 text-xs text-stone-500">
            {copy.companyLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="text-center text-xs text-stone-500">
            {copy.copyright}
          </p>
          <p className="mt-2 text-center text-xs text-stone-500">
            <a
              href="/assets/products/ATTRIBUTIONS.txt"
              className="underline underline-offset-4 transition-colors hover:text-stone-950"
            >
              {copy.imageCredits}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
