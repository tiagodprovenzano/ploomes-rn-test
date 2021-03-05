import { NavigationActions } from '@react-navigation/compat';

let navigator: any;

interface Props {
  routeName: string;
  params?: any;
}

function setTopLevelNavigator(navigatorRef: any) {
  navigator = navigatorRef;
}

function navigate({ routeName, params }: Props) {
  navigator?.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function push({ routeName, params }: Props) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  push,
  navigate,
  setTopLevelNavigator,
};
