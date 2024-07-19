import ICategory from './ICategory';
import IStatus from './IStatus';

interface ICard {
  id: string;
  category: ICategory;
  title: string;
  description: string;
  status: IStatus;
  createdBy: string;
  hidden: boolean;
}

export default ICard;
