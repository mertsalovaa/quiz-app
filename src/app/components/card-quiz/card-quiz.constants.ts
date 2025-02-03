export enum CardColors {
  SUCCESS = 'success',
  ERROR = 'error',
  ACCENT = 'accent',
  BRIGHT = 'bright',
  WARNING = 'warning',
}

export interface CardItemStyle {
  icon: string;
  bgColor: string;
  textColor: string;
}

export const cardItemStyles: Record<CardColors, CardItemStyle> = {
  [CardColors.ACCENT]: {
    icon: 'avatars/Profile-1.svg',
    bgColor: 'bg-accent',
    textColor: 'text-bright',
  },
  [CardColors.BRIGHT]: {
    icon: 'avatars/Profile.svg',
    bgColor: 'bg-bright',
    textColor: 'text-primary',
  },
  [CardColors.ERROR]: {
    icon: 'avatars/Profile-2.svg',
    bgColor: 'bg-error',
    textColor: 'text-bright',
  },
  [CardColors.SUCCESS]: {
    icon: 'avatars/Profile-3.svg',
    bgColor: 'bg-success',
    textColor: 'text-bright',
  },
  [CardColors.WARNING]: {
    icon: 'avatars/Profile-2.svg',
    bgColor: 'bg-warning',
    textColor: 'text-primary',
  },
};
