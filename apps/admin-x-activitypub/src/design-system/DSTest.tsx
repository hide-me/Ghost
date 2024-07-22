import React from 'react';

interface DSTestProps {
    children?: React.ReactNode;
}

const DSTest: React.FC<DSTestProps> = ({children}) => {
    return (
        <div className='p-10 font-sans text-red'>
            {children}
        </div>
    );
};

export default DSTest;