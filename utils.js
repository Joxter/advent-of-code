export function runSolution(label, fn, answer = null) {
  let start = Date.now();
  let res = null;
  try {
    res = fn();
  } catch (err) {
    console.error(err);
    res = 'ERROR';
  }

  let time = (Date.now() - start) / 1000;

  if (answer === null) {
    console.log('❓ ', label, res, `[sec ${time}]`);
    return;
  }

  if (res === answer) {
    console.log('✅', label, res, `[sec ${time}]`);
  } else {
    console.log(`❌`, label, `[sec ${time}]`);
    console.log(`  expected:`, answer);
    console.log(`  actual:  `, res);
  }
}
