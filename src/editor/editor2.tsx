import { Component } from 'react';
import cornerstone from 'cornerstone-core';
import CornerstoneViewport from 'react-cornerstone-viewport';

interface IViewerProps {
	stack: string[];
	noTools: boolean;
}

class Viewer extends Component<IViewerProps> {
	state = {
		activeViewportIndex: 0,
		viewports: [0],
		tools: [
			// Mouse
			{
				name: 'Wwwc',
				mode: 'active',
				modeOptions: { mouseButtonMask: 1 },
			},
			{
				name: 'Zoom',
				mode: 'active',
				modeOptions: { mouseButtonMask: 2 },
			},
			{
				name: 'Pan',
				mode: 'active',
				modeOptions: { mouseButtonMask: 4 },
			},
			'Length',
			'Angle',
			'Bidirectional',
			'FreehandRoi',
			'RectangleRoi',
			'Eraser',
			// Scroll
			{ name: 'StackScrollMouseWheel', mode: 'active' },
			// Touch
			{ name: 'PanMultiTouch', mode: 'active' },
			{ name: 'ZoomTouchPinch', mode: 'active' },
			{ name: 'StackScrollMultiTouch', mode: 'active' },
		],
		element: null,
		imageIds: this.props.stack,
		// FORM
		activeTool: 'Wwwc',
		imageIdIndex: 0,
		isPlaying: false,
		frameRate: 22,
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState((prev) => {
				return {
					...prev,
					element: cornerstone.getEnabledElements()[0],
				};
			});
		}, 1000);
	}

	getCornerstoneElement() {
		const allElems = cornerstone.getEnabledElements();
		return cornerstone.getEnabledElement(allElems[0].element);
	}

	componentDidUpdate() {
		// ! Сюда разместить код для инициализации CornerstoneTools инструментов
	}

	render() {
		return (
			<>
				{this.state.viewports.map((vp) => (
					<CornerstoneViewport
						key={vp}
						style={{ width: '100%', height: '100%', flex: '1' }}
						tools={this.state.tools}
						imageIds={this.state.imageIds}
						imageIdIndex={this.state.imageIdIndex}
						isPlaying={this.state.isPlaying}
						frameRate={this.state.frameRate}
						className={this.state.activeViewportIndex === vp ? 'active' : ''}
						activeTool={this.props.noTools ? 'Wwwc' : this.state.activeTool}
						loadingIndicatorComponent={() => console.log()}
						setViewportActive={() => {
							this.setState({
								activeViewportIndex: vp,
							});
						}}
					/>
				))}

				{/* FORM */}
				{!this.props.noTools && (
					<div style={{ marginTop: '35px' }}>
						<form className='row'>
							{/* FIRST COLUMN */}
							<div className='col-md-6'>
								<div className='form-group'>
									<label htmlFor='active-tool'>Active Tool:</label>
									<select
										value={this.state.activeTool}
										onChange={(evt) =>
											this.setState({
												activeTool: evt.target.value,
											})
										}
										className='form-control'
										id='active-tool'>
										<option value='Wwwc'>Wwwc</option>
										<option value='Zoom'>Zoom</option>
										<option value='Pan'>Pan</option>
										<option value='Length'>Length</option>
										<option value='Angle'>Angle</option>
										<option value='RectangleRoi'>RectangleRoi</option>
										<option value='Bidirectional'>
											Bidirectional
										</option>
										<option value='FreehandRoi'>Freehand</option>
										<option value='Eraser'>Eraser</option>
									</select>
								</div>
								<div className='form-group'>
									<label htmlFor='image-id-index'>
										Image ID Index:
									</label>
									<input
										type='range'
										min='0'
										max={this.state.imageIds.length - 1}
										value={this.state.imageIdIndex}
										onChange={(evt) =>
											this.setState({
												imageIdIndex: parseInt(evt.target.value),
											})
										}
										className='form-control'
										id='image-id-index'></input>
								</div>
								<div className='form-group'>
									<label htmlFor='image-id-stack'>
										Image ID Stack:
									</label>
									<select
										defaultValue={1}
										// onChange={evt => {
										//     const selectedStack =
										//         parseInt(evt.target.value) === 1 ? stack1 : stack3;

										//     this.setState({
										//         imageIds: selectedStack,
										//         imageIdIndex: 0,
										//     });
										// }}
										className='form-control'
										id='image-id-stack'>
										<option value='1'>Stack 1</option>
										<option value='2'>Stack 2</option>
									</select>
								</div>
							</div>
							{/* SECOND COLUMN */}
							<div className='col-md-6'>
								<div className='form-group'>
									<label htmlFor='active-viewport-index'>
										Active Viewport Index:
									</label>
									<input
										type='text'
										readOnly={true}
										value={this.state.activeViewportIndex}
										className='form-control'
										id='active-viewport-index'></input>
								</div>
								<div className='input-group'>
									<span className='input-group-btn'>
										<button
											className='btn btn-default'
											type='button'
											onClick={() => {
												this.setState({
													isPlaying: !this.state.isPlaying,
												});
											}}>
											{this.state.isPlaying ? 'Stop' : 'Start'}
										</button>
									</span>
									<input
										type='number'
										className='form-control'
										value={this.state.frameRate}
										onChange={(evt) => {
											const frameRateInput = parseInt(
												evt.target.value
											);
											const frameRate = Math.max(
												Math.min(frameRateInput, 90),
												1
											);

											this.setState({ frameRate });
										}}
									/>
								</div>
							</div>
						</form>
					</div>
				)}
			</>
		);
	}
}

export default Viewer;
