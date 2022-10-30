/** @jsx jsx **/
import { Themed, jsx } from 'theme-ui';
import styled from '@emotion/styled';
import { PostProps } from '../utils/types';
import BlogLink from './BlogLink';
import TagList from './tags/TagList';

const Card = styled.div`
  display: grid;
  margin-bottom: 2rem;
  grid-gap: 0.8rem;

  grid-template-columns: minmax(5rem, 1fr) auto;
  grid-template-areas:
    'title title'
    'tags date'
    'excerpt excerpt';
`;

const BlogCard = ({
  slug,
  title,
  date,
  computerDate,
  excerpt,
  tags,
}: PostProps): JSX.Element => (
  <Card>
    <Themed.h3
      sx={{
        gridArea: 'title',
        marginBottom: '0',
      }}
    >
      <BlogLink to={slug}>{title}</BlogLink>
    </Themed.h3>
    <time dateTime={computerDate} sx={{ gridArea: 'date', color: 'muted' }}>
      {date}
    </time>
    <div sx={{ gridArea: 'tags' }}>
      <TagList tags={tags} />
    </div>
    <Themed.p
      sx={{
        gridArea: 'excerpt',
      }}
    >
      {excerpt}
    </Themed.p>
  </Card>
);

export default BlogCard;
