export const DELAY = 600;

export function timeout(ns: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ns);
  });
}

export const createController = () => {
  let events: (() => void)[] = [];
  const processor = eventProcessor();

  const register = async (cb: () => void) => {
    events.push(cb);
    await processor.next();
  };

  async function* eventProcessor() {
    while (true) {
      const event = events.shift();
      yield event?.();
    }
  }

  const clear = () => {
    events.forEach((event) => event());
    events = [];
  };

  return {
    register,
    clear,
  };
};
