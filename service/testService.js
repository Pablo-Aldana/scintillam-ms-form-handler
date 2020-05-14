'use strict';
const test = async () => {
  console.log("Now I'm really testing");
};

async function test2() {
  console.log("This is async funtionc");
}

module.exports = {test, test2};
