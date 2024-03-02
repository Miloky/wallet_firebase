import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useCategories from "../../hooks/use-categories";

interface Props {
  name: string;
  onChange(val: { [key: string]: string }): void | Promise<void>;
  value: string;
}

const renderMenuItem = (id: string, label: string) => (
  <MenuItem
    style={{ paddingLeft: "40px" }}
    key={id}
    value={id}
    children={label}
  />
);

const CategorySelect = (props: Props) => {
  const { name, value, onChange } = props;
  const { categories } = useCategories();

  const getOptions = () => {
    const result = categories.reduce<JSX.Element[]>((result, val) => {
      result.push(<ListSubheader key={val.id} children={val.name} />);
      result.push(...val.sub.map((c) => renderMenuItem(c.id, c.name)));
      return result;
    }, []);

    return result;
  };

  const onChangeHandler = (
    e: SelectChangeEvent<string>
  ): Promise<void> | void => {
    if (!e) return;
    const name = e.target.name;
    const value = e.target.value;

    return onChange({ [name]: value });
  };

  return (
    <FormControl
      size="small"
      sx={{ minWidth: 120 }}
      fullWidth
      style={{ marginTop: "10px" }}
    >
      <InputLabel htmlFor="grouped-select">Category</InputLabel>
      <Select
        onChange={onChangeHandler}
        name={name}
        label="Category"
        value={value}
      >
        {getOptions()}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
