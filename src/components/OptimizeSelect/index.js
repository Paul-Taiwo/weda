/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

// Code Reference https://github.com/JedWatson/react-select/issues/3128#issuecomment-811525100

/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import { FixedSizeList } from "react-window";
import { components } from "react-select";

const OptimizedMenuList = (props) => {
    const { options, children, maxHeight, getValue } = props;
    if (!children || !Array.isArray(children)) return null;

    const height = 35;
    const selectedValues = getValue();
    const initialOffset = selectedValues[0] ? options.indexOf(selectedValues[0]) * height : 0;

    return (
        <FixedSizeList
            width=""
            itemSize={height}
            height={maxHeight}
            itemCount={children.length}
            initialScrollOffset={initialOffset}
        >
            {({ index, style }) => (
                <div className="option-wrapper" style={style}>
                    {children[index]}
                </div>
            )}
        </FixedSizeList>
    );
};

const OptimizedOption = (props) => {
    const { innerProps } = props;

    delete innerProps.onMouseMove;
    delete innerProps.onMouseOver;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <components.Option {...props}>{props.children}</components.Option>;
};

const optimizeSelect = {
    components: {
        MenuList: OptimizedMenuList,
        Option: OptimizedOption,
    },
};

export default optimizeSelect;
