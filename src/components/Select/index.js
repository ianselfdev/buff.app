//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Styles
import Styles from './styles.module.scss';

//Instruments
import selectArrow from '../../theme/svg/selectArrow.svg';

export default class Select extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        styles: PropTypes.object,
        containerStyles: PropTypes.object,
        dropdownStyles: PropTypes.object,
        itemStyles: PropTypes.object,
        data: PropTypes.array,
    };

    state = {
        selectedValue: this.props.data[0].value || 'No items',
        opened: false,
    };

    _toggleOpened = () => {
        this.setState((prevState) => ({
            opened: !prevState.opened,
        }));
    };

    _chooseItem = (e) => {
        const { id } = e.target;
        const { onChange } = this.props;

        if (onChange) {
            onChange(id);
        }

        this.setState({
            selectedValue: id,
            opened: false,
        });
    };

    render() {
        const { styles, containerStyles, dropdownStyles, itemStyles, data, className } = this.props;
        const { selectedValue, opened } = this.state;

        return (
            <div
                className={`${Styles.container} ${className ? className : null}`}
                style={containerStyles}
            >
                <div className={Styles.selectField} style={styles} onClick={this._toggleOpened}>
                    <span>{selectedValue}</span>
                    <img
                        src={selectArrow}
                        alt=""
                        className={Styles.arrow}
                        onClick={this._toggleOpened}
                        style={{
                            transform: opened ? 'rotate(180deg)' : null,
                        }}
                    />
                </div>
                <div
                    className={Styles.dropdown}
                    style={{
                        ...dropdownStyles,
                        display: opened ? 'block' : 'none',
                    }}
                >
                    {data &&
                        data.map((item, index) => (
                            <p
                                className={Styles.dropdownItem}
                                style={itemStyles}
                                key={index}
                                id={item.value}
                                onClick={this._chooseItem}
                            >
                                {item.value}
                            </p>
                        ))}
                </div>
            </div>
        );
    }
}
