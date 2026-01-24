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
