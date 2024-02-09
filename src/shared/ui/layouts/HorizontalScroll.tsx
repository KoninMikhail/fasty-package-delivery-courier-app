import { PropsWithChildren } from 'react';
import clsx from 'clsx';

/**
 * @name HorizontalScroll
 * @description Horizontal scroll
 * @param children
 * @constructor
 */
const HorizontalScroll: FunctionComponent<
    PropsWithChildren & { className?: string }
> = ({ children, className }) => {
    return (
        <div className="block overflow-hidden">
            <div className="-mb-[30px] overflow-x-auto pb-[30px]">
                <div className={clsx('inline-block align-top', className)}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default HorizontalScroll;
