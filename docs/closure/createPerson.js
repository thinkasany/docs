// 实现数据封装

const createPerson = name => {
  let age = 0;
  return {
    getName: () => {
      return name;
    },
    getAge: () => {
      return age;
    },
    setAge: newAge => {
      if (newAge > age) {
        age = newAge;
      }
    }
  };
};

const think = createPerson('think');
think.setAge(18);
console.log(think.getAge());
console.log(think.getName());
