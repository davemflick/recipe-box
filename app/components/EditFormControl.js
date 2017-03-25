import React from 'react';
import { react } from 'react-dom';
import EditForm from './EditForm';

export default class EditFormControl extends React.Component {

	render(){
		return(
			<div>
					<div id="popUpContainer" className="popUp" style={this.props.displayEditForm}>
						<div className="popUpContent">
							<EditForm 
							closeEdit={this.props.closeEdit}
							onSubmitEdit={this.props.onSubmitEdit}
							editName={this.props.editName}
							onNameEdit={this.props.onNameEdit}
							editIng={this.props.editIng}
							onIngEdit={this.props.onIngEdit}
							editInstruc={this.props.editInstruc}
							onInstrucEdit={this.props.onInstrucEdit}
							/>
						</div>
					</div>
			</div>
		)
	}

}

EditFormControl.propTypes = {
	displayEditForm: React.PropTypes.object.isRequired,
	onSubmitEdit: React.PropTypes.func.isRequired,
	closeEdit: React.PropTypes.func.isRequired,
	onNameEdit: React.PropTypes.func.isRequired,
	onIngEdit: React.PropTypes.func.isRequired,
}