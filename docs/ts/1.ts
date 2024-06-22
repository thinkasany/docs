// pick omit partial required exclude readonly

enum Xstatus {
  company = 1,
  person = 2
}
interface User {
  name?: string;
  age?: number;
}
// pick 从类型t中选出属性k，构造一个新的类型

type UserWithoutAge = Pick<User, 'name'>;

type MYPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

type UserWithoutAge2 = MYPick<User, 'name'>;

// omit 过滤
type UserWithoutName = Omit<User, 'name'>;

type Myomit<T, K> = Pick<T, Exclude<keyof T, K>>;

type UserWithoutName2 = Myomit<User, 'name'>;

// exclude 排除
type myExclude<T, K> = T extends K ? never : T;

type ABC = 'A' | 'B' | 'C';
type AB = myExclude<ABC, 'A'>;

type myReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = myReadonly<User>;

type MyPartial<T> = {
  [p in keyof T]?: T[p];
};

type PartialUser = MyPartial<User>;

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type RequiredUser = MyRequired<User>;
