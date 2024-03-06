import { useEffect, useState } from "react";
import accountService, { Account } from "../../services/account-service";

interface Props {
  id: string;
}

interface State {
  isLoading: boolean;
  account: Account | null;
}

interface ReturnType {
  accountId: string;
  isLoading: boolean;
  account: Account | null;
}

const useAccount = (props: Props): ReturnType => {
  const { id } = props;

  const [state, setState] = useState<State>({
    isLoading: true,
    account: null,
  });

  useEffect(() => {
    const load = async (): Promise<void> => {
      setState((state) => ({ ...state, isLoading: true }));
      const account = await accountService.getById(id);
      setState((state) => ({ ...state, account, isLoading: false }));
    };
    load();
  }, [id]);

  return {
    accountId: id,
    isLoading: state.isLoading,
    account: state.account,
  };
};

export default useAccount;
