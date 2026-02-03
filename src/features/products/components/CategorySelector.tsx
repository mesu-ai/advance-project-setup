import ArrowIcon from '@/assets/svg/ArrowIcon';
import Button from '@/components/atoms/Button';
import Radio from '@/components/atoms/Radio';
import SearchBar from '@/components/atoms/Search';
import SearchSelect from '@/components/molecules/SearchSelect';
import useLocalSearch from '@/hooks/useLocalSearch';
import useSearchKeyword from '@/hooks/useSearchKeyword';
import {
  useGetCategoriesQuery,
  useGetCategoryBySearchQuery,
} from '@/store/api/endpoints/categoryEndpoints';
import type {
  CategoryT,
  FirstChildT,
  SecondChildT,
  SelectedCategoryT,
  ThirdChildT,
} from '@/types/categories';
import { useCallback, useMemo, type ChangeEvent } from 'react';

const recentUsed: SelectedCategoryT[] = [
  {
    id: 4,
    name: 'Mens Panjabi',
    layer: {
      base: 'Clothing & Fashion',
      first: 'Mens',
      second: 'Mens Top Wear',
      third: 'Mens Panjabi',
    },
  },
  {
    id: 6,
    name: 'Mens Casual Shirt',
    layer: {
      base: 'Clothing & Fashion',
      first: 'Mens',
      second: 'Mens Top Wear',
      third: 'Mens Casual Shirt',
    },
  },
  {
    id: 531,
    name: 'Mens Jacket',
    layer: {
      base: 'Clothing & Fashion',
      first: 'Mens',
      second: 'Mens Top Wear',
      third: 'Mens Jacket',
    },
  },
  {
    id: 39,
    name: 'Saree',
    layer: {
      base: 'Clothing & Fashion',
      first: 'Womens',
      second: 'Womens Top Wear',
      third: 'Saree',
    },
  },
  {
    id: 446,
    name: 'Western',
    layer: {
      base: 'Clothing & Fashion',
      first: 'Womens',
      second: 'Western',
    },
  },
];

interface CategorySelectorProps {
  isOpen?: boolean;
  onClose?: () => void;
  selected: SelectedCategoryT;
  onSelected: (category: SelectedCategoryT) => void;
  onConfirm: (category: SelectedCategoryT) => void;
  suggession?: {
    enabled: boolean;
    options: SelectedCategoryT[];
  };
}

const CategorySelector = ({
  isOpen,
  onClose,
  onConfirm,
  selected,
  onSelected,
  suggession,
}: CategorySelectorProps) => {
  const { data: categoies, isLoading } = useGetCategoriesQuery('Category');

  const derivedChildren = useMemo(() => {
    if (!categoies?.data || !selected?.id) {
      return { first: [], second: [], third: [] };
    }

    const base = categoies?.data?.find((c: CategoryT) => c.categoryName === selected.layer.base);

    if (!base) return { first: [], second: [], third: [] };

    const first = base?.firstChildren?.find(
      (c: FirstChildT) => c.categoryName === selected.layer.first
    );

    // if (!first) return { first: base?.firstChildren, second: [], third: [] };

    const second = first?.secondChildren?.find(
      (c: SecondChildT) => c.categoryName === selected.layer.second
    );

    return {
      first: base?.firstChildren ?? [],
      second: first?.secondChildren ?? [],
      third: second?.thirdChild ?? [],
    };
  }, [categoies?.data, selected]);

  const firstChild = derivedChildren.first;
  const secondChild = derivedChildren.second;
  const thirdChild = derivedChildren.third;

  const getCategoryName = useCallback(
    (c: CategoryT | FirstChildT | SecondChildT | ThirdChildT) => c.categoryName,
    []
  );

  const baseSearch = useLocalSearch<CategoryT>(categoies?.data, getCategoryName, 200);
  const firstSearch = useLocalSearch<FirstChildT>(firstChild, getCategoryName, 200);
  const secondSearch = useLocalSearch<SecondChildT>(secondChild, getCategoryName, 200);
  const thirdSearch = useLocalSearch<ThirdChildT>(thirdChild, getCategoryName, 200);

  const { debouncedKeyword, setKeyword } = useSearchKeyword(500);

  const { data: searchCategories } = useGetCategoryBySearchQuery(
    { keyword: debouncedKeyword },
    { skip: !debouncedKeyword }
  );

  const handleBaseCategory = (category: CategoryT) => {
    onSelected({
      id: category.categoryId,
      name: category.categoryName,
      layer: {
        base: category.categoryName,
        first: '',
        second: '',
        third: '',
      },
    });
  };

  const handleFirstChild = (category: FirstChildT) => {
    onSelected({
      ...selected,
      id: category.categoryId,
      name: category.categoryName,
      layer: {
        ...selected.layer,
        first: category.categoryName,
        second: '',
        third: '',
      },
    });
  };

  const handleSecondChild = (category: SecondChildT) => {
    onSelected({
      ...selected,
      id: category.categoryId,
      name: category.categoryName,
      layer: {
        ...selected.layer,
        second: category.categoryName,
        third: '',
      },
    });
  };

  const handleThirdChild = (category: ThirdChildT) => {
    onSelected({
      ...selected,
      id: category.categoryId,
      name: category.categoryName,
      layer: {
        ...selected.layer,
        third: category.categoryName,
      },
    });
  };

  const handleCategorySelected = (category: SelectedCategoryT, setState = false) => {
    onConfirm(category);
    onClose?.();

    if (setState) onSelected(category);
  };

  const handleSuggestCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const suggestedCategory = suggession?.options.find((c) => c.id === Number(e.target.value));
    if (suggestedCategory) handleCategorySelected(suggestedCategory, true);
  };

  return (
    <div className="relative">
      <div className="mt-3 space-y-4">
        <div className="text-sm flex items-center gap-4">
          <p>Recently Used:</p>
          <ul className="text-neutral-300 flex gap-4">
            {recentUsed.map((item) => (
              <li
                key={item?.id}
                role="button"
                onClick={() => handleCategorySelected(item, true)}
                className="cursor-pointer rounded px-2 py-0.5 bg-white-600 w-fit hover:bg-secondary-50 hover:text-secondary-500"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {suggession?.enabled && (
          <div className="bg-background p-4 rounded-lg">
            <p className="mb-1">Category Suggessions</p>
            <Radio
              name="suggestedCatId"
              options={suggession.options}
              optionKeys={{ label: 'name', value: 'id' }}
              onChange={handleSuggestCategory}
              className="flex-col gap-y-2 text-neutral-300"
              required={false}
            />
          </div>
        )}
      </div>

      <div
        className={`absolute top-0 right-0 left-0 z-10 bg-surface border border-neutral-300 p-5 rounded-xl space-y-4 ${isOpen ? 'block' : 'hidden'}`}
      >
        <div>
          <SearchSelect
            onSelect={(c: SelectedCategoryT) => handleCategorySelected(c, true)}
            onChange={setKeyword}
            options={searchCategories?.data ?? []}
            optionKeys={{ label: 'name', value: 'id' }}
          />
        </div>
        <div className="text-sm flex items-center gap-4">
          <p>Recently Used:</p>
          <ul className="text-neutral-300 flex gap-4">
            {recentUsed.map((item) => (
              <li
                key={item?.id}
                role="button"
                onClick={() => handleCategorySelected(item, true)}
                className="cursor-pointer rounded px-2 py-0.5 bg-white-600 w-fit hover:bg-secondary-50 hover:text-secondary-500"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm border border-neutral-300 rounded-lg grid grid-cols-4 divide-x divide-neutral-300">
          <div>
            <SearchBar
              onSearch={baseSearch.setKeyword}
              className="rounded-none rounded-tl-lg border-0 border-b border-neutral-300"
            />
            <ul className="max-h-[320px] overflow-y-auto">
              {!isLoading &&
                baseSearch?.result?.map((category: CategoryT) => {
                  const isSelected = selected.layer?.base === category.categoryName;

                  return (
                    <li
                      role="button"
                      key={category.categoryId}
                      onClick={() => handleBaseCategory(category)}
                      className={`cursor-default flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500 ${isSelected && 'bg-primary-50 text-primary-500'}`}
                    >
                      {category?.categoryName} <ArrowIcon className="w-4 h-4 rotate-90" />
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <SearchBar
              disabled={!firstChild.length}
              onSearch={firstSearch.setKeyword}
              className="rounded-none border-0 border-b border-neutral-300"
            />
            <ul className="max-h-[320px] overflow-y-auto">
              {firstSearch?.result?.map((category: FirstChildT) => {
                const isSelected = selected.layer?.first === category.categoryName;
                return (
                  <li
                    role="button"
                    key={category.categoryId}
                    onClick={() => handleFirstChild(category)}
                    className={`cursor-default flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500 ${isSelected && 'bg-primary-50 text-primary-500'}`}
                  >
                    {category?.categoryName}
                    {category.secondChildren.length > 0 && (
                      <ArrowIcon className="w-4 h-4 rotate-90" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <SearchBar
              disabled={!secondChild.length}
              onSearch={secondSearch?.setKeyword}
              className="rounded-none border-0 border-b border-neutral-300"
            />
            <ul className="max-h-[320px] overflow-y-auto">
              {secondSearch?.result?.map((category: SecondChildT) => {
                const isSelected = selected.layer?.second === category.categoryName;
                return (
                  <li
                    role="button"
                    key={category.categoryId}
                    onClick={() => handleSecondChild(category)}
                    className={`cursor-default flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500 ${isSelected && 'bg-primary-50 text-primary-500'}`}
                  >
                    {category?.categoryName}{' '}
                    {category.thirdChild.length > 0 && <ArrowIcon className="w-4 h-4 rotate-90" />}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <SearchBar
              disabled={!thirdChild.length}
              onSearch={thirdSearch.setKeyword}
              className="rounded-none rounded-tr-lg border-0 border-b border-neutral-300"
            />
            <ul className="max-h-[320px] overflow-y-auto">
              {thirdSearch?.result?.map((category: ThirdChildT) => {
                const isSelected = selected.layer?.third === category.categoryName;
                return (
                  <li
                    role="button"
                    key={category.categoryId}
                    onClick={() => handleThirdChild(category)}
                    className={`cursor-default flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500 ${isSelected && 'bg-primary-50 text-primary-500'}`}
                  >
                    {category?.categoryName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <p>
            Selected Category :{' '}
            {selected.layer?.base ? (
              <span className="px-2.5 py-1 rounded bg-secondary-500 text-white text-sm">
                {selected.layer?.base && `${selected.layer?.base}`}{' '}
                {selected.layer?.first && `> ${selected.layer?.first}`}{' '}
                {selected.layer?.second && `> ${selected.layer?.second}`}{' '}
                {selected.layer?.third && `> ${selected.layer?.third}`}
              </span>
            ) : (
              '---'
            )}
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="cancel" onClick={() => onClose?.()}>
            Cancel
          </Button>
          <Button
            variant="confirm"
            disabled={!selected.layer?.base}
            onClick={() => handleCategorySelected(selected)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
