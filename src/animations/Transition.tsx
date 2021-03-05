import { Transition } from "react-native-reanimated";

export default function transition() {
  return (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={10} />
    </Transition.Sequence>
  );
}
