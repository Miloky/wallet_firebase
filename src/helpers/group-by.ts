type GroupedBy<T> = {name: string, items: T[]}[];
type Selector<T> = (item: T) => string;

export function groupBy<T>(transactions: T[], getGroupName: Selector<T>): GroupedBy<T> {
  return transactions.reduce((groups, item: any) => {
    const groupName = getGroupName(item);
    const group = groups.find(g => g.name === groupName);
    if (group) {
      group.items.push(item);
    } else {
      groups.push({ name: groupName, items: [item] });
    }
    return groups;
  }, [] as GroupedBy<T>);
}
