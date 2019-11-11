<></>;function render() {

	let i = 0;
	let undoStack = [[]];
	let circles = [];
	let selected;
	let adjusting = false;
	let adjusted = false;

	function handleClick(event) {
		if (adjusting) {
			adjusting = false;

			// if circle was adjusted,
			// push to the stack
			if (adjusted) push();
			return;
		}

		const circle = {
			cx: event.clientX,
			cy: event.clientY,
			r: 50
		};

		circles = circles.concat(circle);
		selected = circle;

		push();
	}

	function adjust(event) {
		selected.r = +event.target.value;
		circles = circles;
		adjusted = true;
	}

	function select(circle, event) {
		if (!adjusting) {
			event.stopPropagation();
			selected = circle;
		}
	}

	function push() {
		const newUndoStack = undoStack.slice(0, ++i);
		newUndoStack.push(clone(circles));
		undoStack = newUndoStack;
	}

	function travel(d) {
		circles = clone(undoStack[i += d]);
		adjusting = false;
	}

	function clone(circles) {
		return circles.map(({ cx, cy, r }) => ({ cx, cy, r }));
	}
;
<>





<div class="controls">
	<button onClick="{() => travel(-1)}" disabled={i === 0}>undo</button>
	<button onClick="{() => travel(+1)}" disabled={i === undoStack.length -1}>redo</button>
</div>

<svg onClick={handleClick} >
	{(circles).map((circle) => <>
		<circle cx={circle.cx} cy={circle.cy} r={circle.r}
			onClick="{event => select(circle, event)}"
			onContextmenu="{() => {
				adjusting = !adjusting;
				if (adjusting) selected = circle;
			}}"
			fill={circle === selected ? '#ccc': 'white'}
		/>
	</>)}
</svg>

{() => {if (adjusting){<>
	<div class="adjuster">
		<p>adjust diameter of circle at {selected.cx}, {selected.cy}</p>
		<input type="range" value={selected.r} onInput={adjust}/>
	</div>
</>}}}</>
return { props: {}, slots: {} }}

export default class {
    $$prop_def = render().props
    $$slot_def = render().slots
}