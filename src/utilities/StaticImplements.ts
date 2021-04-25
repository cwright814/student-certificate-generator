// Allows implementing an interface as if all of its properties are static
// https://stackoverflow.com/a/43674389

export default function StaticImplements<T>() {
  return <U extends T>(constructor: U) => constructor;
}
