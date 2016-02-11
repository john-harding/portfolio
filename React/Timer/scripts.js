/** @jsx React.DOM */


var Timer = React.createClass({

	getInitialState: function(){
		return {
			elapsed: this.props.begin,
			increment: this.props.increment
		};
	},

	componentDidMount: function() {
		this.counter = setTimeout(this.AddTime, this.state.increment);
	},

	componentWillUnmount: function() {
		clearTimeout(this.counter);
	},

	AddTime: function() {
		// console.log("AddTime");
		this.setState( { elapsed: this.state.elapsed + this.state.increment } );
		this.counter = setTimeout(this.AddTime, this.state.increment);
	},

	UpdateIncrement: function(e) {
		var temp = parseInt(e.target.value);
		if(temp > 10)
		{
			clearTimeout(this.counter);
			this.setState( { increment: temp } );
			this.counter = setTimeout(this.AddTime, this.state.increment);
		}
	},

	ResetIncrement: function(e) {
		this.setState( { elapsed: 0 } );
	},

	render: function() {
		// console.log("rendered");
		var elapsed = this.state.elapsed / 1000;

		// This will give a number with one digit after the decimal dot (xx.x):
		// var seconds = (elapsed / 10).toFixed(1);

		// Although we return an entire <p> element, react will smartly update
		// only the changed parts, which contain the seconds variable.

		return <div>
			Increment (in ms): <input type="text" value={this.state.increment} onChange={this.UpdateIncrement} placeholder="Increment (minimum of 100 ms)" /><br />
			<button onClick={this.ResetIncrement}>Reset</button>
			<p>Elapsed time: <b>{elapsed} seconds</b> ago.</p>
		</div>;
	}
});

React.renderComponent(
	<Timer begin={10000} increment={1000} />,
	document.body
);
