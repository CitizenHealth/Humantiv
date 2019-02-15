import React, {Component} from 'react';
import Initicon from 'react-initicon/native';
import randomColor from 'randomcolor';
import PropTypes from 'prop-types';

class AnonymousImage extends Component {
	static propTypes = {
		text: PropTypes.string,
		selected: PropTypes.bool,
		size: PropTypes.number.isRequired,
		seed: PropTypes.number,
		single: PropTypes.bool
	}

	static defaultProps = {
		text: "John Smith",
		selected: false,
		seed: 23,
		single: false
	}

	getBgColor() {
		const {
			selected,
		} = this.props;

		return (selected) ?
		randomColor({
			luminosity: 'dark',
			hue: 'white'
		 })
		 : 
		 randomColor({
			luminosity: 'dark'
		})
	}

	render() {
		const {
			size,
			single,
			seed,
			text,
			selected
		} = this.props;

		return (
			<Initicon
				size={size}
				text={text}
				seed={seed}
				single={single}
				color={this.getBgColor()}
			/>
		)
	}
}

export {AnonymousImage}
