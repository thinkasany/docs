function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function foo() {
  // Serial
  [300, 200, 100].forEach(async (ele, index) => {
    await delay(ele);
    console.log(index, ele);
  });

  for (const i of [300, 200, 100]) {
    await delay(i);
    console.log(i);
  }
}
foo();
