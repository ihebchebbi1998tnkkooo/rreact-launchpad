export interface PackContainer {
  id: string;
  title: string;
  maxItems: number;
}

export interface PackConfig {
  id: string;
  name: string;
  description: string;
  containers: PackContainer[];
}

export const packConfigurations: Record<string, PackConfig> = {
  'pack-premium': {
    id: 'pack-premium',
    name: 'Pack Premium',
    description: 'Notre pack premium avec deux emplacements',
    containers: [
      {
        id: 'principal',
        title: 'Pack Principal',
        maxItems: 2
      },
      {
        id: 'secondary1',
        title: 'Pack Secondaire 1',
        maxItems: 1
      }
    ]
  },
  'pack-trio': {
    id: 'pack-trio',
    name: 'Pack Trio',
    description: 'Pack trio avec trois emplacements',
    containers: [
      {
        id: 'principal',
        title: 'Pack Principal',
        maxItems: 3
      },
      {
        id: 'secondary1',
        title: 'Pack Secondaire 1',
        maxItems: 1
      },
      {
        id: 'secondary2',
        title: 'Pack Secondaire 2',
        maxItems: 1
      }
    ]
  },
  'pack-prestige': {
    id: 'pack-prestige',
    name: 'Pack Prestige',
    description: 'Pack prestige avec configuration spéciale',
    containers: [
      {
        id: 'principal',
        title: 'Pack Principal',
        maxItems: 4
      },
      {
        id: 'secondary1',
        title: 'Pack Secondaire 1',
        maxItems: 2
      },
      {
        id: 'secondary2',
        title: 'Pack Secondaire 2',
        maxItems: 2
      }
    ]
  }
};

export const getPackConfig = (packId: string): PackConfig => {
  const config = packConfigurations[packId];
  if (!config) {
    throw new Error(`Pack configuration not found for ID: ${packId}`);
  }
  return config;
};