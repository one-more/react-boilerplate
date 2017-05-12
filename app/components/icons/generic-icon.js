import React, {PureComponent, PropTypes} from 'react'
import './generic-icon.scss'
import classNames from 'classnames'

export class GenericIcon extends PureComponent {
    static propTypes = {
        path: PropTypes.string.isRequired,   // single path or several paths (one line per path)
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        transform: PropTypes.string,
        fillRule: PropTypes.string
    };

    static defaultProps = {
        fillRule: 'evenodd'
    };

    render() {
        const {path, width, height, transform, fillRule} = this.props;

        return (
            <svg
                className={classNames({
                    'generic-icon': true
                })}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fillRule={fillRule}
            >
                <g
                    className="generic-icon__paths-group"
                    transform={transform}
                >
                    {mapPath(path, (d, key) => <path d={d} key={key} />)}
                </g>
            </svg>
        );
    }
}

function mapPath(path = '', mapper) {
    // Split into lines. Each line is interpreted as separate path.
    return path.split(/[\r\n]+/).filter(Boolean).map(mapper);
}
