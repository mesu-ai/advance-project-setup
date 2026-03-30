import { useEffect, useRef, useState, type RefObject } from 'react';
import type { SectionsKeyT, ProductFieldFocusT } from '../types';
import { productSteps } from '@/assets/data/productSteps';

type SectionsRef = RefObject<Record<SectionsKeyT, HTMLDivElement | null>>;

interface ProductStepperProps {
  fieldFocus: ProductFieldFocusT;
  hasCategory: boolean;
  sectionsRef: SectionsRef;
}

const ProductStepper = ({ fieldFocus, hasCategory, sectionsRef }: ProductStepperProps) => {
  const [step, setStep] = useState<number>(-1);

  const isScrollingRef = useRef(false);
  const scrollTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = (index: number) => {
    const key = productSteps[index]?.key;
    if (!key) return;

    isScrollingRef.current = true;
    setStep(index);

    sectionsRef.current[key]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    if (scrollTimeRef.current) clearTimeout(scrollTimeRef.current);
    scrollTimeRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = productSteps.findIndex(
              (s) => sectionsRef.current[s.key] === entry.target
            );
            if (index !== -1) {
              setStep(index);
            }
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    productSteps.forEach((s) => {
      const el = sectionsRef.current[s.key];
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeRef.current) clearTimeout(scrollTimeRef.current);
    };
  }, [hasCategory, sectionsRef]);

  return (
    <div className="bg-surface rounded-xl border border-border px-5 py-4">
      {!fieldFocus && !hasCategory && (
        <div>
          <h2 className="text-lg font-bold text-primary-500">Recommendations</h2>
          <p className="text-sm mt-3">
            Start by entering a product name and selecting a category. The full form sections will
            unlock once a category is chosen.
          </p>
        </div>
      )}

      {fieldFocus === 'productName' && !hasCategory && (
        <div>
          <h2 className="text-lg font-bold text-primary-500">Product Name</h2>
          <p className="text-sm mt-3">
            Start by entering a product name and selecting a category. The full form sections will
            unlock once a category is chosen.
          </p>
        </div>
      )}

      {fieldFocus === 'categoryId' && !hasCategory && (
        <div>
          <h2 className="text-lg font-bold text-primary-500">Product Category</h2>
          <p className="text-sm mt-3">
            Start by entering a product name and selecting a category. The full form sections will
            unlock once a category is chosen.
          </p>
        </div>
      )}

      {hasCategory && (
        <div>
          <h2 className="text-lg font-bold">Product Roadmap</h2>
          <ul className="text-sm mt-1 text-neutral-300">
            {productSteps.map((s, index) => {
              const isActive = step === index;
              return (
                <li
                  key={s.key}
                  className={`relative py-2 ${index > 0 ? 'after:absolute after:bg-neutral-100 after:-top-1/2 after:left-[7.5px] after:h-full after:w-[1px] after:content-[""]' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection(index)}
                    aria-current={isActive ? 'step' : undefined}
                    className="w-full flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <div
                      className={`bg-white z-10 p-1 rounded-full border ${isActive ? 'border-primary-500' : 'border-transparent'}`}
                    >
                      <div
                        className={`size-2 rounded-full ${isActive ? 'bg-primary-500' : 'bg-neutral-100 dark:bg-neutral-200'}`}
                      />
                    </div>
                    <span className={isActive ? 'text-primary-500' : ''}>{s.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {hasCategory && step >= 0 && productSteps[step] && (
        <div className="mt-4 border-t border-border pt-4">
          <h2 className="text-lg font-bold text-primary-500">{productSteps[step].name}</h2>
          <p className="text-sm mt-2 text-neutral-300">{productSteps[step].description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductStepper;
