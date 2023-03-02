
// style
import './Container.scss';

// function
export const Container = ({ className, children }) => (
	<div className={`${className}__container container`}>{children}</div>
)