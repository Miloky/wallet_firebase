import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TransactionType } from "./transaction-type";

interface TransactionTypeControlProps {
  // Transaction type. Example: income, expense, transfer.
  type: string;
  onChange: (type: string) => void;
}

const TransactionTypeControl = (props: TransactionTypeControlProps) => {
  const { type, onChange } = props;

  const handleChange = (e: any, newAlignment: string) => {
    onChange(newAlignment);
  };

  return (
    <ToggleButtonGroup
      size='small'
      color="primary"
      value={type}
      exclusive
      fullWidth
      onChange={handleChange}
    >
      <ToggleButton value={TransactionType.Expense}>Expense</ToggleButton>
      <ToggleButton value={TransactionType.Income}>Income</ToggleButton>
      <ToggleButton value={TransactionType.Transfer}>Transfer</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TransactionTypeControl;
