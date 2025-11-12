export interface Visitor {
  id: string;
  fullName: string;
  company: string;
  group: string;
  present: boolean;
}

export const GROUPS = ['Прохожий', 'Клиент', 'Партнер'] as const;
