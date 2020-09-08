import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import './Item.scss';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content,
      endButtonsCollapsed: true,
    };
    this.onClickFinished = this.onClickFinished.bind(this);
    this.onClickExpandEndButton = this.onClickExpandEndButton.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickEdit() {
    this.props.onEditing(this.props.id, this.state.content);
  }

  onClickExpandEndButton() {
    this.setState((prevstate) => ({
      endButtonsCollapsed: !prevstate.endButtonsCollapsed,
    }));
  }

  onClickFinished() {
    this.props.toggleFinished(this.props.id);
  }

  render() {
    const
      {
        endButtonsCollapsed,
      } = this.state;

    const {
      id, finished, content, deleteSelf,
    } = this.props;

    return (
      <ListItem className="item" key={content}>
        <Paper className="paper" elevation={3}>
          <div className="button-field">
            <ButtonBase
              className={finished ? 'button-finished' : 'button-not-finished'}
              onClick={this.onClickFinished}
            >
              <CheckIcon className="icon" />
            </ButtonBase>
          </div>
          <ListItemText
            disableTypography
            className="item-text-box"
            primary={(
              <Typography
                className={finished ? 'item-text-checked' : 'item-text-unchecked'}
              >
                {content === '' ? 'Empty Item' : content}
              </Typography>
            )}
          />
          <div className="end-button-field">
            <ButtonBase
              className={
                endButtonsCollapsed
                  ? 'modify-button-collapsed'
                  : 'modify-button'
              }
              onClick={this.onClickEdit}
              // onClick={this.callAPI}
            >
              <EditIcon
                className={
                  endButtonsCollapsed
                    ? 'edit-icon-collapsed'
                    : 'edit-icon'
                }
              />
            </ButtonBase>
            <ButtonBase
              className={
                endButtonsCollapsed
                  ? 'delete-button-collapsed'
                  : 'delete-button'
              }
              onClick={() => deleteSelf(id)}
            >
              <DeleteOutlineIcon
                className={endButtonsCollapsed
                  ? 'delete-icon-collapsed'
                  : 'delete-icon'}
              />
            </ButtonBase>
          </div>
          <div className="expand-button-field">
            <ButtonBase
              className="expand-button"
              onClick={this.onClickExpandEndButton}
            >
              {
                endButtonsCollapsed
                  ? <ArrowLeftIcon className="expand-icon" />
                  : <ArrowRightIcon className="expand-icon" />
              }
            </ButtonBase>
          </div>
        </Paper>
      </ListItem>
    );
  }
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  finished: PropTypes.bool.isRequired,
  deleteSelf: PropTypes.func.isRequired,
  toggleFinished: PropTypes.func.isRequired,
  toggleEmptyAlert: PropTypes.func.isRequired,
  toggleSuccessAlert: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
};

export default Item;
