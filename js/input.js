import { Observable } from 'rxjs';
import { contains } from 'ramda';

const keyCode = [
  37,   // left arrow
  38,   // up arrow
  39,   // right arrow
  40,   // down arrow
];

/* ----- Input Observable ----- */
const input = Observable.fromEvent(document, 'keydown')
  .filter((e) => {
    return contains(e.keyCode, keyCode);
  })
  .map(e => e.keyCode);

export default input;
