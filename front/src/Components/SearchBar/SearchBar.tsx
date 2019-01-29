import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextFileld from '@material-ui/core/TextField';

interface SearchBarProps {
    classes: any
}

class SearchBar extends Component<SearchBarProps> {
    render() {
        console.log(this.props);
        return (
            <TextFileld
                type="search"
                variant="outlined"
                label="Поиск скидок"
                InputLabelProps={{
                    classes: {
                        root: this.props.classes.labelRoot,
                        focused: this.props.classes.labelFocused
                    }
                }}
                InputProps={{
                    classes: {
                        root: this.props.classes.outlinedInputRoot,
                        notchedOutline: this.props.classes.outlinedInputNotched,
                        focused: this.props.classes.outlinedInputFocused,
                        disabled: this.props.classes.outlinedInputDisabled,
                        error: this.props.classes.outlinedInputError,
                        input: this.props.classes.inputRoot
                    }
                }}
            >
            </TextFileld>   
        )
    }
}

export default withStyles({
    labelRoot: {
        color: 'rgba(255, 255, 255, .65)',
        transform: 'translate(14px, 14px) scale(1)',
        '&$labelFocused': {
            color: 'white'
        }
    },
    labelFocused: {},

    inputRoot: {
        color: 'white',
        paddingTop: '12px',
        paddingBottom: '12px'
    },

    outlinedInputRoot: {
        marginRight: '10px',
        '& $outlinedInputNotched, &$outlinedInputFocused $outlinedInputNotched': {
            borderColor: 'white'
        },
        '&:hover:not($outlinedInputDisabled):not($outlinedInputFocused):not($outlinedInputError) $outlinedInputNotched': {
            borderColor: 'white'
        },
        '&:hover $outlinedInputNotched': {
            borderWidth: '2px'
        }
    },
    outlinedInputFocused: {},
    outlinedInputNotched: {},
    outlinedInputDisabled: {},
    outlinedInputError: {}
})(SearchBar);