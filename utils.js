export function runSolution(label, fn, answer = null) {
  let start = Date.now();
  let res = fn();
  let time = (Date.now() - start) / 1000;

  if (res === answer) {
    console.log('✅', label, res, `[sec ${time}]`);
  } else {
    console.log(`❌`, label, `[sec ${time}]`);

    if (answer !== null) {
      console.log(`  expected:`, formatRes(answer));
      console.log(`  actual:  `, formatRes(res));
    }
  }
}

function formatRes(x) {
  if (typeof x === 'number') {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '_');
  }

  return x;
}