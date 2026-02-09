interface CategoryBaseT {
  categoryId: number;
  categoryName: string;
  imagePath?: string;
  slug?: string;
  url?: string;
}

export type ThirdChildT = CategoryBaseT & {};
export type SecondChildT = CategoryBaseT & { thirdChild: ThirdChildT[] };
export type FirstChildT = CategoryBaseT & { secondChildren: SecondChildT[] };

export type CategoryT = CategoryBaseT & { firstChildren: FirstChildT[] };

interface CategotyLayerT {
  base: string;
  first?: string;
  second?: string;
  third?: string;
}

export interface SelectedCategoryT {
  id: number | null;
  name: string;
  layer: CategotyLayerT;
}
