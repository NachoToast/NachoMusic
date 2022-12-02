import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const UnstyledLink: React.FC<LinkProps> = (props) => {
    return <Link {...props} style={{ color: 'inherit', textDecoration: 'inherit', width: '100%' }} />;
};

export default UnstyledLink;
