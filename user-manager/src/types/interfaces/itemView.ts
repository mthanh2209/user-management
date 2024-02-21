export interface ItemViewProps {
  icon: string;
  title: string;
  additionalClass?: string;
  content: Array<{
    text: string;
    link: string;
  }>;
}
