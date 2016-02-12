/** @jsx React.DOM */


var IncrementTimer = React.createClass({

	getInitialState: function(){
		return {
			elapsed: this.props.begin * 1000,
			increment: this.props.increment * 1000,
			live: false
		};
	},

	componentWillUnmount: function() {
		this.StopTimer();
	},

	AddTime: function() {
		this.setState( { elapsed: this.state.elapsed + this.state.increment } );
		this.StartTimer(false);
	},

	StopTimer: function() {
		clearTimeout(this.counter);
		this.setState( { live: false } );
	},

	StartTimer: function(changeState) {
		this.counter = setTimeout(this.AddTime, this.state.increment);
		this.setState( { live: true } );
	},

	ToggleTimer: function() {
		if(this.state.live)
		{
			this.StopTimer();
		} else {
			this.StartTimer(true);
		}
	},

	ResetIncrement: function(e) {
		this.setState( { elapsed: 0 } );
	},

	render: function() {
		// console.log("rendered");
		var elapsed = this.state.elapsed / 1000;

		return (
			<div className={"timer-outer " + this.props.class}>
				<button onClick={this.ToggleTimer}>{ !this.state.live ? "Start" : "Stop" }</button>
				<button onClick={this.ResetIncrement}>Reset</button>
				<p><label className="time-label">Elapsed Time:</label> <b>{elapsed} seconds</b></p>
			</div>
		);
	}
});


var DecrementTimer = React.createClass({

	getInitialState: function(){
		return {
			initialTime: this.props.begin, // this value will always equal the input
			elapsed: this.props.begin * 1000, // this value will change
			decrement: this.props.decrement * 1000,
			live: false
		};
	},

	componentWillUnmount: function() {
		this.StopTimer();
	},

	StopTimer: function() {
		clearTimeout(this.counter);
		this.setState( { live: false } );
	},

	StartTimer: function(changeState) {
		this.counter = setTimeout(this.SubtractTime, this.state.decrement);
		console.log(changeState);
		if(changeState)
		{
			this.setState( { live: true } );
		}
	},

	SubtractTime: function() {
		// console.log("AddTime");

		if(this.state.elapsed - this.state.decrement <= 0)
		{
			this.StopTimer();
			this.setState( { elapsed: 0 } );
		} else {
			this.setState( { elapsed: this.state.elapsed - this.state.decrement } );
			this.StartTimer(false);
		}
	},

	ToggleTimer: function() {
		if(this.state.live)
		{
			this.StopTimer();
		} else {
			this.StartTimer(true);
		}
	},

	ResetTimer: function(e) {
		this.setState( { elapsed: this.state.initialTime * 1000 } );
	},

	UpdateTimer: function(e) {
		var temp = parseInt(e.target.value);
		console.log(temp);
		if(temp > 0)
		{
			this.setState( { initialTime: temp } );

			if(!this.state.live)
			{
				this.setState( { elapsed: temp * 1000 } );
			}
		}
	},

	render: function() {
		// console.log("rendered");
		var elapsed = this.state.elapsed / 1000;

		return (
			<div className={"timer-outer " + this.props.class}>
				Time: <input type="text" value={this.state.initialTime} onChange={this.UpdateTimer} />
				<div className="button-wrapper">
					<button onClick={this.ToggleTimer}>{!this.state.live ? "Start":"Stop"}</button>
					<button onClick={this.ResetTimer}>Reset</button>
				</div>
				<p><label className="time-label">Time Left:</label> <b>{elapsed} seconds</b></p>
			</div>
		);
	}
});

var SelectTimer = React.createClass({

		getInitialState: function() {

			return {
				selected: "decrement"
			}
		},

		ToggleType: function() {
			var selectedValue = this.state.selected == "increment" ? "decrement" : "increment";
			this.setState({selected: selectedValue });
		},

		render: function() {

				var incrementClass = this.state.selected == "increment" ? "show" : "";
				var decrementClass = this.state.selected == "decrement" ? "show" : "";

				// console.log("incrementClass :: " + incrementClass);
				// console.log("decrementClass :: " + decrementClass);

				return (
					<div className="timer-app">
						<button onClick={this.ToggleType} className={this.state.selected == "increment" ? "selected" : ""}>Increment</button>
						<button onClick={this.ToggleType} className={this.state.selected == "decrement" ? "selected" : ""}>Decrement</button><br />

						<div className="timer-wrapper">
							<IncrementTimer class={incrementClass} begin={0} increment={1} />
							<DecrementTimer class={decrementClass} begin={10} decrement={1} />
						</div>
					</div>
				);
		}

});

React.render(
	<SelectTimer />,
	document.getElementById("watch-component")
);
