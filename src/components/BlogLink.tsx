/** @jsxImportSource theme-ui */
import React from 'react';
import { Link } from 'gatsby';

function BlogLink(props: any) {
  return (
    <Link
      {...props}
      activeClassName="active"
      sx={{
        color: 'inherit',
        '&.active': {
          color: 'primary',
        },
      }}
    />
  );
}

export default BlogLink;
