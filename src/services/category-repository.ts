import { collection, getDocs } from "firebase/firestore";
import { store } from "./firebase-service";

interface Category {
  id: string;
  name: string;
}

interface ParentCategory extends Category {
  sub: Category[];
}

class CategoryRepository {
  public async getAll(): Promise<ParentCategory[]> {
    const categoriesRef = collection(store, "categories");
    const categoriesSnapshot = await getDocs(categoriesRef);
    const parentCategories: any[] = [];
    categoriesSnapshot.forEach((c) =>
      parentCategories.push({ ...c.data(), id: c.id })
    );

    const loadSub = async (id: string): Promise<Category[]> => {
      const documents: Category[] = [];
      const snapshot = await getDocs(
        collection(store, "categories", id, "sub")
      );

      snapshot.forEach((c) =>
        documents.push({
          ...c.data(),
          id: c.id,
        } as any)
      );
      return documents;
    };
    const result = await Promise.all(
      parentCategories.map(async (p) => ({
        ...p,
        sub: await loadSub(p.id),
      }))
    );
    return result;
  }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;

const categories = [
  {
    id: 1,
    name: "Food & Drinks",
    sub: [
      {
        id: 11,
        name: "Groceries",
      },
      {
        id: 12,
        name: "Restaurant, fast-food",
      },
      {
        id: 13,
        name: "Bar, cafe",
      },
    ],
  },
  {
    id: 2,
    name: "Shopping",
    sub: [
      {
        id: 21,
        name: "Clothes & shoes",
      },
    ],
  },
];

// insert into `TransactionCategory`(`Name`) values ('Shopping');
// SET @Id = LAST_INSERT_ID();

// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Clothes & shoes', @Id),
// ('Jewels, accessories', @Id),
// ('Health and beauty', @Id),
// ('Kids', @Id),
// ('Home, garden', @Id),
// ('Pets, animals', @Id),
// ('Electronics, accessories', @Id),
// ('Gifts, joy', @Id),
// ('Stationery, tools', @Id),
// ('Free time', @Id),
// ('Drug-store, chemist', @Id);

// insert into `TransactionCategory`(`Name`) values ('Housing');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Rent', @Id),
// ('Mortgage', @Id),
// ('Energy, utilities', @Id),
// ('Services', @Id),
// ('Maintenance, repairs', @Id),
// ('Property insurance', @Id);

// insert into `TransactionCategory`(`Name`) values ('Transportation');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Public transport', @Id),
// ('Taxi', @Id),
// ('Long distance', @Id),
// ('Business trips', @Id);

// insert into `TransactionCategory`(`Name`) values ('Vehicle');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Fuel', @Id),
// ('Parking', @Id),
// ('Vehicle maintenance', @Id),
// ('Rentals', @Id),
// ('Vehicle insurance', @Id),
// ('Leasing', @Id);

// insert into `TransactionCategory`(`Name`) values ('Life & Entertainment');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Health care, doctor', @Id),
// ('Wellness, beauty', @Id),
// ('Active sport, fitness', @Id),
// ('Culture, sport events', @Id),
// ('Life events', @Id),
// ('Hobbies', @Id),
// ('Education, development', @Id),
// ('Books, audio, subscriptions,', @Id),
// ('TV, streaming', @Id),
// ('Holiday, trips, hotels', @Id),
// ('Charity, gifts', @Id),
// ('Alcohol, tobacco', @Id),
// ('Lottery, gambling', @Id);

// insert into `TransactionCategory`(`Name`) values ('Communication, PC');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Phone, cell phone', @Id),
// ('Internet', @Id),
// ('Software, apps, games', @Id),
// ('Postal service', @Id);

// insert into `TransactionCategory`(`Name`) values ('Financial expenses');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Taxes', @Id),
// ('Insurances', @Id),
// ('Loan, interests', @Id),
// ('Fines', @Id),
// ('Advisory', @Id),
// ('Charges, Fees', @Id),
// ('Child Support', @Id);

// insert into `TransactionCategory`(`Name`) values ('Investments');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Realty', @Id),
// ('Vehicles, chattels', @Id),
// ('Financial investments', @Id),
// ('Savings', @Id),
// ('Collections', @Id);

// insert into `TransactionCategory`(`Name`) values ('Income');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Wage, invoices', @Id),
// ('Interests, dividends', @Id),
// ('Sale', @Id),
// ('Rental income', @Id),
// ('Dues & grants', @Id),
// ('Lending, renting', @Id),
// ('Checks, coupons', @Id),
// ('Lottery, gambling', @Id),
// ('Refunds (tax, purchase)', @Id),
// ('Child support', @Id),
// ('Gifts', @Id);

// insert into `TransactionCategory`(`Name`) values ('Other');
// SET @Id = LAST_INSERT_ID();
// INSERT INTO `TransactionCategory`(`Name`, `ParentCategoryId`) VALUES
// ('Missing', @Id);
